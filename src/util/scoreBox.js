const scoreBox = (ctx, score) => {
    scoreText = `${score}`;
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.fillText(`score: ${this.scoreText}`, this.canvas.width/2, 30);
}