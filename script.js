/* ==========================================================================
   ANNIVERSARY APP LOGIC & INTERACTION ENGINE
   1. Floating Hearts & Dinosaurs Canvas
   2. Background Music Player
   3. Page Progression & Anniversary Password
   4. Letter Voice Message Player
   5. Parchment Scroll Letter Typewriter
   6. Photo & Video Memory Timeline
   7. Relationship Quiz (EDIT YOUR QUESTIONS HERE!)
   8. Reasons I Love You Jar (EDIT YOUR NOTES HERE!)
   9. Mood Messages & Random Memory Drawer
   10. Adults-Only 18+ Password Gate & Vault
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 1. FLOATING HEARTS & DINOSAURS CANVAS ANIMATION 🦖 🦕 💖
  // ========================================================================
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particleTypes = ['💖', '💕', '❤️', '🦖', '🦕', '🌸'];

    class FloatingParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 80;
        this.size = Math.random() * 16 + 18;
        this.speedY = Math.random() * 1.3 + 0.5;
        this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
        this.opacity = Math.random() * 0.6 + 0.35;
        this.symbol = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        this.rotation = Math.random() * 0.4 - 0.2;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -40) this.reset();
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.symbol, 0, 0);
        ctx.restore();
      }
    }

    const particles = Array.from({ length: 32 }, () => new FloatingParticle());

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }


  // ========================================================================
  // 2. BACKGROUND MUSIC PLAYER
  // ========================================================================
  const musicTracks = [
    {
      title: "Palagi 💕 (1/5)",
      src: "assets/music/palagi.mp3",
      fallback: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=sweet-love-10903.mp3"
    },
    {
      title: "Palagi 💕 (2/5)",
      src: "assets/music/palagi.mp3",
      fallback: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      title: "Palagi 💕 (3/5)",
      src: "assets/music/palagi.mp3",
      fallback: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      title: "Palagi 💕 (4/5)",
      src: "assets/music/palagi.mp3",
      fallback: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3"
    },
    {
      title: "Palagi 💕 (5/5)",
      src: "assets/music/palagi.mp3",
      fallback: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;
  let isUsingFallback = false;

  const bgAudio = document.getElementById('bgAudio');
  const btnMusicToggle = document.getElementById('btnMusicToggle');
  const btnMusicNext = document.getElementById('btnMusicNext');
  const musicIcon = document.getElementById('musicIcon');
  const trackTitle = document.getElementById('trackTitle');
  const trackStatus = document.getElementById('trackStatus');

  function loadTrack(index) {
    currentTrackIndex = index;
    isUsingFallback = false;
    const track = musicTracks[currentTrackIndex];
    if (bgAudio && track) {
      bgAudio.src = track.src;
      if (trackTitle) trackTitle.textContent = track.title;
    }
  }

  function playMusic() {
    if (!bgAudio) return;
    if (!bgAudio.src) loadTrack(0);
    const promise = bgAudio.play();
    if (promise !== undefined) {
      promise.then(() => {
        isPlaying = true;
        musicIcon?.classList.add('playing');
        if (trackStatus) trackStatus.textContent = "Playing 💕";
      }).catch(err => {
        console.log("Autoplay waiting for user gesture:", err);
        isPlaying = false;
        musicIcon?.classList.remove('playing');
        if (trackStatus) trackStatus.textContent = "Tap to Play 💕";
      });
    }
  }

  function pauseMusic() {
    if (!bgAudio) return;
    bgAudio.pause();
    isPlaying = false;
    musicIcon?.classList.remove('playing');
    if (trackStatus) trackStatus.textContent = "Paused ⏸️";
  }

  function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
    loadTrack(currentTrackIndex);
    playMusic();
  }

  btnMusicToggle?.addEventListener('click', () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });

  btnMusicNext?.addEventListener('click', nextTrack);
  bgAudio?.addEventListener('ended', nextTrack);

  bgAudio?.addEventListener('error', (e) => {
    const track = musicTracks[currentTrackIndex];
    if (track && track.fallback && !isUsingFallback) {
      console.info(`Local asset '${track.src}' not found, switching to online fallback...`);
      isUsingFallback = true;
      bgAudio.src = track.fallback;
      playMusic();
    } else {
      console.warn("Audio load error, switching to next track:", e);
      setTimeout(nextTrack, 800);
    }
  });

  loadTrack(0);
  playMusic();

  const startAudioOnFirstUserGesture = () => {
    if (!isPlaying) {
      playMusic();
    }
    ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(evt => {
      window.removeEventListener(evt, startAudioOnFirstUserGesture);
    });
  };

  ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(evt => {
    window.addEventListener(evt, startAudioOnFirstUserGesture, { once: true });
  });


  // ========================================================================
  // 3. PAGE PROGRESSION & ANNIVERSARY PASSWORD MANAGER
  // Sequence: Password (Landing) -> Letter -> Timeline -> Surprises (Extras)
  // ========================================================================
  const passwordForm = document.getElementById('passwordForm');
  const passInput = document.getElementById('passInput');
  const passErrorMsg = document.getElementById('passErrorMsg');
  const appStepNav = document.getElementById('appStepNav');

  let isUnlocked = false;

  function showPage(targetPageId) {
    document.querySelectorAll('.app-page').forEach(page => {
      page.classList.remove('active');
      page.classList.add('hidden');
    });

    const target = document.getElementById(targetPageId);
    if (target) {
      target.classList.remove('hidden');
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.step-dot').forEach(dot => {
      dot.classList.toggle('active', dot.dataset.page === targetPageId);
    });
  }

  function checkPassword() {
    if (!passInput) return;
    const rawVal = passInput.value.trim().toLowerCase().replace(/[\s\/-]/g, '');
    const validPasswords = ['1011', 'october11', 'oct11', '10112025', 'october112025', '101125'];

    if (validPasswords.includes(rawVal) || rawVal.includes('1011') || rawVal.includes('october11')) {
      isUnlocked = true;
      if (passErrorMsg) passErrorMsg.classList.add('hidden');
      if (appStepNav) appStepNav.classList.remove('hidden');
      
      // Navigate to Stage 1: Anniversary Letter!
      showPage('page-letter');
      
      if (!isPlaying) playMusic();
    } else {
      if (passErrorMsg) passErrorMsg.classList.remove('hidden');
      passInput.classList.add('shake');
      setTimeout(() => passInput.classList.remove('shake'), 400);
    }
  }

  passwordForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    checkPassword();
  });

  // Page Sequence Navigation Handlers:
  // Letter -> Timeline -> Extras
  document.getElementById('btnToTimeline')?.addEventListener('click', () => showPage('page-timeline'));
  document.getElementById('btnBackToLetter')?.addEventListener('click', () => showPage('page-letter'));
  document.getElementById('btnToExtras')?.addEventListener('click', () => showPage('page-extras'));
  document.getElementById('btnBackToTimeline')?.addEventListener('click', () => showPage('page-timeline'));
  document.getElementById('btnRestartApp')?.addEventListener('click', () => {
    showPage('page-intro');
    if (passInput) passInput.value = '';
  });

  document.querySelectorAll('.step-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      if (isUnlocked && dot.dataset.page) {
        showPage(dot.dataset.page);
      }
    });
  });


  // ========================================================================
  // 4. LETTER VOICE MESSAGE AUDIO PLAYER
  // Path: assets/audio/anniversary-voice.mp3
  // ========================================================================
  const btnVoiceToggle = document.getElementById('btnVoiceToggle');
  const voicePlayIcon = document.getElementById('voicePlayIcon');
  const voicePlayLabel = document.getElementById('voicePlayLabel');
  const voiceStatusMsg = document.getElementById('voiceStatusMsg');
  const letterVoiceAudio = document.getElementById('letterVoiceAudio');
  const voiceMsgInfoNote = document.getElementById('voiceMsgInfoNote');

  let isVoicePlaying = false;

  function toggleVoiceMessage() {
    if (!letterVoiceAudio) return;

    if (isVoicePlaying) {
      letterVoiceAudio.pause();
      isVoicePlaying = false;
      if (voicePlayIcon) voicePlayIcon.textContent = '▶';
      if (voicePlayLabel) voicePlayLabel.textContent = 'Play Voice Message';
      if (voiceStatusMsg) voiceStatusMsg.textContent = 'Paused ⏸️';
    } else {
      // Pause background music while voice message plays for clarity!
      if (isPlaying) pauseMusic();

      const playPromise = letterVoiceAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          isVoicePlaying = true;
          if (voicePlayIcon) voicePlayIcon.textContent = '⏸';
          if (voicePlayLabel) voicePlayLabel.textContent = 'Pause Voice Message';
          if (voiceStatusMsg) voiceStatusMsg.textContent = 'Playing Voice Note... 🎙️';
          if (voiceMsgInfoNote) voiceMsgInfoNote.classList.add('hidden');
        }).catch(err => {
          console.warn("Voice MP3 not found or blocked by browser:", err);
          isVoicePlaying = false;
          if (voicePlayIcon) voicePlayIcon.textContent = '▶';
          if (voicePlayLabel) voicePlayLabel.textContent = 'Voice Note File Not Found';
          if (voiceStatusMsg) voiceStatusMsg.textContent = 'Audio file missing';
          if (voiceMsgInfoNote) voiceMsgInfoNote.classList.remove('hidden');
        });
      }
    }
  }

  btnVoiceToggle?.addEventListener('click', toggleVoiceMessage);

  letterVoiceAudio?.addEventListener('ended', () => {
    isVoicePlaying = false;
    if (voicePlayIcon) voicePlayIcon.textContent = '▶';
    if (voicePlayLabel) voicePlayLabel.textContent = 'Replay Voice Message';
    if (voiceStatusMsg) voiceStatusMsg.textContent = 'Finished 💕';
  });

  letterVoiceAudio?.addEventListener('error', () => {
    isVoicePlaying = false;
    if (voicePlayIcon) voicePlayIcon.textContent = '▶';
    if (voicePlayLabel) voicePlayLabel.textContent = 'Add MP3 to play audio';
    if (voiceStatusMsg) voiceStatusMsg.textContent = 'Audio file missing';
    if (voiceMsgInfoNote) voiceMsgInfoNote.classList.remove('hidden');
  });


  // ========================================================================
  // 5. PARCHMENT SCROLL LETTER TYPEWRITER LOGIC
  // ========================================================================
  const letterText = `Happy 1st Anniversary, my brobro, my lovesss, my bby!!! 💖 

I’m soooooooooo happyyyyyy!!! We’re officially 1 year olds 😂

Wow I finally found MY girlfriend and it is now 1 year validity with original copy HAHAHHAHA just kidding bby 😂😂

Now through the ups and downs within those first 12 months we thought that it was hard, well… There were times that we would not talk to each other and hindi mag papansinan and tampuhan, but don’t you think that the love felt more real because of those things that happened, and how we resolved them and it became less likely to happen again or even didn’t happen again at all. We wouldn’t have bothered to fix things if it wasn’t true love bby ko  🙊🫶🏻🦕  soooo…. 

Thank you for loving me, for laughing with me, for listening to me, for understanding me, for filling that empty void space in my heart, and for keeping me bby. you are everything to me and I will forever cherish you my first girlfriend 😘

Also I’ve prepared you this simple webapp on some of the things that we have done so far throughout our first year of being together my bby loveloves nakoo! 😘😘😘😘

Here is to 365 days of unforgettable memories, and to forever more to come. I love you so much, bby ko! 😘😘😘😘😘

Always yours, 
Forever & Ever ❤️
`;

  const openLetterBtn = document.getElementById('openLetterBtn');
  const letterPaper = document.getElementById('letterPaper');
  const typedTextEl = document.getElementById('typedLetterText');
  const cursorEl = document.getElementById('letterCursor');
  let isTyping = false, charIndex = 0;

  function typeWriter() {
    if (!typedTextEl) return;
    if (charIndex < letterText.length) {
      typedTextEl.textContent += letterText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 70);
    } else {
      isTyping = false;
      if (cursorEl) cursorEl.style.display = 'none';
    }
  }

  openLetterBtn?.addEventListener('click', () => {
    openLetterBtn.classList.add('hidden');
    if (letterPaper) letterPaper.classList.remove('hidden');
    if (!isTyping && charIndex === 0) {
      isTyping = true;
      typeWriter();
    }
  });


  // ========================================================================
  // 6. POLAROID TIMELINE DATA & CLICK-TO-REVEAL MODAL LOGIC
  // ========================================================================
  function isVideoMedia(item) {
    if (!item) return false;
    if (item.type === 'video') return true;
    if (item.type === 'image' || item.type === 'photo') return false;
    const src = (item.video || item.img || item.src || '').toLowerCase();
    return /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(src);
  }

  function getMediaUrl(item) {
    if (!item) return '';
    return item.video || item.img || item.src || '';
  }

  const months = [
    'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 
    'Feb 2026', 'Mar 2026', 'Apr 2026', 'May 2026', 
    'Jun 2026', 'Jul 2026', 'Aug 2026', 'Sep 2026', 'Oct 2026'
  ];

  function createPlaceholderImg(title, color1 = '#ff4b72', color2 = '#2d0b22') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color1}"/>
          <stop offset="100%" stop-color="${color2}"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <circle cx="300" cy="180" r="75" fill="rgba(255,255,255,0.15)"/>
      <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="28" font-weight="bold">${title}</text>
      <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" fill="#ffccd5" font-family="sans-serif" font-size="18">💖 Tap to reveal memory</text>
    </svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  const timelineData = {
    'Oct 2025': [
      { date: 'Oct 11, 2025', img: 'assets/images/oct11-church.jpg', caption: 'The day and place where you said yes, and where I promised to marry you 💖😘' },
      { date: 'Oct 11, 2025', img: 'assets/videos/oct11-hervid.mp4', caption: 'Strolling with this beautiful girl 🦕😘' },
      { date: 'Oct 11, 2025', img: 'assets/images/oct11-us.jpg', caption: 'Taking a break during our pasyal.' },
    ],
    'Nov 2025': [
      { date: 'Nov 23, 2025', img: 'assets/images/nov23-hercomp.jpg', caption: 'The day we tried playing computer together HAHAHA' },
      { date: 'Nov 29, 2025', img: 'assets/images/nov29-herbrace.jpg', caption: 'Your braces were hurting because kakatapos mo lang magpa dentist' }
    ],
    'Dec 2025': [
      { date: 'Dec 27, 2025', img: 'assets/images/dec27-us.jpg', caption: 'One of my most favourite photos that we have' }
    ],
    'Jan 2026': [
      { date: 'Jan 12, 2026', img: 'assets/images/jan12-us.jpg', caption: 'The day you went home to leyte 🛫' },
    ],
    'Feb 2026': [
      { date: 'Feb 14, 2026', img: createPlaceholderImg('1st Valentine\'s', '#ff4b72', '#ff758c'), caption: 'Roses, chocolates, and infinite love for my bby.' }
    ],
    'Mar 2026': [
      { date: 'Mar 18, 2026', img: 'assets/images/mar18-us.jpg', caption: 'Strolling with kuya Ian, Kuya Adin and Ate Celine 🚶🏻‍➡️🚶🏻‍♀️‍➡️' },
    ],
    'Apr 2026': [
      { date: 'Apr 11, 2026', img: 'assets/images/apr11-us.jpg', caption: 'Thank you for being there bby, My first birthday with you 😘🥰💖💗💓💞💕' },
    ],
    'May 2026': [
      { date: 'May 30, 2026', img: 'assets/images/may30-us.jpg', caption: 'At Cloud 9 where we placed a lock of our eternal love chariz! ☁️🔒😂' },
      { date: 'May 31, 2026', img: 'assets/images/may31-pengpay.jpg', caption: 'Kahit walang wash yan bby gooo! 🤤😋🥰' },
      { date: 'May 31, 2026', img: 'assets/images/may31-us.jpg', caption: 'Best Salad We Ever Tasted at Pinto Museum? 🥗💖' },
    ],
    'Jun 2026': [
      { date: 'Jun 07, 2026', img: 'assets/images/jun7-us.jpg', caption: 'Biky Biking at Mall of Asia Sea Side 🚴🏻🚲' },
      { date: 'Jun 28, 2026', img: 'assets/images/jun28-us.jpg', caption: 'Getting Angry at Roundabout Maysilo Circle 😡🤬👿😤' },
    ],
    'Jul 2026': [
      { date: 'Jul 11, 2026', img: 'assets/images/jul11-us.jpg', caption: 'Bowling & date time at Ayala Malls Circuit Timezone 🎳 ' },
    ],
    'Aug 2026': [
      { date: 'Aug 21, 2026', img: 'assets/images/aug21-us.jpg', caption: "Sponty Trip with my bby's friends after tampuhan 🚀🗿" },
      { date: 'Aug 21, 2026', img: 'assets/images/aug21-us2.jpg', caption: "Not so candid shot, heya heyaan pa eh parang di lang nag si-6 🫣😳6️⃣" },
    ],
    'Sep 2026': [
      { date: 'Sep 20, 2026', img: 'assets/images/sep20-us2.jpg', caption: "Not so candid shot, heya heyaan pa eh parang di lang nag si-6 🫣😳6️⃣" },
    ],
    'Oct 2026': [
      { date: 'Oct 11, 2026', img: 'assets/images/oct11-firstanniv.jpg', caption: '365 days of love, laughter, and endless happiness. Happy 1st Anniversary bby ko! 😘' }
    ]
  };

  const monthNav = document.getElementById('monthNav');
  const timelineDisplay = document.getElementById('timelineDisplay');

  const photoModal = document.getElementById('photoModal');
  const closePhotoModal = document.getElementById('closePhotoModal');
  const detailMediaWrapper = document.getElementById('detailMediaWrapper');
  const detailPhotoDate = document.getElementById('detailPhotoDate');
  const detailPhotoTitle = document.getElementById('detailPhotoTitle');
  const detailPhotoDesc = document.getElementById('detailPhotoDesc');

  function openPolaroidModal(item) {
    if (!photoModal || !item) return;
    const mediaUrl = getMediaUrl(item);
    const isVid = isVideoMedia(item);

    if (detailMediaWrapper) {
      if (isVid) {
        detailMediaWrapper.innerHTML = `
          <video src="${mediaUrl}" controls autoplay loop playsinline class="modal-detail-media"></video>
        `;
      } else {
        detailMediaWrapper.innerHTML = `
          <img src="${mediaUrl}" alt="${item.date || 'Memory'}" class="modal-detail-media">
        `;
      }

      const mediaElem = detailMediaWrapper.querySelector('.modal-detail-media');
      mediaElem?.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'img') {
          mediaElem.classList.toggle('expanded');
        }
      });
    }

    if (detailPhotoDate) detailPhotoDate.textContent = item.date || '';

    if (detailPhotoTitle) {
      if (item.title) {
        detailPhotoTitle.textContent = item.title;
        detailPhotoTitle.style.display = 'block';
      } else {
        detailPhotoTitle.style.display = 'none';
      }
    }

    const captionText = item.caption || item.desc || '';
    if (detailPhotoDesc) detailPhotoDesc.textContent = captionText ? `"${captionText}"` : '';
    photoModal.classList.remove('hidden');
  }

  function closeModal() {
    if (photoModal) {
      photoModal.classList.add('hidden');
      if (detailMediaWrapper) {
        const modalVid = detailMediaWrapper.querySelector('video');
        if (modalVid) modalVid.pause();
      }
    }
  }

  closePhotoModal?.addEventListener('click', closeModal);

  photoModal?.addEventListener('click', (e) => {
    if (e.target === photoModal) closeModal();
  });

  let activeMonth = 'Oct 2025';

  function renderTimeline(m) {
    activeMonth = m;
    document.querySelectorAll('.month-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.month === m);
    });

    const items = timelineData[m] || [];
    if (!timelineDisplay) return;
    timelineDisplay.innerHTML = '';

    if (items.length === 0) {
      timelineDisplay.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-pink);">No memories added for this month yet! ❤️</p>`;
      return;
    }

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'polaroid-card';
      card.tabIndex = 0;
      card.role = 'button';
      card.ariaLabel = `View memory from ${item.date || ''}`;

      const mediaUrl = getMediaUrl(item);
      const isVid = isVideoMedia(item);

      const mediaMarkup = isVid
        ? `<div class="polaroid-img-wrapper">
             <span class="video-badge">🎥 Video</span>
             <video src="${mediaUrl}" autoplay loop muted playsinline></video>
           </div>`
        : `<div class="polaroid-img-wrapper">
             <img src="${mediaUrl}" alt="${item.date || ''}">
           </div>`;

      card.innerHTML = `
        ${mediaMarkup}
        <div class="polaroid-footer">
          <span class="polaroid-date">${item.date || ''}</span>
          <span class="polaroid-tap-hint">${isVid ? 'Play 🎥' : 'Tap me 📸'}</span>
        </div>
      `;

      card.addEventListener('click', () => openPolaroidModal(item));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPolaroidModal(item);
        }
      });
      timelineDisplay.appendChild(card);
    });
  }

  months.forEach(m => {
    const btn = document.createElement('button');
    btn.className = `month-btn ${m === activeMonth ? 'active' : ''}`;
    btn.dataset.month = m;
    btn.textContent = m;
    btn.addEventListener('click', () => renderTimeline(m));
    monthNav?.appendChild(btn);
  });

  renderTimeline('Oct 2025');

  let isDown = false;
  let startX, scrollLeftVal;

  monthNav?.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - monthNav.offsetLeft;
    scrollLeftVal = monthNav.scrollLeft;
  });
  monthNav?.addEventListener('mouseleave', () => isDown = false);
  monthNav?.addEventListener('mouseup', () => isDown = false);
  monthNav?.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - monthNav.offsetLeft;
    const walk = (x - startX) * 2;
    monthNav.scrollLeft = scrollLeftVal - walk;
  });

  document.getElementById('scrollLeft')?.addEventListener('click', () => monthNav?.scrollBy({ left: -180, behavior: 'smooth' }));
  document.getElementById('scrollRight')?.addEventListener('click', () => monthNav?.scrollBy({ left: 180, behavior: 'smooth' }));


  // ========================================================================
  // 7. RELATIONSHIP QUIZ (EDIT YOUR QUESTIONS HERE!)
  // Easily add, remove, or edit questions in this array!
  // ========================================================================
  const quizQuestions = [
    {
      id: 1,
      question: "Where did we first meet?",
      options: [
        "Ayala Malls Circuit",
        "Ayala Malls Trinoma",
        "Ayala Malls Manila Bay",
        "SM Mall of Asia"
      ],
      correctIndex: 0,
      sweetResponseCorrect: "Bingo bby! That date was the beginning of our forever! 😘",
      sweetResponseIncorrect: "Aww almost! Remember when we went to the movie theater? 🎬"
    },
    {
      id: 2,
      question: "What did we do on our first meet?",
      options: [
        "6",
        "Watch Lilo & Stitch",
        "Ate Ilaoilao",
        "We cancelled our first meet"
      ],
      correctIndex: 1,
      sweetResponseCorrect: "You got it Bby Ko! 🥰",
      sweetResponseIncorrect: "Aww close! No putotoy ㅋㅋㅋㅋ"
    },
    {
      id: 3,
      question: "What was our first call sign",
      options: [
        "Bubu & Dudu",
        "Putotoy & Pipi",
        "Brobro",
        "Bby"
      ],
      correctIndex: 2,
      sweetResponseCorrect: "Correct My Bby!!!",
      sweetResponseIncorrect: "So close! Try the other 3 answers"
    },
    {
      id: 4,
      question: "What's our favourite color group",
      options: [
        "Pastel",
        "Dark",
        "Neon",
        "Neutral"
      ],
      correctIndex: 3,
      sweetResponseCorrect: "Haha yes! Neutral diba tayo, bby ko!",
      sweetResponseIncorrect: "Aww! Maliiiiiiiiiiiiiiii"
    },
    {
      id: 5,
      question: "What's our theme song?",
      options: [
        "Palagi - TJ & KZ",
        "Hey Soul Sister - Train",
        "Hay nako - BINI",
        "A Thousand Years - Christina Perry"
      ],
      correctIndex: 0,
      sweetResponseCorrect: "Haha yes! Palagi diba yan yung kantang lagi nating pinapakinggan, bby ko! wkwkwk",
      sweetResponseIncorrect: "Aww! Try mo ulit bby kala ko ba always right ka! ㅋㅋㅋㅋ"
    }
  ];

  let currentQuizIndex = 0;
  let quizScore = 0;
  let hasAnsweredCurrentQuestion = false;

  const quizProgressTag = document.getElementById('quizProgressTag');
  const quizScoreTag = document.getElementById('quizScoreTag');
  const quizQuestionText = document.getElementById('quizQuestionText');
  const quizOptionsGrid = document.getElementById('quizOptionsGrid');
  const quizFeedbackBox = document.getElementById('quizFeedbackBox');
  const quizFeedbackText = document.getElementById('quizFeedbackText');
  const btnNextQuestion = document.getElementById('btnNextQuestion');
  const quizResultsBox = document.getElementById('quizResultsBox');
  const quizResultsMsg = document.getElementById('quizResultsMsg');
  const btnRestartQuiz = document.getElementById('btnRestartQuiz');

  function renderQuizQuestion(index) {
    if (!quizQuestionText || !quizOptionsGrid) return;
    hasAnsweredCurrentQuestion = false;

    if (quizFeedbackBox) quizFeedbackBox.classList.add('hidden');
    if (quizResultsBox) quizResultsBox.classList.add('hidden');

    const q = quizQuestions[index];
    if (!q) return;

    if (quizProgressTag) quizProgressTag.textContent = `Question ${index + 1} of ${quizQuestions.length}`;
    if (quizScoreTag) quizScoreTag.textContent = `Score: ${quizScore}`;
    quizQuestionText.textContent = q.question;

    quizOptionsGrid.innerHTML = '';
    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'btn-quiz-option';
      btn.textContent = optText;
      btn.addEventListener('click', () => submitQuizAnswer(optIdx));
      quizOptionsGrid.appendChild(btn);
    });
  }

  function submitQuizAnswer(selectedIdx) {
    if (hasAnsweredCurrentQuestion) return;
    hasAnsweredCurrentQuestion = true;

    const q = quizQuestions[currentQuizIndex];
    const isCorrect = (selectedIdx === q.correctIndex);

    const optionButtons = quizOptionsGrid?.querySelectorAll('.btn-quiz-option');
    optionButtons?.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add('incorrect');
      }
    });

    if (isCorrect) {
      quizScore++;
      if (quizScoreTag) quizScoreTag.textContent = `Score: ${quizScore}`;
      if (quizFeedbackText) {
        quizFeedbackText.textContent = q.sweetResponseCorrect;
        quizFeedbackText.className = "quiz-feedback-msg feedback-correct";
      }
    } else {
      if (quizFeedbackText) {
        quizFeedbackText.textContent = q.sweetResponseIncorrect;
        quizFeedbackText.className = "quiz-feedback-msg feedback-incorrect";
      }
    }

    if (quizFeedbackBox) quizFeedbackBox.classList.remove('hidden');

    if (btnNextQuestion) {
      if (currentQuizIndex === quizQuestions.length - 1) {
        btnNextQuestion.textContent = 'See Final Score 🏆';
      } else {
        btnNextQuestion.textContent = 'Next Question ›';
      }
    }
  }

  btnNextQuestion?.addEventListener('click', () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      currentQuizIndex++;
      renderQuizQuestion(currentQuizIndex);
    } else {
      // Show Final Quiz Results
      if (quizOptionsGrid) quizOptionsGrid.innerHTML = '';
      if (quizQuestionText) quizQuestionText.textContent = '';
      if (quizFeedbackBox) quizFeedbackBox.classList.add('hidden');
      if (quizResultsBox) {
        quizResultsBox.classList.remove('hidden');
        if (quizResultsMsg) {
          quizResultsMsg.textContent = `You scored ${quizScore} out of ${quizQuestions.length}! ${quizScore === quizQuestions.length ? 'Perfect score bby! You know my heart completely 💕' : 'You know us so well bby! 😘'}`;
        }
      }
    }
  });

  btnRestartQuiz?.addEventListener('click', () => {
    currentQuizIndex = 0;
    quizScore = 0;
    renderQuizQuestion(0);
  });

  // Initialize Quiz
  renderQuizQuestion(0);


  // ========================================================================
  // 8. REASONS I LOVE YOU JAR (EDIT YOUR NOTES HERE!)
  // Add or edit love notes in this simple array!
  // ========================================================================
  const loveJarNotes = [
    "I love the way your eyes light up whenever you talk about something you're passionate about. ✨",
    "I love how safe, warm, and comfortable I feel every single time I am with you. 🫂",
    "I love your voice it's like my favourite song bby ko. 🎵",
    "I love how thoughtful, gentle, and caring you are with my heart. 💖",
    "I love our quiet late-night talks where hours pass by like seconds. 🌙",
    "I love how you always know how to make me smile even on my hardest days. ☀️",
    "I love you 💖💖💖💖💖💖💖💖💖💖💖💖💖💖",
    "I love your smell it's so addicting with or without your perfume bby ko! 💓",
    "I love the way you call me bby that only you can call me! 🐱",
    "I love the way you hold my hand 💖",
    "I love everything about you bby ko 💖💖💖💖💖💖💖💖💖💖💖💖💖💖"
  ];

  let lastJarNoteIndex = -1;
  const loveJarVisual = document.getElementById('loveJarVisual');
  const btnDrawJarNote = document.getElementById('btnDrawJarNote');
  const jarNoteDisplayBox = document.getElementById('jarNoteDisplayBox');
  const jarNoteNumber = document.getElementById('jarNoteNumber');
  const jarNoteText = document.getElementById('jarNoteText');

  function drawLoveJarNote() {
    if (!loveJarNotes || loveJarNotes.length === 0) return;

    // Avoid showing the same note twice in a row when there is > 1 note!
    let nextIndex = lastJarNoteIndex;
    if (loveJarNotes.length > 1) {
      while (nextIndex === lastJarNoteIndex) {
        nextIndex = Math.floor(Math.random() * loveJarNotes.length);
      }
    } else {
      nextIndex = 0;
    }
    lastJarNoteIndex = nextIndex;

    // Jar shake animation
    if (loveJarVisual) {
      loveJarVisual.classList.add('jar-shake');
      setTimeout(() => loveJarVisual.classList.remove('jar-shake'), 500);
    }

    if (jarNoteNumber) jarNoteNumber.textContent = `${nextIndex + 1}`;
    if (jarNoteText) jarNoteText.textContent = `"${loveJarNotes[nextIndex]}"`;
    if (jarNoteDisplayBox) jarNoteDisplayBox.classList.remove('hidden');
  }

  loveJarVisual?.addEventListener('click', drawLoveJarNote);
  btnDrawJarNote?.addEventListener('click', drawLoveJarNote);

  loveJarVisual?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      drawLoveJarNote();
    }
  });


  // ========================================================================
  // 9. MOOD MESSAGES & RANDOM MEMORY DRAWER
  // ========================================================================
  const moodMessages = {
    sad: [
      "Hey bby ko, take a deep breath. You are so strong, and I am always right here by your side. I love you! 🫂💖",
      "Whenever you feel sad, remember how much you mean to me. You bring light into my life every single day! ✨",
      "I wish I could wrap my arms around you right now and squeeze you tight. Everything is going to be okay, my love.",
      "Never forget how much I love you and how I'm willing to do anything for you just to make you happy!! 💖",
      "Bro's for life, never hide a secret from me that weighs you down 😉"
    ],
    mad: [
      "Sowe bbyy! Ako na naman siguro may kasalanan! Let me buy you your favorite food or snack hehehee 🍕🧋",
      "I know you're upset right now, but I still love you with all my heart. Talk to me when you're ready! ❤️",
      "Sending you 1,000 gentle forehead kisses to melt that anger away! 😘",
      "I promise to be a better listener and a better partner to you bby ko. I love you! 💖",
      "I hope that I could relieve thy angst and thou shall lend me a warm kess 😘"
    ],
    happy: [
      "Your happiness is my favorite thing in the world! Seeing you smile makes my entire day bright! ☀️",
      "Yay! Keep that beautiful smile on your face! I love seeing you happy bby ko! 🥰",
      "Wooowww happy yarn?, Let's be happy together bby!! Sama moooo kooo HAHAHAHA",
      "Essieee na ngete ngete lang ang bebe ko ahhh",
      "SINO NAG PAPANGITI SAYO?! LAGOOOT SAKIN!!!",
    ],
    bored: [
      "Wanna do something bby? 6?🍿?hang out?",
      "Fun fact: You are 100% the cutest human being in the universe. Not bored anymore, right? 😉",
      "ganito bby, sabi nila 1. higa ka muna, 2. pikit mo mata mo, 3. matulog ka",
      "HA? Inhale exercise tayo follow me HA!, HA!, HA!, HAAAAAAA!, HA!, HA!, HAHA!, HAHAHA!, AHAHAHAHAHAHAHAHAHA!",
      "??? 😉😉😉"
    ],
    heavy: [
      "It's okay to feel overwhelmed sometimes bby. You don't have to carry everything alone. I'm right here with you. 🫂 CALL MEEE! 😘",
      "Close your eyes for a minute. Imagine me giving you a warm, long hug. I've got you always. ❤️ CALL MEEE! 😘",
      "I want to hug you so tight right now that all your worries just melt away! 🫂 CALL MEEE! 😘",
      "No matter what it is bby, if it's that heavy and troubling you I'm always right here so CALL MEEE! 😘",
      "CALL MEEE! 😘"
    ]
  };

  const moodButtons = document.getElementById('moodButtons');
  const moodMessageBox = document.getElementById('moodMessageBox');
  const moodTag = document.getElementById('moodTag');
  const moodText = document.getElementById('moodText');
  const anotherMessageBtn = document.getElementById('anotherMessageBtn');
  let currentMood = '';

  function showRandomMoodMessage(mood) {
    currentMood = mood;
    const list = moodMessages[mood] || [];
    if (list.length === 0) return;
    const randomMsg = list[Math.floor(Math.random() * list.length)];
    if (moodTag) moodTag.textContent = `${mood.toUpperCase()} MOOD MESSAGE ❤️`;
    if (moodText) moodText.textContent = `"${randomMsg}"`;
    if (moodMessageBox) moodMessageBox.classList.remove('hidden');
  }

  moodButtons?.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-mood')) showRandomMoodMessage(e.target.dataset.mood);
  });
  anotherMessageBtn?.addEventListener('click', () => { if (currentMood) showRandomMoodMessage(currentMood); });


  // Random Memory Drawer
  const randomPhotoMemories = {
    firstMeet: [
      { img: 'assets/images/oct11-church.jpg', date: 'May 2025', title: 'The Nervous First Hello', desc: 'We were both a bit nervous ata but I\\m glad we met that day bby! ❤️' },
    ],
    secondMeet: [
      { img: createPlaceholderImg('Second Date 🍿', '#f72585', '#3a0ca3'), date: 'May 2025', title: 'Palagi by Dunkin', desc: 'Best Fanmeet/Concert Ever!' }
    ],
    firstTimes: [
      { img: createPlaceholderImg('First Beach Trip 🏖️', '#4361ee', '#3a0ca3'), date: 'Dec 2025', title: 'First Beach Trip', desc: 'Watching the sunset and getting sand everywhere!' }
    ],
    favoriteRandom: [
      { img: createPlaceholderImg('Beautiful Faces', '#f72585', '#2c272fff'), date: 'Dec 2025', title: 'Selfies', desc: 'One of my favorite random moments with you is still on Zambales!' }
    ]
  };

  const photoCategoryButtons = document.getElementById('photoCategoryButtons');
  const photoDisplayBox = document.getElementById('photoDisplayBox');
  const randomMediaWrapper = document.getElementById('randomMediaWrapper');
  const randomMemoryPolaroid = document.getElementById('randomMemoryPolaroid');
  const randomPhotoDate = document.getElementById('randomPhotoDate');
  const randomPhotoTitle = document.getElementById('randomPhotoTitle');
  const randomPhotoCaption = document.getElementById('randomPhotoCaption');
  const anotherPhotoBtn = document.getElementById('anotherPhotoBtn');
  let currentPhotoCategory = '';
  let currentDisplayedMemoryItem = null;

  function showRandomPhoto(cat) {
    currentPhotoCategory = cat;
    const list = randomPhotoMemories[cat] || [];
    if (list.length === 0) return;
    const item = list[Math.floor(Math.random() * list.length)];
    currentDisplayedMemoryItem = item;

    const mediaUrl = getMediaUrl(item);
    const isVid = isVideoMedia(item);

    if (randomMediaWrapper) {
      if (isVid) {
        randomMediaWrapper.innerHTML = `
          <span class="video-badge">🎥 Video</span>
          <video src="${mediaUrl}" autoplay loop muted playsinline></video>
        `;
      } else {
        randomMediaWrapper.innerHTML = `
          <img src="${mediaUrl}" alt="${item.title || 'Memory'}">
        `;
      }
    }

    if (randomPhotoDate) randomPhotoDate.textContent = item.date || '';
    if (randomPhotoTitle) randomPhotoTitle.textContent = item.title || '';
    if (randomPhotoCaption) randomPhotoCaption.textContent = item.desc || item.caption || '';
    if (photoDisplayBox) photoDisplayBox.classList.remove('hidden');
  }

  randomMemoryPolaroid?.addEventListener('click', () => {
    if (currentDisplayedMemoryItem) {
      openPolaroidModal(currentDisplayedMemoryItem);
    }
  });

  randomMemoryPolaroid?.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && currentDisplayedMemoryItem) {
      e.preventDefault();
      openPolaroidModal(currentDisplayedMemoryItem);
    }
  });

  photoCategoryButtons?.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-photo')) showRandomPhoto(e.target.dataset.category);
  });
  anotherPhotoBtn?.addEventListener('click', () => { if (currentPhotoCategory) showRandomPhoto(currentPhotoCategory); });


  // ========================================================================
  // 10. ADULTS-ONLY 18+ PASSWORD GATE & VAULT LOGIC
  // Gate Question: "What’s our favourite or usual position?"
  // Accepted Answer: "missionary" (case-insensitive, trims whitespace)
  // ========================================================================
  const adultPasswordForm = document.getElementById('adultPasswordForm');
  const adultPassInput = document.getElementById('adultPassInput');
  const adultPassErrorMsg = document.getElementById('adultPassErrorMsg');
  const adultGateFormWrapper = document.getElementById('adultGateFormWrapper');
  const adultContentVault = document.getElementById('adultContentVault');

  const spicyMoodMessages = {
    horny: [
      "Ooh bby ko... 😈 Can't wait for our next private date night where it's just the two of us! 🔥",
      "You drive me crazy every single day, and you look so attractive doing it! 🌶️",
      "Counting down the hours until I get to hold you close in the dark... 😘🔥",
      "I want to be inside you bby 🥵🥵",
      "I want you so bad 😫🔥",
      "Make me cum bby 🫦🤤"
    ],
    wild: [
      "Tonight: zero distractions, just endless kisses and passion! 💋🔥",
      "You + me + lock on the door = perfection. 🌶️✨",
      "Let's have a wild night filled with passion and pleasure! 🔥",
      "I want to explore every inch of your body tonight! 🥵",
      "Let's do a kinky position bby 🫦🥵",
      "Let's try something new bby 🤤🤤"
    ],
    cuddles: [
      "Ready to wrap up in blankets together and spoon all night long? 🛌💕",
      "The best place in the world is right against your chest listening to your heartbeat. 🫂",
      "Cuddles lang? 😉😉",
      "Kaso baka may tumusok eh 💖💖🦕🦕",
      "Baka tumayo si junior ko bby sa cuddles heheheh 🙊🙊🙊"
    ]
  };

  const spicyMoodButtons = document.getElementById('spicyMoodButtons');
  const spicyMoodMessageBox = document.getElementById('spicyMoodMessageBox');
  const spicyMoodTag = document.getElementById('spicyMoodTag');
  const spicyMoodText = document.getElementById('spicyMoodText');
  const anotherSpicyMessageBtn = document.getElementById('anotherSpicyMessageBtn');
  let currentSpicyMood = '';

  function checkAdultPassword() {
    if (!adultPassInput) return;
    const rawVal = adultPassInput.value.trim().toLowerCase();

    // Accept "missionary" ignoring capitalization and leading/trailing whitespace
    if (rawVal === 'missionary') {
      if (adultGateFormWrapper) adultGateFormWrapper.classList.add('hidden');
      if (adultContentVault) adultContentVault.classList.remove('hidden');
      if (adultPassErrorMsg) adultPassErrorMsg.classList.add('hidden');
    } else {
      if (adultPassErrorMsg) adultPassErrorMsg.classList.remove('hidden');
      adultPassInput.classList.add('shake');
      setTimeout(() => adultPassInput.classList.remove('shake'), 400);
    }
  }

  adultPasswordForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    checkAdultPassword();
  });

  function showSpicyMoodMessage(mood) {
    currentSpicyMood = mood;
    const list = spicyMoodMessages[mood] || [];
    if (list.length === 0) return;
    const randomMsg = list[Math.floor(Math.random() * list.length)];
    if (spicyMoodTag) spicyMoodTag.textContent = `${mood.toUpperCase()} SPICY MESSAGE 🔥`;
    if (spicyMoodText) spicyMoodText.textContent = `"${randomMsg}"`;
    if (spicyMoodMessageBox) spicyMoodMessageBox.classList.remove('hidden');
  }

  spicyMoodButtons?.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-spicy')) showSpicyMoodMessage(e.target.dataset.mood);
  });

  anotherSpicyMessageBtn?.addEventListener('click', () => {
    if (currentSpicyMood) showSpicyMoodMessage(currentSpicyMood);
  });

  // Spicy Coupon redeem click listeners
  document.querySelectorAll('.coupon-card').forEach(coupon => {
    coupon.addEventListener('click', () => {
      const title = coupon.querySelector('h5')?.textContent || 'Coupon';
      alert(`🎉 Coupon Redeemed: "${title}"!\nClaim this with your bby whenever you want Call me! 💕`);
    });
    coupon.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const title = coupon.querySelector('h5')?.textContent || 'Coupon';
        alert(`🎉 Coupon Redeemed: "${title}"!\nClaim this with your bby whenever you want Call me! 💕`);
      }
    });
  });

});
