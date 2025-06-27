class NeuralSummarizerApp {
  constructor() {
    this.isLoading = true;
    this.isProcessing = false;
    this.currentSummary = '';
    this.history = [];
    this.notifications = [];
    this.robotMessages = [
      "Hello! I'm your AI assistant.",
      "Ready to analyze your text!",
      "Processing neural networks...",
      "Summary complete!",
      "Great job! Let's analyze more.",
      "I'm here to help you understand.",
      "Your text is being processed.",
      "Analysis in progress...",
      "Neural pathways activated!",
      "Data streams flowing..."
    ];

    this.init();
  }

  async init() {
    this.initializeElements();
    this.setupEventListeners();
    this.initializeBackground();
    this.initializeRobot();
    await this.showLoadingScreen();
    this.bindEvents();
    this.startCounterAnimations();
  }

  // ... rest of your methods remain unchanged until generateSummary

  async generateSummary(text) {
    try {
      const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "API error");
      }

      const result = await response.json();
      // Return extended data for use in displayResults
      return {
        summary: result.summary,
        bullet_points: result.bullet_points,
        important_lines: result.important_lines,
        originalWords: result.original_word_count,
        summaryWords: result.summary_word_count,
        readabilityScore: result.readability_score,
        compressionRatio: result.compression_ratio
      };
    } catch (error) {
      throw new Error("Error summarizing text: " + error.message);
    }
  }

  displayResults(result, processingTime) {
    if (this.summaryOutput) {
      this.typewriterEffect(this.summaryOutput, result.summary);
    }

    if (this.analysisTime) {
      this.analysisTime.textContent = processingTime.toFixed(1) + 's';
    }

    if (this.originalWordsResult) {
      this.originalWordsResult.textContent = result.originalWords.toLocaleString();
    }

    if (this.summaryWordsResult) {
      this.summaryWordsResult.textContent = result.summaryWords.toLocaleString();
    }

    if (this.compressionResult) {
      this.compressionResult.textContent = result.compressionRatio + '%';
    }

    if (this.qualityResult) {
      this.qualityResult.textContent = Math.round(result.readabilityScore) + '%';
    }

    setTimeout(() => {
      this.animateProgressBar(this.summaryProgress, (result.summaryWords / result.originalWords) * 100);
      this.animateProgressBar(this.compressionProgress, result.compressionRatio);
      this.animateProgressBar(this.qualityProgress, result.readabilityScore);
    }, 500);

    this.currentSummary = result.summary;
  }

  // Rest of the class remains the same...
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new NeuralSummarizerApp();
});
