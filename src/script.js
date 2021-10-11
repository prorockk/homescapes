const options = {
    width: window.innerWidth,
    height: window.innerWidth / (1390 / 640),
}

const app = new PIXI.Application(options);

const getWindowParam = () => {
    app.view.width = window.innerWidth;
    app.view.height = window.innerWidth / (1390 / 640);
    app.stage.scale.set(window.innerWidth / 1390);
    document.body.style.paddingTop = `${(window.innerHeight-app.view.height) / 2}px`;
    document.body.style.margin = '0px';
}
window.onresize = getWindowParam;

app.loader
  .add("./assets/sprites.json")
  .load(setup);

function setup () {
    getWindowParam();
    const background = getSprite('back');
    const logo = getSprite('logo', [30, 5]);

    const btn = getSprite('btn', [682, 560]);
    btn.anchor.set(0.5);
    btn.interactive = true;
    btn.on('click', () => window.location.href = 'https://play.google.com/store/apps/details?id=com.playrix.homescapes');

    let btnScale = 1;
    let deltaScale = 0.003;
    app.ticker.add(() => {
        btnScale += deltaScale;
        btnScale < 1 || btnScale > 1.1 ? deltaScale *= -1 : deltaScale;
        btn.scale.set(btnScale);
    });

    const decoration = new PIXI.Container()
    decoration.addChild(
        getSprite('sofa', [125, 320]),
        getSprite('globe', [86, 109]),
        getSprite('table', [210, 195]),
        getSprite('small_plants', [455, -35]),
        getSprite('book_stand', [835, -30]),
        getSprite('small_plants', [1150, 160]),
    )
    
    const plant3 = getSprite('plant3', [1130, 450]);
    const Austin = getSprite('Austin', [695, 113]);
    const oldStair = getSprite('oldStair', [830, 50]);
    const hammer = getSprite('icon_hammer', [1087, 258]);


    setTimeout(()=> {
        let alpha = 0.007;
        app.ticker.add(() => {
            if (hammer.alpha.toFixed(1) == 0.5 || hammer.alpha == 1) alpha *= -1;
            hammer.alpha += alpha;
        });
        hammer.interactive = true;
        hammer.on('click', () => renderMenu(stairs));
        stairs.addChild(hammer);
    }, 2000);

    const stairs = new PIXI.Container();

    stairs.addChild(oldStair);
    app.stage.addChild(background, Austin, decoration, stairs, plant3, logo, btn);
    app.stage.scale.set(window.innerWidth/1390);
    document.body.appendChild(app.view);
}

function getSprite (name, coordinate) {
    const sprite = new PIXI.Sprite(
        app.loader.resources["./assets/sprites.json"].textures[`${name}.png`]
    );
    if (coordinate) [sprite.x, sprite.y] = coordinate;
    return sprite;
}

function renderMenu (stairs) {
    const menu = new PIXI.Container();
    menu.x = 841;
    menu.y = 4;

    const selected = getSprite('choosed', [10, 5]);

    const ok = getSprite('ok', [-15, 110]);    
    ok.interactive = true;
    ok.on('click', () => {
        renderFinal();
        variant1.interactive = false;
        variant2.interactive = false;
        variant3.interactive = false;
        ok.interactive = false;
    })

    const variant1 = new PIXI.Container();
    variant1.interactive = true;
    variant1.on('click', () => {
        renderNewStair(stairs, variant1, 1, ok, selected);
    });

    const variant2 = new PIXI.Container();
    variant2.x = 130;
    variant2.interactive = true;
    variant2.on('click', () => {
        renderNewStair(stairs, variant2, 2, ok, selected);
    });

    const variant3 = new PIXI.Container();
    variant3.x = 257;
    variant3.interactive = true;
    variant3.on('click', () => {
        renderNewStair(stairs, variant3, 3, ok, selected);
    });

    const back1 = getSprite('circle');
    const stair1 = getSprite('01', [30, -30]);

    const back2 = getSprite('circle');
    const stair2 = getSprite('02', [30, -70]);

    const back3 = getSprite('circle');
    const stair3 = getSprite('03', [25, -40]);
    
    variant1.addChild(back1, stair1);
    variant2.addChild(back2, stair2);
    variant3.addChild(back3, stair3);
    menu.addChild(variant1, variant2, variant3);
    app.stage.addChildAt(menu, 5);
    stairs.removeChildAt(1);
}

function renderNewStair(stairContainer, variantContainer, variant, ok, selected) {
    stairContainer.removeChildren();
    const newStair = getSprite(`new_stair_0${variant}`);
    const newStairMenu = getSprite(`0${variant}`); 

    switch (variant) {
        case 1:
            newStair.x = 870;
            newStair.y = 5;
            newStairMenu.x = 30;
            newStairMenu.y = -30;
            break;
        case 2:
            newStair.x = 870;
            newStair.y = 20;
            newStairMenu.x = 30;
            newStairMenu.y = -70;
            break;
        case 3:
            newStair.x = 880;
            newStair.y = -30;
            newStairMenu.x = 25;
            newStairMenu.y = -40;
            break;
    }

    newStair.alpha = 0;
    let okScale = 0;
    ok.scale.set(1, okScale);
    newStair.y -= 20;
    app.ticker.add(() => {
        okScale += 0.05;
        okScale.toFixed(1);
        if (newStair.alpha < 1) newStair.alpha += 0.03;
        if (okScale < 1) {
            ok.scale.set(1, okScale);
            newStair.y += 1;
        }
    });

    variantContainer.addChildAt(selected, 1);
    variantContainer.addChild(ok);
    stairContainer.addChild(newStair);
}

function renderFinal() {
    const final = getSprite('final', [1390/2, 250]);
    final.anchor.set(0.5);

    const overlay = getSprite('overlay');

    let finalScale = 0;
    let overlayAlpha = 0;
    final.scale.set(finalScale);
    overlay.alpha = overlayAlpha;
    app.ticker.add(() => {
        overlayAlpha += 0.05;
        finalScale += 0.05;
        finalScale.toFixed(1);
        finalScale > 1 ? final.scale.set(1) : final.scale.set(finalScale);
        overlayAlpha > 1 ? overlay.alpha = 1 : overlay.alpha = overlayAlpha;
    });
    
    app.stage.addChildAt(final, app.stage.children.length - 2);
    app.stage.addChildAt(overlay, app.stage.children.length - 3);
}
