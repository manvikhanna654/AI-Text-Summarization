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

  initializeElements() {
    // Loading elements
    this.loadingScreen = document.getElementById('loadingScreen');
    this.appContainer = document.getElementById('appContainer');
    
    // Robot elements
    this.robotCompanion = document.getElementById('robotCompanion');
    this.robotSpeech = document.getElementById('robotSpeech');
    
    // Input elements
    this.inputText = document.getElementById('inputText');
    this.wordCount = document.getElementById('wordCount');
    this.readTime = document.getElementById('readTime');
    this.complexity = document.getElementById('complexity');
    this.processingBar = document.getElementById('processingBar');
    this.systemStatus = document.getElementById('systemStatus');
    
    // Button elements
    this.summarizeBtn = document.getElementById('summarizeBtn');
    this.clearBtn = document.getElementById('clearBtn');
    this.pasteBtn = document.getElementById('pasteBtn');
    this.voiceBtn = document.getElementById('voiceBtn');
    this.themeToggle = document.getElementById('themeToggle');
    this.settingsBtn = document.getElementById('settingsBtn');
    
    // Results elements
    this.resultsSection = document.getElementById('resultsSection');
    this.summaryOutput = document.getElementById('summaryOutput');
    this.analysisTime = document.getElementById('analysisTime');
    this.originalWordsResult = document.getElementById('originalWordsResult');
    this.summaryWordsResult = document.getElementById('summaryWordsResult');
    this.compressionResult = document.getElementById('compressionResult');
    this.qualityResult = document.getElementById('qualityResult');
    
    // Progress elements
    this.summaryProgress = document.getElementById('summaryProgress');
    this.compressionProgress = document.getElementById('compressionProgress');
    this.qualityProgress = document.getElementById('qualityProgress');
    
    // Action buttons
    this.copyResultBtn = document.getElementById('copyResultBtn');
    this.shareResultBtn = document.getElementById('shareResultBtn');
    this.exportResultBtn = document.getElementById('exportResultBtn');
    
    // History elements
    this.historyContent = document.getElementById('historyContent');
    this.refreshHistoryBtn = document.getElementById('refreshHistoryBtn');
    this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
    this.archiveCount = document.getElementById('archiveCount');
    
    // Notification system
    this.notificationSystem = document.getElementById('notificationSystem');
    
    // Modal elements
    this.modalOverlay = document.getElementById('modalOverlay');
    this.modalContent = document.getElementById('modalContent');
  }

  setupEventListeners() {
    // Input events
    this.inputText?.addEventListener('input', () => this.handleInputChange());
    this.inputText?.addEventListener('paste', () => {
      setTimeout(() => this.handleInputChange(), 10);
    });
    
    // Button events
    this.summarizeBtn?.addEventListener('click', () => this.handleSummarize());
    this.clearBtn?.addEventListener('click', () => this.handleClear());
    this.pasteBtn?.addEventListener('click', () => this.handlePaste());
    this.voiceBtn?.addEventListener('click', () => this.handleVoiceInput());
    
    // Result actions
    this.copyResultBtn?.addEventListener('click', () => this.handleCopyResult());
    this.shareResultBtn?.addEventListener('click', () => this.handleShareResult());
    this.exportResultBtn?.addEventListener('click', () => this.handleExportResult());
    
    // History actions
    this.refreshHistoryBtn?.addEventListener('click', () => this.handleRefreshHistory());
    this.clearHistoryBtn?.addEventListener('click', () => this.handleClearHistory());
    
    // Theme and settings
    this.themeToggle?.addEventListener('click', () => this.handleThemeToggle());
    this.settingsBtn?.addEventListener('click', () => this.handleSettings());
    
    // Modal events
    this.modalOverlay?.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) {
        this.hideModal();
      }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    
    // Robot interaction
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    document.addEventListener('click', (e) => this.handleClick(e));
  }

  initializeBackground() {
    this.createParticles();
    this.animateBackground();
  }

  createParticles() {
    const particleField = document.getElementById('particleField');
    if (!particleField) return;
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (15 + Math.random() * 10) + 's';
      particleField.appendChild(particle);
    }
  }

  animateBackground() {
    // Add dynamic background animations
    setInterval(() => {
      this.updateParticles();
    }, 100);
  }

  updateParticles() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      if (Math.random() < 0.01) {
        particle.style.background = this.getRandomNeonColor();
      }
    });
  }

  getRandomNeonColor() {
    const colors = [
      'var(--primary-neon)',
      'var(--secondary-neon)',
      'var(--accent-neon)',
      'var(--success-neon)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  initializeRobot() {
    this.robotPosition = { x: 100, y: 100 };
    this.robotTarget = { x: 100, y: 100 };
    this.robotState = 'idle';
    
    this.positionRobot();
    this.startRobotAI();
  }

  positionRobot() {
    if (!this.robotCompanion) return;
    
    this.robotCompanion.style.left = this.robotPosition.x + 'px';
    this.robotCompanion.style.top = this.robotPosition.y + 'px';
  }

  startRobotAI() {
    // Robot movement AI
    setInterval(() => {
      this.updateRobotPosition();
    }, 50);
    
    // Robot behavior AI
    setInterval(() => {
      this.updateRobotBehavior();
    }, 3000);
    
    // Initial greeting
    setTimeout(() => {
      this.showRobotMessage(this.robotMessages[0]);
    }, 2000);
  }

  updateRobotPosition() {
    const dx = this.robotTarget.x - this.robotPosition.x;
    const dy = this.robotTarget.y - this.robotPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 5) {
      this.robotPosition.x += dx * 0.02;
      this.robotPosition.y += dy * 0.02;
      this.positionRobot();
    }
  }

  updateRobotBehavior() {
    if (this.isProcessing) {
      this.setRobotTarget(window.innerWidth - 150, 200);
      this.robotState = 'processing';
    } else if (this.inputText?.value.length > 100) {
      this.setRobotTarget(200, 300);
      this.robotState = 'reading';
    } else {
      this.setRobotTarget(
        100 + Math.random() * (window.innerWidth - 300),
        100 + Math.random() * 200
      );
      this.robotState = 'idle';
    }
  }

  setRobotTarget(x, y) {
    this.robotTarget.x = Math.max(50, Math.min(window.innerWidth - 100, x));
    this.robotTarget.y = Math.max(50, Math.min(window.innerHeight - 150, y));
  }

  showRobotMessage(message) {
    if (!this.robotSpeech) return;
    
    const speechContent = this.robotSpeech.querySelector('.speech-content');
    if (speechContent) {
      speechContent.textContent = message;
      this.robotSpeech.classList.add('show');
      
      setTimeout(() => {
        this.robotSpeech.classList.remove('show');
      }, 3000);
    }
  }

  async showLoadingScreen() {
    return new Promise((resolve) => {
      const loadingText = document.querySelector('.loading-text');
      const loadingProgress = document.querySelector('.loading-progress');
      
      const messages = [
        'Initializing Neural Networks...',
        'Loading AI Models...',
        'Calibrating Algorithms...',
        'Preparing Interface...',
        'System Ready!'
      ];
      
      let messageIndex = 0;
      let progress = 0;
      
      const updateLoading = () => {
        if (loadingText && messageIndex < messages.length) {
          loadingText.textContent = messages[messageIndex];
          messageIndex++;
        }
        
        progress += 20;
        if (loadingProgress) {
          loadingProgress.style.width = progress + '%';
        }
        
        if (progress >= 100) {
          setTimeout(() => {
            this.hideLoadingScreen();
            resolve();
          }, 500);
        } else {
          setTimeout(updateLoading, 600);
        }
      };
      
      updateLoading();
    });
  }

  hideLoadingScreen() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add('hidden');
      setTimeout(() => {
        this.loadingScreen.style.display = 'none';
        if (this.appContainer) {
          this.appContainer.classList.add('loaded');
        }
        this.isLoading = false;
      }, 500);
    }
  }

  bindEvents() {
    // Auto-save functionality
    this.inputText?.addEventListener('input', this.debounce(() => {
      this.saveToLocalStorage();
    }, 1000));
    
    // Load saved content
    this.loadFromLocalStorage();
  }

  startCounterAnimations() {
    const counters = document.querySelectorAll('[data-target]');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      this.animateCounter(counter, target);
    });
  }

  animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 20);
  }

  handleInputChange() {
    const text = this.inputText?.value || '';
    const words = this.countWords(text);
    const chars = text.length;
    const readingTime = Math.ceil(words / 200);
    const complexity = this.calculateComplexity(text);
    
    // Update metrics
    if (this.wordCount) this.wordCount.textContent = words.toLocaleString();
    if (this.readTime) this.readTime.textContent = readingTime + 'm';
    if (this.complexity) this.complexity.textContent = complexity;
    
    // Update processing bar
    const progress = Math.min((words / 1000) * 100, 100);
    if (this.processingBar) {
      this.processingBar.style.width = progress + '%';
    }
    
    // Update button state
    const canSummarize = words >= 10 && !this.isProcessing;
    if (this.summarizeBtn) {
      this.summarizeBtn.disabled = !canSummarize;
    }
    
    // Update system status
    this.updateSystemStatus(words);
    
    // Robot reaction
    if (words > 50 && words % 50 === 0) {
      this.showRobotMessage(`Great! ${words} words and counting.`);
    }
  }

  countWords(text) {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }

  calculateComplexity(text) {
    if (!text) return 'Low';
    
    const words = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).length - 1;
    const avgWordsPerSentence = sentences > 0 ? words / sentences : 0;
    
    if (avgWordsPerSentence > 20) return 'High';
    if (avgWordsPerSentence > 15) return 'Medium';
    return 'Low';
  }

  updateSystemStatus(wordCount) {
    if (!this.systemStatus) return;
    
    const statusDot = this.systemStatus.querySelector('.status-dot');
    const statusText = this.systemStatus.querySelector('.status-text');
    
    if (this.isProcessing) {
      statusText.textContent = 'Processing...';
      statusDot.style.background = 'var(--warning-neon)';
    } else if (wordCount >= 10) {
      statusText.textContent = 'Ready to Analyze';
      statusDot.style.background = 'var(--success-neon)';
    } else {
      statusText.textContent = `Need ${10 - wordCount} more words`;
      statusDot.style.background = 'var(--danger-neon)';
    }
  }

  async handleSummarize() {
    const text = this.inputText?.value?.trim();
    
    if (!text || this.countWords(text) < 10) {
      this.showNotification('Please enter at least 10 words to analyze.', 'error');
      return;
    }
    
    if (this.isProcessing) return;
    
    this.setProcessingState(true);
    this.showRobotMessage('Analyzing your text with neural networks...');
    
    const startTime = Date.now();
    
    try {
      // Use backend API for summarization
      const result = await this.generateSummary(text);
      const processingTime = (Date.now() - startTime) / 1000;
      
      this.displayResults(result, processingTime);
      this.showResultsSection();
      this.addToHistory(text, result.summary, result);
      this.showNotification('Analysis complete! Summary generated successfully.', 'success');
      this.showRobotMessage('Perfect! Your summary is ready.');
      
    } catch (error) {
      this.showNotification(error.message || 'Failed to generate summary', 'error');
      this.showRobotMessage('Oops! Something went wrong. Please try again.');
    } finally {
      this.setProcessingState(false);
    }
  }

  async generateSummary(text) {
    try {
      const response = await fetch("/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: text })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate summary");
      }

      const result = await response.json();
      
      // Return the data structure expected by displayResults
      return {
        summary: result.summary,
        bullet_points: result.bullet_points || [],
        important_lines: result.important_lines || [],
        originalWords: result.original_word_count,
        summaryWords: result.summary_word_count,
        readabilityScore: result.readability_score,
        compressionRatio: result.compression_ratio
      };
    } catch (error) {
      console.error('Error calling backend API:', error);
      throw new Error("Error summarizing text: " + error.message);
    }
  }

  setProcessingState(processing) {
    this.isProcessing = processing;
    
    if (this.summarizeBtn) {
      this.summarizeBtn.classList.toggle('loading', processing);
      this.summarizeBtn.disabled = processing;
    }
    
    // Update processing bar animation
    if (this.processingBar && processing) {
      this.processingBar.style.animation = 'barShimmer 2s linear infinite';
    } else if (this.processingBar) {
      this.processingBar.style.animation = '';
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

    // Animate progress bars
    setTimeout(() => {
      this.animateProgressBar(this.summaryProgress, (result.summaryWords / result.originalWords) * 100);
      this.animateProgressBar(this.compressionProgress, result.compressionRatio);
      this.animateProgressBar(this.qualityProgress, result.readabilityScore);
    }, 500);

    this.currentSummary = result.summary;
  }

  typewriterEffect(element, text) {
    element.textContent = '';
    let i = 0;
    const speed = 30;
    
    const typeChar = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, speed);
      }
    };
    
    typeChar();
  }

  animateProgressBar(element, percentage) {
    if (!element) return;
    
    let current = 0;
    const target = Math.min(percentage, 100);
    const increment = target / 50;
    
    const animate = () => {
      current += increment;
      if (current >= target) {
        current = target;
      } else {
        requestAnimationFrame(animate);
      }
      element.style.width = current + '%';
    };
    
    animate();
  }

  showResultsSection() {
    if (this.resultsSection) {
      this.resultsSection.classList.add('show');
      this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  addToHistory(originalText, summary, metrics) {
    const historyItem = {
      id: Date.now().toString(),
      timestamp: new Date(),
      originalText: originalText,
      summary: summary,
      metrics: {
        originalWords: metrics.originalWords,
        summaryWords: metrics.summaryWords,
        compressionRatio: metrics.compressionRatio
      }
    };
    
    this.history.unshift(historyItem);
    this.history = this.history.slice(0, 10); // Keep only last 10 items
    
    this.saveHistoryToLocalStorage();
    this.updateHistoryDisplay();
  }

  updateHistoryDisplay() {
    if (!this.historyContent) return;
    
    if (this.archiveCount) {
      this.archiveCount.textContent = this.history.length;
    }
    
    if (this.history.length === 0) {
      this.historyContent.innerHTML = `
        <div class="empty-archive">
          <div class="empty-visual">
            <div class="empty-icon">
              <svg viewBox="0 0 24 24">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.7893 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
            </div>
            <div class="data-streams">
              <div class="stream"></div>
              <div class="stream"></div>
              <div class="stream"></div>
            </div>
          </div>
          <h3 class="empty-title">Neural Archive Empty</h3>
          <p class="empty-description">
            Your analysis history will be stored here. Start by processing some text above.
          </p>
        </div>
      `;
    } else {
      this.historyContent.innerHTML = this.history.map(item => `
        <div class="history-item">
          <div class="history-item-header">
            <span class="history-timestamp">${item.timestamp.toLocaleString()}</span>
            <span class="history-metrics">
              ${item.metrics.originalWords} → ${item.metrics.summaryWords} words (${item.metrics.compressionRatio}% reduction)
            </span>
          </div>
          <div class="history-original">
            <strong>Original:</strong> ${item.originalText.substring(0, 150)}${item.originalText.length > 150 ? '...' : ''}
          </div>
          <div class="history-summary">
            <strong>Summary:</strong> ${item.summary}
          </div>
          <div class="history-actions">
            <button class="action-btn" onclick="app.copyText('${item.summary.replace(/'/g, "\\'")}')">
              <svg class="icon" viewBox="0 0 24 24">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"/>
              </svg>
            </button>
            <button class="action-btn danger" onclick="app.deleteHistoryItem('${item.id}')">
              <svg class="icon" viewBox="0 0 24 24">
                <polyline points="3,6 5,6 21,6"/>
                <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"/>
              </svg>
            </button>
          </div>
        </div>
      `).join('');
    }
  }

  handleClear() {
    if (this.inputText) {
      this.inputText.value = '';
      this.handleInputChange();
    }
    
    if (this.resultsSection) {
      this.resultsSection.classList.remove('show');
    }
    
    this.currentSummary = '';
    this.showRobotMessage('Ready for new text!');
    this.showNotification('Input cleared', 'Text area has been cleared', 'info');
  }

  async handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      if (this.inputText) {
        this.inputText.value = text;
        this.handleInputChange();
      }
      this.showNotification('Text pasted', 'Content pasted from clipboard', 'success');
      this.showRobotMessage('Great! I can see your text now.');
    } catch (error) {
      this.showNotification('Paste failed', 'Could not access clipboard. Please paste manually.', 'error');
    }
  }

  handleVoiceInput() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      this.showNotification('Voice input not supported', 'Your browser does not support voice recognition', 'error');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      this.showNotification('Listening...', 'Speak now to input text', 'info');
      this.showRobotMessage('I\'m listening! Please speak clearly.');
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript && this.inputText) {
        this.inputText.value += finalTranscript;
        this.handleInputChange();
      }
    };

    recognition.onerror = (event) => {
      this.showNotification('Voice input error', 'Could not recognize speech', 'error');
    };

    recognition.onend = () => {
      this.showNotification('Voice input complete', 'Speech recognition stopped', 'success');
      this.showRobotMessage('Got it! Your voice input has been processed.');
    };

    recognition.start();
  }

  async handleCopyResult() {
    if (!this.currentSummary) {
      this.showNotification('No summary to copy', 'Please generate a summary first', 'warning');
      return;
    }

    try {
      await navigator.clipboard.writeText(this.currentSummary);
      this.showNotification('Summary copied', 'Summary has been copied to clipboard', 'success');
      this.showRobotMessage('Summary copied to your clipboard!');
    } catch (error) {
      this.showNotification('Copy failed', 'Could not copy to clipboard', 'error');
    }
  }

  handleShareResult() {
    if (!this.currentSummary) {
      this.showNotification('No summary to share', 'Please generate a summary first', 'warning');
      return;
    }

    if (navigator.share) {
      navigator.share({
        title: 'NeuralSumm AI - Text Summary',
        text: this.currentSummary,
        url: window.location.href
      }).then(() => {
        this.showNotification('Summary shared', 'Summary has been shared successfully', 'success');
      }).catch(() => {
        this.fallbackShare();
      });
    } else {
      this.fallbackShare();
    }
  }

  fallbackShare() {
    const shareData = `NeuralSumm AI Summary:\n\n${this.currentSummary}\n\nGenerated at: ${window.location.href}`;
    
    this.showModal('Share Summary', `
      <div class="share-options">
        <p>Copy this summary to share:</p>
        <textarea readonly class="share-textarea">${shareData}</textarea>
        <div class="share-buttons">
          <button onclick="app.copyText('${shareData.replace(/'/g, "\\'")}'); app.hideModal();" class="neural-button">
            Copy Text
          </button>
          <button onclick="app.hideModal();" class="neural-button">
            Close
          </button>
        </div>
      </div>
    `);
  }

  handleExportResult() {
    if (!this.currentSummary) {
      this.showNotification('No summary to export', 'Please generate a summary first', 'warning');
      return;
    }

    const exportData = {
      summary: this.currentSummary,
      originalText: this.inputText?.value || '',
      timestamp: new Date().toISOString(),
      metrics: {
        originalWords: this.countWords(this.inputText?.value || ''),
        summaryWords: this.countWords(this.currentSummary)
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    
    
    const link = document.createElement('a');
    link.href = url;
    // link.download = neural-summary-${Date.now()}.json;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    this.showNotification('Summary exported', 'Summary has been downloaded as JSON file', 'success');
    this.showRobotMessage('Your summary has been exported successfully!');
  }

  handleRefreshHistory() {
    this.loadHistoryFromLocalStorage();
    this.updateHistoryDisplay();
    this.showNotification('History refreshed', 'Analysis history has been reloaded', 'success');
  }

  handleClearHistory() {
    this.showModal('Clear History', `
      <div class="confirm-dialog">
        <p>Are you sure you want to clear all analysis history? This action cannot be undone.</p>
        <div class="confirm-buttons">
          <button onclick="app.confirmClearHistory(); app.hideModal();" class="neural-button danger">
            Yes, Clear All
          </button>
          <button onclick="app.hideModal();" class="neural-button">
            Cancel
          </button>
        </div>
      </div>
    `);
  }

  confirmClearHistory() {
    this.history = [];
    this.saveHistoryToLocalStorage();
    this.updateHistoryDisplay();
    this.showNotification('History cleared', 'All analysis history has been removed', 'success');
    this.showRobotMessage('History archive has been purged!');
  }

  deleteHistoryItem(id) {
    this.history = this.history.filter(item => item.id !== id);
    this.saveHistoryToLocalStorage();
    this.updateHistoryDisplay();
    this.showNotification('Item deleted', 'History item has been removed', 'success');
  }

  handleThemeToggle() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    // this.showNotification('Theme changed', Switched to ${isLight ? 'light' : 'dark'} theme, 'info');
  }

  handleSettings() {
    this.showModal('Settings', `
      <div class="settings-panel">
        <h3>Application Settings</h3>
        <div class="setting-group">
          <label>
            <input type="checkbox" id="autoSave" ${localStorage.getItem('autoSave') === 'true' ? 'checked' : ''}>
            Auto-save input text
          </label>
        </div>
        <div class="setting-group">
          <label>
            <input type="checkbox" id="robotEnabled" ${localStorage.getItem('robotEnabled') !== 'false' ? 'checked' : ''}>
            Enable robot companion
          </label>
        </div>
        <div class="setting-group">
          <label>
            Processing Speed:
            <select id="processingSpeed">
              <option value="fast" ${localStorage.getItem('processingSpeed') === 'fast' ? 'selected' : ''}>Fast</option>
              <option value="normal" ${localStorage.getItem('processingSpeed') !== 'slow' ? 'selected' : ''}>Normal</option>
              <option value="slow" ${localStorage.getItem('processingSpeed') === 'slow' ? 'selected' : ''}>Slow</option>
            </select>
          </label>
        </div>
        <div class="settings-buttons">
          <button onclick="app.saveSettings(); app.hideModal();" class="neural-button">
            Save Settings
          </button>
          <button onclick="app.hideModal();" class="neural-button">
            Cancel
          </button>
        </div>
      </div>
    `);
  }

  saveSettings() {
    const autoSave = document.getElementById('autoSave')?.checked || false;
    const robotEnabled = document.getElementById('robotEnabled')?.checked || false;
    const processingSpeed = document.getElementById('processingSpeed')?.value || 'normal';

    localStorage.setItem('autoSave', autoSave);
    localStorage.setItem('robotEnabled', robotEnabled);
    localStorage.setItem('processingSpeed', processingSpeed);

    if (!robotEnabled && this.robotCompanion) {
      this.robotCompanion.style.display = 'none';
    } else if (robotEnabled && this.robotCompanion) {
      this.robotCompanion.style.display = 'block';
    }

    this.showNotification('Settings saved', 'Your preferences have been updated', 'success');
  }

  handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + Enter to summarize
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      this.handleSummarize();
    }
    
    // Ctrl/Cmd + K to clear
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      this.handleClear();
    }
    
    // Ctrl/Cmd + V to paste (when not in input)
    if ((e.ctrlKey || e.metaKey) && e.key === 'v' && e.target !== this.inputText) {
      e.preventDefault();
      this.handlePaste();
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
      this.hideModal();
    }
  }

  handleMouseMove(e) {
    // Robot follows mouse occasionally
    if (Math.random() < 0.001 && !this.isProcessing) {
      this.setRobotTarget(e.clientX - 50, e.clientY - 100);
    }
  }

  handleClick(e) {
    // Robot reacts to clicks
    if (Math.random() < 0.1) {
      const messages = [
        "Interesting click!",
        "I saw that!",
        "Nice interaction!",
        "Keep exploring!"
      ];
      this.showRobotMessage(messages[Math.floor(Math.random() * messages.length)]);
    }
  }

  // Utility methods
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  saveToLocalStorage() {
    if (localStorage.getItem('autoSave') === 'true' && this.inputText) {
      localStorage.setItem('neuralSummInput', this.inputText.value);
    }
  }

  loadFromLocalStorage() {
    const savedInput = localStorage.getItem('neuralSummInput');
    if (savedInput && this.inputText) {
      this.inputText.value = savedInput;
      this.handleInputChange();
    }

    // Load theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    }

    // Load history
    this.loadHistoryFromLocalStorage();
  }

  saveHistoryToLocalStorage() {
    localStorage.setItem('neuralSummHistory', JSON.stringify(this.history));
  }

  loadHistoryFromLocalStorage() {
    const savedHistory = localStorage.getItem('neuralSummHistory');
    if (savedHistory) {
      try {
        this.history = JSON.parse(savedHistory).map(item => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        this.updateHistoryDisplay();
      } catch (error) {
        console.error('Failed to load history:', error);
        this.history = [];
      }
    }
  }

  copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
      this.showNotification('Copied', 'Text copied to clipboard', 'success');
    }).catch(() => {
      this.showNotification('Copy failed', 'Could not copy text', 'error');
    });
  }

  showNotification(title, message, type = 'info') {
    const notification = {
      id: Date.now().toString(),
      title,
      message,
      type
    };

    this.notifications.push(notification);
    this.renderNotifications();

    // Auto-remove after 5 seconds
    setTimeout(() => {
      this.removeNotification(notification.id);
    }, 5000);
  }

  removeNotification(id) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.renderNotifications();
  }

  renderNotifications() {
    if (!this.notificationSystem) return;

    this.notificationSystem.innerHTML = this.notifications.map(notification => `
      <div class="notification ${notification.type}">
        <div class="notification-icon">
          ${this.getNotificationIcon(notification.type)}
        </div>
        <div class="notification-content">
          <div class="notification-title">${notification.title}</div>
          <div class="notification-message">${notification.message}</div>
        </div>
        <button class="notification-close" onclick="app.removeNotification('${notification.id}')">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `).join('');
  }

  getNotificationIcon(type) {
    const icons = {
      success: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M9 11L12 14L22 4"/><path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C13.0929 3 14.1175 3.2072 15.0711 3.57889"/></svg>',
      error: '<svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      warning: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.64 21H20.36A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      info: '<svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="10"/><path d="M12 16V12"/><path d="M12 8H12.01"/></svg>'
    };
    return icons[type] || icons.info;
  }

  showModal(title, content) {
    if (!this.modalOverlay || !this.modalContent) return;

    this.modalContent.innerHTML = `
      <div class="modal-header">
        <h2>${title}</h2>
        <button class="modal-close" onclick="app.hideModal()">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        ${content}
      </div>
    `;

    this.modalOverlay.classList.add('show');
  }

  hideModal() {
    if (this.modalOverlay) {
      this.modalOverlay.classList.remove('show');
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new NeuralSummarizerApp();
}); 