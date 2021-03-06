class StartScene {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }
    create() {
        this.bg = new Image();
        this.bg.src = 'img/startBG.png';
        this.bg.width = this.canvas.width;
        this.bg.height = this.canvas.height;
        this.bg.onload = () => {
            this.ctx.drawImage(this.bg, 0, 0, this.bg.width, this.bg.height);
            this.ctx.font = "50px Comic Sans MS";
            this.ctx.textAlign = "center";
            this.ctx.fillStyle = '#333';
            this.ctx.fillText('SHEEP JUMP', this.canvas.width/2, this.canvas.height/2 - 150);
        }
        

        //obsluga buttona
        this.btn = document.querySelector('#btn');
        this.btn.addEventListener('click', () => {
            this.btn.style.display = "none";
            scenes.mainScene.create();
            
        });
    }
}