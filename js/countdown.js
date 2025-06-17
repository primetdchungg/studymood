const CountdownTimer = {
  totalSeconds: 0,
  interval: null,

  updateDisplay() {
    const hours = Math.floor(this.totalSeconds / 3600);
    const minutes = Math.floor((this.totalSeconds % 3600) / 60);
    const seconds = this.totalSeconds % 60;

    document.getElementById("hours").textContent = String(hours).padStart(
      2,
      "0"
    );
    document.getElementById("minutes").textContent = String(minutes).padStart(
      2,
      "0"
    );
    document.getElementById("seconds").textContent = String(seconds).padStart(
      2,
      "0"
    );
  },

  start() {
    const inputHours =
      parseInt(document.getElementById("inputHours").value) || 0;
    const inputMinutes =
      parseInt(document.getElementById("inputMinutes").value) || 0;
    const inputSeconds =
      parseInt(document.getElementById("inputSeconds").value) || 0;

    this.totalSeconds = inputHours * 3600 + inputMinutes * 60 + inputSeconds;

    if (this.totalSeconds <= 0) {
      alert("Vui lòng nhập thời gian hợp lệ!");
      return;
    }

    this.updateDisplay();
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.totalSeconds <= 0) {
        clearInterval(this.interval);
        alert("⏰ Time's up!");
      } else {
        this.totalSeconds--;
        this.updateDisplay();
      }
    }, 1000);
  },

  reset() {
    clearInterval(this.interval);
    this.totalSeconds = 0;
    this.updateDisplay();
  },
};
