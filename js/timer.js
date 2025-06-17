const StudyTimer = {
  seconds: 0,
  interval: null,
  isRunning: false,

  formatTime(value) {
    return value < 10 ? "0" + value : value;
  },

  updateDisplay() {
    const hours = Math.floor(this.seconds / 3600);
    const minutes = Math.floor((this.seconds % 3600) / 60);
    const seconds = this.seconds % 60;

    document.getElementById(
      "study-timer-display"
    ).textContent = `${this.formatTime(hours)}:${this.formatTime(
      minutes
    )}:${this.formatTime(seconds)}`;
  },

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    this.interval = setInterval(() => {
      this.seconds++;
      this.updateDisplay();
    }, 1000);
  },

  stop() {
    clearInterval(this.interval);
    this.isRunning = false;
  },
};
