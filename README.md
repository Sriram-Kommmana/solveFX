# SolveFX

> Turn your LeetCode submissions into cinematic moments.

SolveFX is a fun Chrome extension that enhances the LeetCode submission experience by playing unique sounds and displaying custom overlays based on the final verdict.

Whether it's a fanfare after an Accepted solution or a power-down screen for Time Limit Exceeded, SolveFX makes every submission memorable. Every sound is synthesised in the browser and every overlay is drawn with HTML and CSS, so the extension ships no audio or image files.

---

## Features

### Accepted

* A rising fanfare
* A gold "Accepted" title card

### Wrong Answer

* A sad trombone
* A red "Wrong answer" title card over a greyed-out page

### Time Limit Exceeded

* A power-down sweep
* A shutdown screen

### Runtime Error

* A harsh double buzzer
* A fake crash screen

### Memory Limit Exceeded

* Three warning beeps
* An "Out of memory" dialog box

### Compile Error

* A dull thud
* A fake compiler terminal

---

## Project Structure

```text
SolveFX/
│
├── manifest.json
│
├── src/
│   ├── audio/
│   ├── content/
│   ├── handlers/
│   ├── overlay/
│   ├── popup/
│   └── utils/
│
├── README.md
└── .gitignore
```

---

## Tech Stack

* JavaScript
* Chrome Extensions (Manifest V3)
* HTML
* CSS
* Web Audio API
* Chrome Runtime API
* DOM Manipulation
* Fetch API Interception

---

## How It Works

1. Injects a script into the LeetCode page.
2. Intercepts submission-related network requests.
3. Detects the final submission verdict.
4. Plays the corresponding sound effect.
5. Displays a themed overlay based on the verdict.

---

## Installation

1. Clone this repository.

```bash
git clone https://github.com/Sriram-Kommmana/solveFX.git
```

2. Open Chrome and navigate to:

```text
chrome://extensions
```

3. Enable **Developer Mode**.

4. Click **Load unpacked**.

5. Select the **SolveFX** folder.

6. Open LeetCode and submit a solution.

---

## Future Improvements

* Multiple sound packs
* Custom themes
* User-configurable settings
* Additional verdict animations

---

## Contributing

This project was built as a fun personal project. Feel free to fork it, experiment with your own sound packs, or create new overlay themes.

---

## License

This project is intended for educational and personal use only.
