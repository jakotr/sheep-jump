class MainScene {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }

    create() {

        //clear the canvas
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

        //set the background
        this.bg = new Image();
        this.bg.src = 'img/mainBG.png';
        this.bg.width = this.canvas.width;
        this.bg.height = this.canvas.height;
        this.loadImage(this.bg, 0, 0, this.bg.width, this.bg.height);

        //audio

        //variables
        this.gravity = .3;
        this.velocityY = 0;
        this.jump = false;
        this.jumpIndex = 0;
        this.topPipes = [];
        this.botPipes = [];
        this.pipesVel = 1;
        this.angle = -30;

        this.score = 0;
        

        //draw the sheep
        this.sheep = new Image();
        this.sheep.src = 'img/sheep.png';
        this.sheep.width = this.canvas.width * .07;
        this.sheep.height = this.canvas.width * .07;
        this.sheep.xPos = 50;
        this.sheep.yPos = this.canvas.height/2 - this.sheep.height/2;
        this.loadImage(this.sheep, this.sheep.xPos, this.sheep.yPos, this.sheep.width, this.sheep.height);


        this.jumpHandler = this.jumpSheep.bind(this);
        this.canvas.addEventListener('click', this.jumpHandler);


        this.drawPipes();

        this.update();

        this.drawNewPipes = setInterval(() => {
            this.pipesVel += .05;
            this.drawPipes();
        }, 3000);
    }

    loadImage(image, x, y, w, h) {
        image.onload = () => {
            this.ctx.drawImage(image,x,y,w,h)
                
        }       
    }

    addPoint() {
        this.score++;
        
    }

    jumpSheep() {
        this.jump = true;
        this.jumpIndex = 0;
        this.velocityY = 13;
        this.gravity = .3;

        this.angle = -30;
    }

    rotate(element, x, y, width, height) {
        this.ctx.save();
        this.ctx.translate(x + width/2, y + width/2);
        this.ctx.rotate(this.angle * Math.PI / 180);
        this.ctx.drawImage(element, width / -2, height / -2, width, height);
        this.ctx.restore();
    }

    drawPipes() {
        const randomPositionPipes = Math.floor(Math.random() * (-200 - (-this.canvas.height + 30)  + 1) - this.canvas.height);
        const topPipe = new Image();
        topPipe.src = 'img/top_pipe.png';
        topPipe.width = this.canvas.width * .08;
        topPipe.height = this.canvas.height;
        topPipe.xPos = this.canvas.width;
        topPipe.yPos = randomPositionPipes;
        this.topPipes.push(topPipe);

        const botPipe = new Image();
        botPipe.src = 'img/bot_pipe.png';
        botPipe.width = this.canvas.width * .08;
        botPipe.height = this.canvas.height;
        botPipe.xPos = this.canvas.width;
        botPipe.yPos = randomPositionPipes + this.canvas.height + this.sheep.height*4;
        this.botPipes.push(botPipe);
    }

    update() {

        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.bg, 0, 0, this.bg.width, this.bg.height);

        this.gravity += .1;
        this.sheep.yPos += this.gravity;   

        

        scoreBox(this.ctx, this.score);


        // if(this.topPipes[0].xPos <= this.canvas.width/3 && this.topPipes[0].xPos >= this.canvas/3 - 10) {
        //     this.drawPipes();
        // }

        if(this.topPipes[0].xPos <= -this.topPipes[0].width) {
            this.topPipes.splice(0, 1);
            this.botPipes.splice(0, 1);
        }

        if(this.jump) {
            this.rotate(this.sheep, this.sheep.xPos, this.sheep.yPos, this.sheep.width, this.sheep.height)
            this.angle *= .9;

            this.sheep.yPos -= this.velocityY;
            this.velocityY *= .9;
            this.jumpIndex++;
            if(this.jumpIndex >= 20) {
                this.jump = false;
                
            }
        } else {
            this.ctx.drawImage(this.sheep, this.sheep.xPos, this.sheep.yPos, this.sheep.width, this.sheep.height);
        }

        if(this.sheep.yPos >= this.canvas.height - this.sheep.height || this.sheep.yPos <= 0) {
            this.sheep.yPos > 100 ? this.sheep.yPos = this.canvas.height - this.sheep.height : this.sheep.yPos = 0;
            this.gravity = .3;
        } 

        if(this.sheep.xPos <= this.topPipes[0].xPos && this.sheep.xPos >= this.topPipes[0].xPos - 1) {
            this.addPoint();
        }


        //id requeta po to by wiedziec ktora zatrzymac pozniej w naszej scenie game over
        this.requestId = requestAnimationFrame(() => this.update());
        // console.log('1')

        this.topPipes.forEach(pipe => {
            pipe.xPos -= this.pipesVel;
            this.ctx.drawImage(pipe, pipe.xPos, pipe.yPos, pipe.width, pipe.height);

            if(this.sheep.xPos + this.sheep.width >= pipe.xPos &&
               this.sheep.xPos <= pipe.xPos + pipe.width &&
               this.sheep.yPos + 15 <= pipe.yPos + pipe.height) {
                this.canvas.removeEventListener('click', this.jumpHandler);
                clearInterval(this.drawNewPipes);
                scenes.overScene.create(this.requestId, this.score);
               }
        });
        this.botPipes.forEach(pipe => {
            pipe.xPos -= this.pipesVel;
            this.ctx.drawImage(pipe, pipe.xPos, pipe.yPos, pipe.width, pipe.height);

            if(this.sheep.xPos + this.sheep.width >= pipe.xPos &&
                this.sheep.xPos <= pipe.xPos + pipe.width &&
                this.sheep.yPos + this.sheep.height - 15 >= pipe.yPos) {
                    this.canvas.removeEventListener('click', this.jumpHandler);
                    clearInterval(this.drawNewPipes);
                    scenes.overScene.create(this.requestId, this.score);
                }
        });
    }
}