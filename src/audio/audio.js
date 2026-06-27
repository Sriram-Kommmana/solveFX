const sounds = {

    accepted: new Audio(chrome.runtime.getURL("assets/sounds/accepted.mp3")),
    wrong: new Audio(chrome.runtime.getURL("assets/sounds/wrong.mp3")),
    tle: new Audio(chrome.runtime.getURL("assets/sounds/tle.mp3")),
    runtime: new Audio(chrome.runtime.getURL("assets/sounds/runtime.mp3")),
    memory: new Audio(chrome.runtime.getURL("assets/sounds/memory.mp3")),
    compile: new Audio(chrome.runtime.getURL("assets/sounds/compile.mp3"))

};

function playSound(type) {

    const sound = sounds[type];

    if (!sound) {
        console.warn("SolveFX: Unknown sound:", type);
        return;
    }

    // Restart the sound if it's already playing
    sound.pause();
    sound.currentTime = 0;

    sound.play().catch(err => {
        console.warn("SolveFX:", err);
    });

}