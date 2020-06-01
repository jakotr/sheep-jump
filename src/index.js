const scene = document.getElementById('canvas');
const scenes = {
    startScene: new StartScene(scene),
    mainScene: new MainScene(scene),
    overScene: new OverScene(scene)
};
const model = new Model();

window.onload = () => {
    let isMobile = navigator.userAgent.indexOf("Mobile");
    if (isMobile === -1) {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }
    scene.width = 480;
    scene.height = 640;

    if (isMobile!==-1)
    {
        if(window.outerHeight > 640) {
            scene.height = 640;
        } else {
            scene.height = window.outerHeight - 20;
        }
        if(window.outerWidth > 480) {
            scene.width = 480
        }
        else {
            scene.width = window.outerWidth - 20;
        }
        
        
    }

    scenes.startScene.create();
}

