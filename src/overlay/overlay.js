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

            overlay.classList.add("passed");

            overlay.innerHTML = `
                <div class="solvefx-title">
                    <b>Accepted</b>
                    <small>All test cases passed</small>
                </div>
            `;

            break;

        // ----------------------------------
        // WRONG
        // ----------------------------------

        case "wrong":

            overlay.classList.add("failed");

            overlay.innerHTML = `
                <div class="solvefx-title">
                    <b>Wrong answer</b>
                    <small>So close. Probably.</small>
                </div>
            `;

            break;

        // ----------------------------------
        // MEMORY
        // ----------------------------------

        case "memory":

            overlay.innerHTML = `
                <div class="solvefx-dialog">
                    <div class="solvefx-dialog__bar">Out of memory</div>
                    <p>Your solution asked for more memory than this problem allows.</p>
                    <span class="solvefx-dialog__ok">OK</span>
                </div>
            `;

            break;

        // ----------------------------------
        // TIME LIMIT
        // ----------------------------------

        case "tle":

            overlay.classList.add("shutdown");

            overlay.innerHTML = `
                <div class="shutdown-text">
                    Time's up. Shutting down...
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