from flask import Flask, render_template, request, jsonify
import requests
import json
import re
import os
from datetime import datetime
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

# Hugging Face API setup
HF_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
HF_TOKEN = os.getenv('HUGGING_FACE_ACCESS_TOKEN')
# Store summary history
summary_history = []

def calculate_readability_score(text):
    sentences = len(re.findall(r'[.!?]+', text))
    words = len(text.split())

    if sentences == 0:
        return 0

    avg_sentence_length = words / sentences
    avg_word_length = sum(len(word) for word in text.split()) / words if words > 0 else 0

    readability = (avg_sentence_length * 1.015) + (avg_word_length * 84.6) - 206.835
    normalized_score = max(0, min(100, 100 - (readability / 2)))
    return round(normalized_score, 1)

def summarize_text(text):
    headers = {
        "Authorization": f"Bearer {HF_TOKEN}",
        "Content-Type": "application/json"
    }

    payload = {
        "inputs": text,
        "parameters": {
            "max_length": 150,
            "min_length": 50,
            "do_sample": False
        }
    }

    try:
        response = requests.post(HF_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()

        if isinstance(result, list) and len(result) > 0:
            return result[0].get('summary_text', 'Summary not available')
        elif isinstance(result, dict) and 'error' in result:
            return f"Error: {result['error']}"
        else:
            return 'Summary not available'
    except requests.exceptions.RequestException as e:
        return f"Error: Unable to generate summary. {str(e)}"

def extract_key_sentences(text, top_n=3):
    sentences = re.split(r'(?<=[.!?]) +', text)
    if len(sentences) <= top_n:
        return sentences

    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(sentences)
    scores = np.array(tfidf_matrix.sum(axis=1)).ravel()
    top_indices = scores.argsort()[-top_n:][::-1]

    return [sentences[i] for i in sorted(top_indices)]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        data = request.get_json()
        text = data.get('text', '').strip()

        if not text:
            return jsonify({'error': 'No text provided'}), 400

        if len(text.split()) < 10:
            return jsonify({'error': 'Text too short. Please provide at least 10 words.'}), 400

        summary = summarize_text(text)

        if summary.startswith("Error:"):
            return jsonify({'error': summary}), 500

        original_word_count = len(text.split())
        summary_word_count = len(summary.split())
        readability_score = calculate_readability_score(summary)

        # Bullet points and key lines
        bullet_points = [s.strip() for s in re.split(r'(?<=[.!?]) +', summary) if s.strip()]
        key_sentences = extract_key_sentences(text)

        history_entry = {
            'id': len(summary_history) + 1,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'original_text': text[:200] + '...' if len(text) > 200 else text,
            'summary': summary,
            'original_word_count': original_word_count,
            'summary_word_count': summary_word_count,
            'readability_score': readability_score
        }

        summary_history.append(history_entry)

        return jsonify({
            'summary': summary,
            'bullet_points': bullet_points,
            'important_lines': key_sentences,
            'original_word_count': original_word_count,
            'summary_word_count': summary_word_count,
            'readability_score': readability_score,
            'compression_ratio': round((1 - summary_word_count / original_word_count) * 100, 1)
        })

    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/history')
def get_history():
    return jsonify(summary_history[-10:])

@app.route('/clear-history', methods=['POST'])
def clear_history():
    global summary_history
    summary_history = []
    return jsonify({'message': 'History cleared successfully'})

if __name__ == '__main__':
    app.run(debug=True)
