class Model {
    constructor() {
        this.playSound = true;
    }
    playSounds(sound) {
        if(this.playSound)
        {
            
            let click = sound.cloneNode();
            click.volume = .5;
            click.play();
            
        }
    }
}