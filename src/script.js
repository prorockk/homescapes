const currentWidth = window.innerWidth;
const currentHeight = window.innerHeight;
document.body.style.overflow = 'hidden';

const options = {
    width: currentWidth,
    height: currentWidth/2.17,
}

const app = new PIXI.Application(options);

const getWindowParam = () => {
    app.view.width = window.innerWidth;
    app.view.height = window.innerWidth/2.17;
    app.stage.scale.set(window.innerWidth/1390);
    document.body.style.paddingTop = `${(window.innerHeight-app.view.height) / 2}px`
}
window.onresize = getWindowParam

app.loader
  .add("./assets/sprites.json")
  .load(setup);

function setup () {
    const background = PIXI.Sprite.from("./assets/back.png");
    const logo = PIXI.Sprite.from("./assets/logo.png");
    logo.width = 300;
    logo.height = 100;
    logo.x = 30;
    logo.y = 5;

    const decoration = new PIXI.Sprite(
        app.loader.resources["./assets/sprites.json"].textures["decoration.png"]
    );
    decoration.x = 90;
    decoration.y = -50;

    const plant3 = new PIXI.Sprite(
        app.loader.resources["./assets/sprites.json"].textures["plant3.png"]
    );
    plant3.x = 1122;
    plant3.y = 440;

    const Austin = new PIXI.Sprite(
        app.loader.resources["./assets/sprites.json"].textures["Austin.png"]
    );
    Austin.x = 695;
    Austin.y = 113;

    const stairs = new PIXI.Container()

    const oldStair = new PIXI.Sprite(
        app.loader.resources["./assets/sprites.json"].textures["oldStair.png"]
    );
    oldStair.x = 830;
    oldStair.y = 50;

    const hammer = new PIXI.Sprite(
        app.loader.resources["./assets/sprites.json"].textures["icon_hammer.png"]
    );
    hammer.x = 1090;
    hammer.y = 255;
    let alpha = 0.007;
    app.ticker.add(() => {
        if (hammer.alpha.toFixed(1) == 0.5 || hammer.alpha == 1) alpha *=-1;
        hammer.alpha += alpha;
    });
    hammer.interactive=true
    hammer.on('click', () => renderMenu(stairs))
    



    stairs.addChild(oldStair, hammer)
    app.stage.addChild(background, Austin, logo, decoration, stairs, plant3);
    app.stage.scale.set(window.innerWidth/1390)
    document.body.appendChild(app.view);
    getWindowParam()
}

function renderMenu(stairs) {
    const menu = new PIXI.Container();
    menu.x = 850;
    menu.y = 10
    const variant1 = new PIXI.Container();
    variant1.interactive=true
    variant1.on('click', () => {
        renderNewStair(menu, stairs, variant1, 1)
    })
    const variant2 = new PIXI.Container();
    variant2.x = 130
    variant2.interactive=true
    variant2.on('click', () => {
        renderNewStair(menu, stairs, variant2, 2)
    })
    const variant3 = new PIXI.Container();
    variant3.x = 260
    variant3.interactive=true
    variant3.on('click', () => {
        renderNewStair(menu, stairs, variant3, 3)
    })

    console.log( app.loader.resources);
    const back1 = new PIXI.Sprite(
        app.loader.resources["./assets/sprites.json"].textures["circle.png"]
    );

    const stair1 = new PIXI.Sprite(
        app.loader.resources["./assets/sprites.json"].textures["01.png"]
    );
    stair1.x = 30
    stair1.y = -30

    const back2 = new PIXI.Sprite(
        app.loader.resources["./assets/sprites.json"].textures["circle.png"]
    );
    const stair2 = new PIXI.Sprite(
        app.loader.resources["./assets/sprites.json"].textures["02.png"]
    );
    stair2.x = 30
    stair2.y = -70

    const back3 = new PIXI.Sprite(
        app.loader.resources["./assets/sprites.json"].textures["circle.png"]
    );
    const stair3 = new PIXI.Sprite(
        app.loader.resources["./assets/sprites.json"].textures["03.png"]
    );
    stair3.x = 25
    stair3.y = -40

    variant1.addChild(back1, stair1)
    variant2.addChild(back2, stair2)
    variant3.addChild(back3, stair3)
    menu.addChild(variant1, variant2, variant3)
    app.stage.addChild(menu)
    stairs.removeChildAt(1)
}

function renderNewStair(menu, stairContainer, variantContainer, variant) {
    stairContainer.removeChildren()
    const newStair = new PIXI.Sprite(
        app.loader.resources["./assets/sprites.json"].textures[`new_stair_0${variant}.png`]
    );
    newStair.x = 880;
    newStair.y = 0;
    stairContainer.addChild(newStair)
}
