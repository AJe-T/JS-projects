class AudioVisualizer {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.audio = document.getElementById("audio");
        this.analyser = this.audioContext.createAnalyser();
        this.source = this.audioContext.createMediaElementSource(this.audio);
        this.source.connect(this.analyser);
        this.source.connect(this.audioContext.destination);
        this.analyser.fftSize = 512;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.canvas = document.getElementById("visualizer");
        this.ctx = this.canvas.getContext("2d");
        this.barWidth = 12;

        this.initAudioContext();
        this.setupCanvas();
    }

    initAudioContext() {
        this.audioContext.resume().then(() => {
            this.analyser.getByteFrequencyData(this.dataArray);
            this.draw();
            this.audio.play();
        });
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    draw() {
        this.analyser.getByteFrequencyData(this.dataArray);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        let x = 0;

        for (let i = 0; i < this.bufferLength; i++) {
            const barHeight = this.dataArray[i] / 3;
            const rectCenterY = this.canvas.height / 2;

            this.ctx.fillRect(x, rectCenterY - barHeight, this.barWidth, barHeight);
            x += this.barWidth + 10; // Adjust spacing between bars
        }

        requestAnimationFrame(() => this.draw());
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const visualizer = new AudioVisualizer();
});
