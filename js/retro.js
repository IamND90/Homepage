let canvas;

let caseFunctions = ['toUpperCase', 'toUpperCase', 'toUpperCase', 'toUpperCase', 'toUpperCase', 'toLowerCase'];
let leetReplacement = {
    A: [ 4, '@' ],
    C: [ '¢' ],
    E: [ 3, '€', '£' ],
    G: [ 6 ],
    H: [ '#' ],
    I: [ 1 ],
    O: [ 0 ],
    S: [ 5, '$' ],
    T: [ 7 ],
    X: [ '×' ],
    Y: [ '¥' ]
};
let accentReplacement = {
    A: [ 'Ă', 'Â', 'ă', 'â' ],
    C: [ 'Ć', 'Č', 'č', 'ć' ],
    D: [ 'đ' ],
    E: [ 'Ê', 'ê' ],
    O: [ 'Ô', 'Ơ', 'ô', 'ơ' ],
    U: [ 'Ư', 'ư' ],
    S: [ 'Š', 'š' ],
    Z: [ 'Ž', 'ž' ]
};

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    textFont('VT323');
    textSize(64);
    textAlign(CENTER, CENTER);
}

function draw() {
    blendMode(BLEND);
    // background(8, 24, 64);
    // Add to that scanline look, allows some frames to combine.
    fill(8, 24, 64, 200 + cos(frameCount / 10) * 100);
    rect(0, 0, width, height);

    // Text prep
    let life = random() > 0.6 ? 'LIFE' : 'LIFE'.split('').sort(() => round(random(-1, 1))).join('');
    let txt = `SEARCHING FOR ${life}`
        .toUpperCase()
        .split('')
        .map(n => n[random(caseFunctions)]())
        .join('')
        .replace(/\w/g, (match, p1, offset, string) => {
            if(match === 'g') {
                return 'G';
            }
            let possibleMatchCount = round(random(16, 26));
            let possibleMatches = new Array(possibleMatchCount).fill(match);
            let leet = leetReplacement[match] || [match];
            let accents = accentReplacement[match] || [match];
            let rando = random();
            return random([
                ...possibleMatches,
                ...(rando > 0.7 ? [ ' ', '_' ] : []),
                ...(rando > 0.5 ? leet : []),
                ...(rando > 0.92 ? accents : [])
            ]);
        });
    let dotCount = 3;
    let dotTime = (dotCount + 1) * 30;
    let dotTimeSpan = (dotCount + 2) * 30;
    let repeat = map(frameCount % dotTimeSpan, 0, dotTime, 0, dotCount + 1);
    txt += ('.'.repeat(abs(floor(repeat))) + '   ').slice(0, 3);

    let h = textSize();
    let w = textWidth(txt);

    let count = 7;
    let part = h / count;
    let xOffset = 0;
    let yOffset = height / 2 - h / 2;

    fill(255, 0.99);

    // Scanline
    let barHeight = part * 0.995;
    let barCount = round(height / barHeight);
    for(let i = 0; i < barCount; i++) {
        rect(
            0, i / barCount,
            width, barHeight * i
        );
    }

    blendMode(ADD);

    fill(255);

    translate(
        round(cos(sin(frameCount / 10) * TAU - cos(tan(frameCount / 4) / 10) * TAU)) * 8,
        round(sin(frameCount) * 16 / 8) * 0.4
    );

    text(txt, width / 2, height / 2);
    // Scanline misses (The main effect)
    for(let i = 0; i < count; i++) {
        canvas.drawingContext.save();

        let y = i * part + yOffset;
        let xShift = cos(-frameCount * 0.9375 + i) * 100;

        canvas.drawingContext.beginPath();
        canvas.drawingContext.rect(0, y, width, part);
        canvas.drawingContext.closePath();
        canvas.drawingContext.clip();

        fill(0, 135);
        text(txt, width / 2 + xShift, height / 2);
        fill(255, 50);
        text(txt, width / 2 + xShift, height / 2);

        fill(255, 60);
        text(txt, width / 2 + round(xShift / 32) * 16, height / 2);

        canvas.drawingContext.restore();
    }

    fill(255, 2);
    for(let i = 0; i < 4; i++) {
        rect(0, (frameCount * (30 + i)) % height / 6 * 7, width, height / 9);
    }
    fill(255, random(8, 12));
    let rounding = (part * 1.2);
    let travelingBarHeight = height / 6;
    let travelingBarSpeed = frameCount * 2;
    rect(
        0, round(travelingBarSpeed % travelingBarHeight * 8 / rounding) * rounding - travelingBarHeight,
        width, travelingBarHeight
    );
    let travelingBarY2 = round(
            (travelingBarSpeed + 6) % travelingBarHeight * 8 / rounding
        ) * rounding - travelingBarHeight;
    let travelingBar2Opacity = map(
        travelingBarY2,
        ...(travelingBarY2 < height / 2 ? [ 0, height / 2 ] : [ height / 2, height ]),
        0, 1
    );
    fill(255, random(8, 12) * travelingBar2Opacity);
    rect(
        0, travelingBarY2,
        width, travelingBarHeight
    );
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}