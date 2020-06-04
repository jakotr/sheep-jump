class OverScene {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }

    create(id, score) {
        this.goSound = new Audio('audio/sheep-gameOver.wav')
        this.goSound.preload = 'auto';
        model.playSounds(this.goSound);
        model.playSound = false;
        
        cancelAnimationFrame(id);
        let opacity = 0;
        
        const intervalId = setInterval(() => {
            this.ctx.fillStyle = `rgba(84, 84, 84, ${opacity += .001})`;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }, 10)
            

        setTimeout(() => {
            clearInterval(intervalId);
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
            this.bg = new Image();
            this.bg.src = 'img/overBG.png';
            this.bg.width = this.canvas.width;
            this.bg.height = this.canvas.height;
            this.bg.onload = () => {

                this.ctx.drawImage(this.bg, 0, 0, this.bg.width, this.bg.height);
                this.ctx.font = "50px Comic Sans MS";
                this.ctx.fillStyle = '#fff';
                this.ctx.fillText('GAMEOVER', this.canvas.width/2,  80);
                this.ctx.font = "30px Comic Sans MS";
                this.ctx.fillText(`Score: ${score}`, this.canvas.width/2,  120);
            }
                
            this.btn = document.querySelector('#btn');
            this.btn.style.transform = 'translateY(200px)';
            this.btn.style.backgroundColor = '#136d3a';
            this.btn.style.display = "block";
            this.btn.textContent = "Play Again?";
        }, 600)

        
    }
}