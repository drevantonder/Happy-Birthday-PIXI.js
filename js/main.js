var app = new PIXI.Application(window.innerWidth, window.innerHeight, { antialias: true, backgroundColor: 0xe3e3e3 });
document.body.appendChild(app.view);

var sprites = new PIXI.particles.ParticleContainer(10000, {
    scale: true,
    position: true,
    rotation: true,
    uvs: true,
    alpha: true
});
app.stage.addChild(sprites);

// create an array to store all the sprites
var confetti = [];

var totalSprites = app.renderer instanceof PIXI.WebGLRenderer ? 250 : 10;

for (var i = 0; i < totalSprites; i++) {

    // create a new Sprite
    var dude = PIXI.Sprite.fromImage('img/confetti.png');

    dude.tint = Math.random() * 0xE8D4CD;

    // set the anchor point so the texture is centerd on the sprite
    dude.anchor.set(0.5);

    // different confetti, different sizes
    dude.scale.set(0.8 + Math.random());

    // scatter them all
    dude.x = Math.random() * app.renderer.width;
    dude.y = Math.random() * app.renderer.height - app.renderer.height;

    dude.tint = Math.random() * 0xeeeeee;

    // create a random direction in radians
    dude.direction = Math.random()/10 * Math.PI * 4.71239;

    // this number will be used to modify the direction of the sprite over time
    dude.turningSpeed = 0;//Math.random() - 0.8;

    // create a random speed between 0 - 2, and these confetti are slooww
    dude.speed = (2 + Math.random() * 2) * 1;

    dude.offset = Math.random() * 100;

    // finally we push the dude into the confetti array so it it can be easily accessed later
    confetti.push(dude);

    sprites.addChild(dude);
}

// create a bounding box box for the little confettis
var dudeBoundsPadding = 100;
var dudeBounds = new PIXI.Rectangle(
    -dudeBoundsPadding,
    -dudeBoundsPadding,
    app.renderer.width + dudeBoundsPadding * 2,
    app.renderer.height + dudeBoundsPadding * 2
);

var tick = 0;

app.ticker.add(function() {

    // iterate through the sprites and update their position
    for (var i = 0; i < confetti.length; i++) {

        var dude = confetti[i];
        dude.scale.y = 0.95 + Math.sin(tick + dude.offset) * 0.05;
        dude.direction += dude.turningSpeed * 0.01;
        dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
        dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);
        dude.rotation = -dude.direction + Math.PI;

        // wrap the confetti
        if (dude.x < dudeBounds.x) {
            dude.x += dudeBounds.width;
        }
        else if (dude.x > dudeBounds.x + dudeBounds.width) {
            dude.x -= dudeBounds.width;
        }

        if (dude.y < dudeBounds.y) {
            //dude.y += dudeBounds.height;
        }
        else if (dude.y > dudeBounds.y + dudeBounds.height) {
            dude.y -= dudeBounds.height;
        }
    }

    // increment the ticker
    tick += 0.1;
});

var style = new PIXI.TextStyle({
    fontFamily: 'Helvetica',
    fontSize: 100,
    fontWeight: 'bold',
    fill: ['#000000'], // gradient
    dropShadow: true,
    dropShadowColor: '#c0c9d6',
    dropShadowBlur: 8,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 20,
});

var richText = new PIXI.Text('Happy Birthday', style);
richText.x = window.innerWidth/2 - richText.getBounds().width/2;
richText.y = window.innerHeight/2 - richText.getBounds().height/2;

app.stage.addChild(richText);
