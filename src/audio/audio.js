// Every sound is synthesised live with the Web Audio API, so the extension ships no audio files.

let ctx = null;

function audio() {
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
}

// One note: a wave at a frequency, starting `at` seconds from now.
function note(freq, at, length, { type = "square", level = 0.18, slideTo = null } = {}) {
    const a = audio();
    const t = a.currentTime + at;
    const osc = a.createOscillator();
    const gain = a.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + length);
    gain.gain.setValueAtTime(level, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + length);
    osc.connect(gain).connect(a.destination);
    osc.start(t);
    osc.stop(t + length + 0.05);
}

// A short burst of noise, for crashes and thuds.
function noise(at, length, level = 0.3) {
    const a = audio();
    const t = a.currentTime + at;
    const buffer = a.createBuffer(1, Math.floor(a.sampleRate * length), a.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const src = a.createBufferSource();
    const gain = a.createGain();
    src.buffer = buffer;
    gain.gain.value = level;
    src.connect(gain).connect(a.destination);
    src.start(t);
}

const sounds = {
    // A rising fanfare that lands on a held chord.
    accepted: () => {
        [523, 659, 784].forEach((f, i) => note(f, i * 0.12, 0.2));
        [1047, 1319, 1568].forEach((f) => note(f, 0.36, 1.1, { type: "triangle", level: 0.14 }));
    },
    // A sad trombone: three steps down, the last one sliding away.
    wrong: () => {
        [392, 370, 349].forEach((f, i) => note(f, i * 0.32, 0.3, { type: "sawtooth", level: 0.12 }));
        note(330, 0.96, 0.9, { type: "sawtooth", level: 0.12, slideTo: 220 });
    },
    // Powering down: a long falling sweep.
    tle: () => {
        note(880, 0, 1.4, { type: "triangle", level: 0.2, slideTo: 60 });
        note(440, 0.1, 1.3, { type: "sine", level: 0.15, slideTo: 40 });
    },
    // A harsh double buzzer.
    runtime: () => {
        note(110, 0, 0.22, { type: "sawtooth", level: 0.22 });
        note(110, 0.3, 0.22, { type: "sawtooth", level: 0.22 });
        noise(0, 0.15, 0.12);
    },
    // Three quick warning beeps.
    memory: () => {
        [0, 0.16, 0.32].forEach((at) => note(1200, at, 0.1, { type: "square", level: 0.12 }));
    },
    // A dull thud and a falling blip.
    compile: () => {
        note(90, 0, 0.35, { type: "sine", level: 0.4, slideTo: 40 });
        noise(0, 0.12, 0.2);
        note(600, 0.2, 0.4, { type: "square", level: 0.08, slideTo: 150 });
    },
};

function playSound(type) {

    const sound = sounds[type];

    if (!sound) {
        console.warn("SolveFX: Unknown sound:", type);
        return;
    }

    try {
        sound();
    } catch (err) {
        console.warn("SolveFX:", err);
    }

}
