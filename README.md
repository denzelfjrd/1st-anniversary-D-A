# 💖 1st Anniversary Web Application — Customization & Editing Guide

Welcome to your personalized **1st Anniversary Web Application**! This interactive web app is built with HTML5, CSS3, and JavaScript, styled in a romantic burgundy/pink glassmorphism design with floating heart/dinosaur canvas animations, background music, Polaroid memory cards, a parchment letter scroll with custom voice message support, a relationship quiz, an interactive love jar, and a playful adults-only private vault.

---

## 📱 Page Flow & Sequence

The application follows a linear 4-stage page sequence:

1. **Anniversary Password Screen (Landing Page)**  
   - The app starts locked with an anniversary date password prompt.
   - Default accepted passwords: `1011`, `10/11`, `october11`, `oct11` (or any text containing `1011` or `october11`).
   - Entering the correct anniversary password unlocks the app and takes your partner directly to Stage 1.

2. **Stage 1: Anniversary Letter (`#page-letter`)**  
   - Features a vintage parchment scroll with a typewriter letter unroll animation.
   - Features an optional voice message player (`assets/audio/anniversary-voice.mp3`).
   - Clicking **"Continue to Timeline 📸 ›"** proceeds to Stage 2.

3. **Stage 2: Photo & Video Timeline (`#page-timeline`)**  
   - Interactive month bar (October 2025 – October 2026).
   - Polaroid cards display photos and MP4 videos for each month.
   - Clicking any polaroid opens a full-screen detail view with custom memory captions.
   - Clicking **"Next: Little Surprises 🎁 ›"** proceeds to Stage 3.

4. **Stage 3: Surprises & Games (`#page-extras`)**  
   - **Relationship Quiz**: Interactive quiz with questions, options, and sweet response feedback.
   - **"Reasons I Love You" Jar**: Visual glass jar that reveals a random love note when tapped.
   - **Mood Message Selector**: Wholesome messages based on current feelings (Sad, Mad, Happy, Bored, Heavy).
   - **Random Memory Drawer**: Category buttons pulling random surprise memory polaroids.
   - **Adults-Only Vault (18+)**: Password-gated private vault asking: *"What’s our favourite or usual position?"* (Default answer: `missionary`).

---

## ✏️ Step-by-Step Customization Guide

All personal text, questions, notes, and media paths are conveniently organized into clearly labeled sections in [`script.js`](file:///c:/Users/GBI-Execom/Documents/Coding/Happy%20Anniversary/script.js).

### 1. Editing the Anniversary Password
- **File**: [`script.js`](file:///c:/Users/GBI-Execom/Documents/Coding/Happy%20Anniversary/script.js)
- **Section**: `3. PAGE PROGRESSION & ANNIVERSARY PASSWORD MANAGER`
- **How to edit**:
  Locate `checkPassword()` in `script.js`:
  ```javascript
  const validPasswords = ['1011', 'october11', 'oct11', '10112025', 'october112025', '101125'];
  ```
  Add or replace any date strings you want to accept as valid anniversary passwords (in lowercase without spaces/slashes).

---

### 2. Editing the Anniversary Letter Text & Voice MP3
- **Letter Text**:
  - **File**: [`script.js`](file:///c:/Users/GBI-Execom/Documents/Coding/Happy%20Anniversary/script.js)
  - **Section**: `5. PARCHMENT SCROLL LETTER TYPEWRITER LOGIC`
  - **How to edit**: Modify the string variable `letterText`. You can use standard line breaks for paragraphs.
- **Voice Message Audio**:
  - **File Path**: `assets/audio/anniversary-voice.mp3`
  - **How to edit**:
    1. Record your personal voice message (on your phone or computer) and export/convert it as an `.mp3` file.
    2. Save your file into the folder: `assets/audio/` with the filename `anniversary-voice.mp3`.
    3. If the audio file is missing or not yet added, the letter page gracefully displays a helpful hint note without breaking.

---

### 3. Adding & Editing Timeline Memories (Photos & Videos)
- **File**: [`script.js`](file:///c:/Users/GBI-Execom/Documents/Coding/Happy%20Anniversary/script.js)
- **Section**: `6. POLAROID TIMELINE DATA`
- **Asset Folders**:
  - Photos: `assets/images/`
  - Videos: `assets/videos/`
- **How to edit**:
  Locate the `timelineData` object in `script.js`. Each month contains an array of memory objects:
  ```javascript
  'Oct 2025': [
    { date: 'Oct 11, 2025', img: 'assets/images/your_photo.jpg', caption: 'Your memory description here!' },
    { date: 'Oct 15, 2025', video: 'assets/videos/your_video.mp4', caption: 'Your video description here!' }
  ]
  ```
  - For **photos**, use `img: 'assets/images/filename.jpg'`.
  - For **videos**, use `video: 'assets/videos/filename.mp4'`.
  - Place your actual image and video files inside `assets/images/` and `assets/videos/` respectively.

---

### 4. Editing Relationship Quiz Questions & Answers
- **File**: [`script.js`](file:///c:/Users/GBI-Execom/Documents/Coding/Happy%20Anniversary/script.js)
- **Section**: `7. RELATIONSHIP QUIZ (EDIT YOUR QUESTIONS HERE!)`
- **How to edit**:
  Locate the `quizQuestions` array:
  ```javascript
  const quizQuestions = [
    {
      id: 1,
      question: "Where did we have our very first official date?",
      options: [
        "Movie Theater 🎬",
        "Coffee Shop ☕",
        "Park Picnic 🧺",
        "Late Night Diner 🍔"
      ],
      correctIndex: 0, // 0-based index of the correct option (0 = first option, 1 = second option, etc.)
      sweetResponseCorrect: "Bingo bby! That date was the beginning of our forever! 😘",
      sweetResponseIncorrect: "Aww almost! Remember when we went to the movie theater? 🎬"
    }
  ];
  ```
  You can add new questions, remove existing ones, or edit the options and sweet response messages.

---

### 5. Editing "Reasons I Love You" Jar Notes
- **File**: [`script.js`](file:///c:/Users/GBI-Execom/Documents/Coding/Happy%20Anniversary/script.js)
- **Section**: `8. REASONS I LOVE YOU JAR (EDIT YOUR NOTES HERE!)`
- **How to edit**:
  Locate the `loveJarNotes` array:
  ```javascript
  const loveJarNotes = [
    "I love the way your eyes light up whenever you talk about something you're passionate about. ✨",
    "I love how safe, warm, and comfortable I feel every single time I am in your arms. 🫂",
    "Add your personal love note string here!"
  ];
  ```
  Add as many love notes as you like! The app automatically ensures that the exact same note will not be picked twice in a row when there is more than one note.

---

### 6. Editing the Adults-Only Gate & Privacy Limitations
- **File**: [`script.js`](file:///c:/Users/GBI-Execom/Documents/Coding/Happy%20Anniversary/script.js)
- **Section**: `10. ADULTS-ONLY 18+ PASSWORD GATE & VAULT LOGIC`
- **Password Prompt**: *"What’s our favourite or usual position?"*
- **Default Answer**: `missionary` (accepts any capitalization like `Missionary` or `MISSIONARY` and ignores extra spaces).
- **How to edit answer**:
  Locate `checkAdultPassword()` in `script.js`:
  ```javascript
  if (rawVal === 'missionary') { ... }
  ```
  Change `'missionary'` to any answer string you prefer.

> [!IMPORTANT]
> **Privacy & Security Notice**:
> The password gate implemented in this web application uses client-side JavaScript. This serves as a **playful privacy barrier** for a fun, interactive personal surprise. It does **not** provide cryptographic security or server-side authentication; the underlying content and JavaScript variables are stored in front-end files and can be discovered by inspecting the browser's source code or Developer Tools.

---

## 📂 Directory Overview

```
Happy Anniversary/
├── index.html                 # Main HTML structure & page sections
├── style.css                  # Romantic burgundy glassmorphism design & animations
├── script.js                  # App logic, questions, notes, letter & sequence manager
├── README.md                  # Customization guide (this file)
└── assets/
    ├── audio/
    │   ├── README.txt
    │   └── anniversary-voice.mp3   # (Place your optional voice note MP3 here)
    ├── images/                # (Place your photo memories here)
    ├── music/                 # (Place your background music MP3s here)
    └── videos/                # (Place your video memories MP3s/MP4s here)
```

Enjoy surprising your favorite person! Happy 1st Anniversary! 💕
