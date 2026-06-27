let overlay = null;

function createOverlay() {

    if (overlay) return;

    overlay = document.createElement("div");
    overlay.id = "solvefx-overlay";

    document.body.appendChild(overlay);

}

function showOverlay(type, data) {

    createOverlay();

    overlay.className = "";
    overlay.innerHTML = "";

    switch (type) {

        // ----------------------------------
        // ACCEPTED
        // ----------------------------------

        case "accepted":

            overlay.innerHTML = `
                <img class="solvefx-image"
                    src="${chrome.runtime.getURL("assets/images/mission-passed.png")}" />
            `;

            break;

        // ----------------------------------
        // WRONG
        // ----------------------------------

        case "wrong":

            overlay.innerHTML = `
                <img class="solvefx-image"
                    src="${chrome.runtime.getURL("assets/images/wasted.png")}" />
            `;

            break;

        // ----------------------------------
        // MEMORY
        // ----------------------------------

        case "memory":

            overlay.innerHTML = `
                <img class="solvefx-image-memory"
                    src="${chrome.runtime.getURL("assets/images/memory.png")}" />
            `;

            break;

        // ----------------------------------
        // TIME LIMIT
        // ----------------------------------

        case "tle":

            overlay.classList.add("shutdown");

            overlay.innerHTML = `
                <div class="shutdown-text">
                    Windows is shutting down...
                </div>
            `;

            break;

        // ----------------------------------
        // RUNTIME
        // ----------------------------------

        case "runtime":

            overlay.classList.add("bsod");

            overlay.innerHTML = `
                <div class="bsod-screen">

                A critical error has occurred.

                SolveFX has stopped your program
                to prevent further embarrassment.

                RUNTIME ERROR

                Collecting crash information...

                ████████████████████ 100%

                </div>
            `;

            break;

        // ----------------------------------
        // COMPILE
        // ----------------------------------

        case "compile":

            overlay.classList.add("terminal");

            overlay.innerHTML = `
                <pre class="terminal-screen">
                BUILD FAILED

                error: expected ';'

                Compilation terminated.

                Exit Code : 1
                </pre>
            `;

            break;

    }

    overlay.classList.add("show");

    clearTimeout(showOverlay.timer);

    showOverlay.timer = setTimeout(() => {

        overlay.className = "";

        overlay.innerHTML = "";

    }, 3500);

}