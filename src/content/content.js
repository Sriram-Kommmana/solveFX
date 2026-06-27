// --------------------------------------------------
// Inject inject.js into page context
// --------------------------------------------------
const script = document.createElement("script");
script.src = chrome.runtime.getURL("src/content/inject.js");

script.onload = () => {
    script.remove();
};

(document.head || document.documentElement).appendChild(script);

// --------------------------------------------------
// Listen for messages from inject.js
// --------------------------------------------------

window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    if (!event.data) return;
    if (event.data.source !== "SolveFX") return;
    if (event.data.type !== "VERDICT") return;

    handleVerdict(event.data);
});