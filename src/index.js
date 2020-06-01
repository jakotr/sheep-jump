const scene = document.getElementById('canvas');


//tworzenie obiektu gry i wywolanie scene startowej

const scenes = {
    startScene: new StartScene(scene),
    mainScene: new MainScene(scene),
    overScene: new OverScene(scene)
};
const model = new Model();

scenes.startScene.create();