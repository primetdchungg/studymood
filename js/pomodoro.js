const PomodoroTimer = {
  interval: null,
  isRunning: false,
  isWorkSession: true,
  workDuration: 25 * 60,
  breakDuration: 5 * 60,
  remainingTime: 25 * 60,

  formatTime(time) {
    return time < 10 ? `0${time}` : time;
  },

  updateDisplay() {
    const hours = Math.floor(this.remainingTime / 3600);
    const minutes = Math.floor((this.remainingTime % 3600) / 60);
    const seconds = this.remainingTime % 60;

    document.getElementById("pomo-hours").textContent = this.formatTime(hours);
    document.getElementById("pomo-minutes").textContent =
      this.formatTime(minutes);
    document.getElementById("pomo-seconds").textContent =
      this.formatTime(seconds);
  },

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    this.interval = setInterval(() => {
      if (this.remainingTime <= 0) {
        clearInterval(this.interval);
        this.isWorkSession = !this.isWorkSession;

        if (this.isWorkSession) {
          alert("💼 Bắt đầu phiên làm việc mới!");
          this.remainingTime = this.workDuration;
        } else {
          alert("🧘 Thư giãn một chút nào (5 phút nghỉ)!");
          this.remainingTime = this.breakDuration;
        }

        this.isRunning = false;
        this.start(); // tự bắt đầu phiên mới
      } else {
        this.updateDisplay();
        this.remainingTime--;
      }
    }, 1000);
  },

  reset() {
    clearInterval(this.interval);
    this.isRunning = false;
    this.isWorkSession = true;
    this.remainingTime = this.workDuration;
    this.updateDisplay();
  },
};

// Hiển thị ban đầu
PomodoroTimer.updateDisplay();
