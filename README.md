# 📝 AI Text Summarization Web App

This is a web-based text summarization tool that helps users condense long paragraphs into clear, concise summaries using an advanced NLP model. The app is built using Flask and integrates the powerful BART large CNN model from Hugging Face.

🔗 Live Site: https://ai-text-summarization-r87d.onrender.com/

---

## ✨ Features

- 🔍 AI-powered Summarization using Hugging Face `facebook/bart-large-cnn`
- 📋 Bullet Points & Key Sentences
- 📈 Readability Score
- 🧮 Compression Ratio Display
- 📜 Summary History
- 🧹 Clear History Button

---

## 🛠️ Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Python (Flask)
- AI Model: Hugging Face Transformers
- Libraries:
  - requests
  - scikit-learn
  - numpy
  - python-dotenv
  - gunicorn
- Deployment: Render.com

---

## ⚙️ How It Works

1. User enters any long paragraph or text.
2. The app calls Hugging Face API to generate a summary.
3. Summary, readability score, bullet points, and key sentences are shown.
4. A history of recent summaries is stored and displayed.

---

## 🚀 Live Demo

Try it here:  
https://ai-text-summarization-r87d.onrender.com/

---

## 🧑‍💻 How to Run Locally

1. Clone this repo:

   git clone https://github.com/manvikhanna654/AI-Text-Summarization.git  
   cd AI-Text-Summarization

2. (Optional) Create virtual environment:

   python -m venv venv  
   venv\Scripts\activate   (on Windows)

3. Install dependencies:

   pip install -r requirements.txt

4. Create a `.env` file in the root folder with this content:

   HUGGING_FACE_ACCESS_TOKEN=your_huggingface_token_here

5. Run the Flask app:

   python app.py

Then open `http://127.0.0.1:5000` in your browser.

---

## ⚠️ Notes

- Don't upload your `.env` file or token to GitHub.
- GitHub blocks secrets from being pushed — this is for your safety.

---

## 📌 To-Do (Optional Improvements)

- Upload file and summarize contents
- Export summary as PDF or .txt
- Dark mode / light mode
- Save summaries with login support

---

## 🙋‍♀️ Made By

**Manvi Khanna**  
Passionate about AI, web apps, and creating simple tools for daily use.  
GitHub: https://github.com/manvikhanna654
