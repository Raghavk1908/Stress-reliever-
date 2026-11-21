// 1. Subtle Midnight Starfield
const starfield = document.getElementById("starfield");
for (let i = 0; i < 34; i++) {
  const star = document.createElement("span");
  star.className = "star-dot";
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDuration = `${3.5 + Math.random() * 4.5}s`;
  star.style.animationDelay = `${Math.random() * 4}s`;
  starfield.appendChild(star);
}

// 2. Auto-Play Per-Page Audio Controller (song1.mp3 to song5.mp3)
const tracks = {
  1: document.getElementById("audio-1"),
  2: document.getElementById("audio-2"),
  3: document.getElementById("audio-3"),
  4: document.getElementById("audio-4"),
  5: document.getElementById("audio-5")
};

const musicBtn = document.getElementById("musicBtn");
const bars = document.getElementById("bars");
const musicStatus = document.getElementById("musicStatus");

let activePage = 1;
let pausedByUser = false;

function stopOtherTracks(keepPage) {
  Object.entries(tracks).forEach(([num, audio]) => {
    if (!audio) return;
    if (Number(num) !== Number(keepPage)) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
}

function playTrack(pageNum) {
  stopOtherTracks(pageNum);
  const track = tracks[pageNum];
  if (!track) return;

  track.volume = 0.45;
  track.play().then(() => {
    bars.classList.add("active");
    musicStatus.textContent = `song${pageNum} • Playing`;
  }).catch(() => {
    bars.classList.remove("active");
    musicStatus.textContent = `song${pageNum} • Ready`;
  });
}

// Auto-play on load + instant unlock on first interaction if browser blocks unmuted autoplay
window.addEventListener("DOMContentLoaded", () => {
  playTrack(1);
});

function handleFirstInteraction() {
  if (!pausedByUser) {
    const currentTrack = tracks[activePage];
    if (currentTrack && currentTrack.paused) {
      playTrack(activePage);
    }
  }
}

["pointerdown", "touchstart", "click", "keydown"].forEach((ev) => {
  document.addEventListener(ev, handleFirstInteraction, { once: true });
});

musicBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const currentTrack = tracks[activePage];
  if (!currentTrack) return;

  if (currentTrack.paused) {
    pausedByUser = false;
    playTrack(activePage);
  } else {
    currentTrack.pause();
    pausedByUser = true;
    bars.classList.remove("active");
    musicStatus.textContent = `song${activePage} • Paused`;
  }
});

// 3. Page Switcher (Pages 01 to 05)
const views = document.querySelectorAll(".view");
const tabPills = document.querySelectorAll(".tab-pill");

function openPage(targetNum) {
  const num = Number(targetNum);
  activePage = num;

  views.forEach((v) => v.classList.remove("active"));
  tabPills.forEach((t) => t.classList.remove("active"));

  const nextView = document.getElementById(`page-${num}`);
  const nextTab = document.querySelector(`.tab-pill[data-go="${num}"]`);

  if (nextView) nextView.classList.add("active");
  if (nextTab) nextTab.classList.add("active");

  document.body.className = `palette-${num}`;
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (!pausedByUser) {
    playTrack(num);
  } else {
    stopOtherTracks(num);
    bars.classList.remove("active");
    musicStatus.textContent = `song${num} • Paused`;
  }
}

tabPills.forEach((pill) => {
  pill.addEventListener("click", () => openPage(pill.getAttribute("data-go")));
});

document.querySelectorAll(".pager-btn").forEach((btn) => {
  btn.addEventListener("click", () => openPage(btn.getAttribute("data-go")));
});

// 4. Breathing Guide Cycle
const breathText = document.getElementById("breathText");
let isInhale = true;
setInterval(() => {
  isInhale = !isInhale;
  breathText.textContent = isInhale ? "Inhale..." : "Exhale...";
}, 4000);

// 5. Interactive Mood Chips on Page 01
const moodReplies = {
  overthinking:
    "Apki yeh aadat hai ki paanch minute mein das alag worst-case scenarios imagine kar leti hain 🤯💭, aur unmein se aadhe toh real bhi nahi hote. Meri taraf dekho—aur apne parents ke baare mein socho jo apke sirf 2 minute ke stress se worried ho jaate hain—figuratively, at least 👀🤍—aur yeh baat saaf sun lo: ap bilkul safe, respected, aur cared for hain 🛡️🌷. Mere paas ap bilkul loved aur understood hain 💖✨, aur main hamesha apko sunne aur apko hasane ke liye yahan hun, Miss Ragvi 🥰😊. Kal jo bhi ho, hum calm heads aur zero drama ke saath handle karenge 🌿🕊️. Imaginary worries ko apni aaj ki raat mat bigaadne do—ap bohut precious hain un cheezon ke liye neend khone ke liye jo abhi hui bhi nahi hain 🌙💎. Ap mere aur apki family ke liye ek rare gem hain ✨👑, toh bilkul tension mat lo jab tak apka Raghuu apke saath hai 🤗🤍.",
  heavy:
    "Kuch din baaki dinon se zyada loud lagte hain 🌧️💭, khaas kar jab ap aas-paas sabko khush rakhne ki poori koshish kar rahi hoti hain aur apni thakaan chhupa leti hain 🥺🤍. Apko mere saath strong ya composed banne ka natak karne ki zaroorat nahi hai 🫶✨. Agar apki battery 5% pe ho 🪫😴, toh chup rehne ka bhi pressure mat lo—bas apni aankhein band karo, aur mujhe apko aur apke saare heavy thoughts ko gently sambhalne do 🤗🌙. Koi explanation nahi chahiye, koi fast reply ki umeed nahi—apka peace hamesha sabse pehle hai 🕊️💛.",
  doubt:
    "Ek baat bilkul seedhi kar lete hain—maine yeh saari mehnat, late-night care, ya quiet patience isliye nahi lagayi ki cheezein real hote hi main gayab ho jaaun 💪❤️. Jab main kisi ke corner mein hota hun, toh main sach mein wahan hota hun—smooth dinon mein bhi, messy dinon mein bhi, aur un dinon mein bhi jab ap overthink karke khud ko corner mein le jaati hain 🔥🛡️. Apko kabhi yeh sochne ki zaroorat nahi hai ki ap mere saath kahan stand karti hain 🤍✨. Khamoshi mein bhi meri loyalty aur fondness apke liye ek second ke liye bhi nahi dagmagati—ap meri hain aur main apka hun 💕🔗. Main pehle bhi kisi se nahi dara, toh baaki kya kehte hain isse farak nahi padta; agar ap mere saath hain toh humein koi tod nahi sakta 🫶💫.",
  comfort:
    "Sach kahun toh agar mere bas mein hota, toh main abhi apka aadha stress chura leta aur apke paas bas muskurane aur mere saath aam taur par baat karne ke alawa kuch na chodta 😉✨. Apko andaza bhi nahi hai ki ap kitni effortlessly mere din behtar bana deti hain—aur main sach mein apko relaxed, glowing, aur carefree dekhna chahta hun 🌸🥰. Toh aankhein band karo, ek slow breath lo, aur baaki Shree Ji par chod do 🙏✨. Aur kal? Mujhe woh signature smile wapas chahiye—no excuses 😌💖. Bas mera haath pakdo aur apni saari disturbing thoughts mujhe de do, aur main woh thoughts unhi logon par phenk dunga jo apko disturb karte hain 😤💨🥰🤗😍🙈."
};

const moodPills = document.querySelectorAll(".mood-pill");
const moodBox = document.getElementById("moodBox");
const moodText = document.getElementById("moodText");

moodPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    moodPills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    const key = pill.getAttribute("data-mood");
    moodBox.style.opacity = "0";
    setTimeout(() => {
      moodText.textContent = moodReplies[key];
      moodBox.style.opacity = "1";
    }, 180);
  });
});

// 6. Interactive Feedback Actions
document.getElementById("breatheDoneBtn").addEventListener("click", (e) => {
  e.target.closest(".panel").classList.add("panel-highlight");
  document.getElementById("breatheReveal").textContent =
    "Wahi hui na meri Pranjal, Sona, Pari, Ragvi, Ragni 🥰💖✨. Ab phone side mein rakho, ache se rest karo, aur baaki sab Kanha, Shree Ji, aur main sambhal lenge 🌙🙏🤍. Shree Radhe 🤍✨";
});

document.getElementById("nazarBtn").addEventListener("click", (e) => {
  e.target.closest(".panel").classList.add("panel-highlight");
  document.getElementById("nazarNote").textContent =
    "🧿 Thu-thu-thu! Shree Ji apki smile, apke peace, aur humare bond ko har nazar se hamesha bachayein 🤍✨";
});

document.getElementById("sukoonBtn").addEventListener("click", (e) => {
  e.target.closest(".panel").classList.add("panel-highlight");
  document.getElementById("sukoonNote").textContent =
    "Ek apki hansi, aur mera pura din set 😊🌸—aise hi muskurati rahiyega, meri strongest ladki 👑💖";
});

document.getElementById("promiseBtn").addEventListener("click", (e) => {
  e.target.closest(".panel").classList.add("panel-highlight");
  document.getElementById("promiseNote").textContent =
    "Locked forever 🔒🤍: Kuch bhi ho jaaye, ap hamesha suni jaayengi, protected rahengi, aur hamesha sahi rahengi. Shree Radhe ✨";
});

document.getElementById("finalSealBtn").addEventListener("click", (e) => {
  e.target.closest(".panel").classList.add("panel-highlight");
  document.getElementById("finalSealNote").textContent =
    "Yes, main apki baat samajh sakta hun 🤍✨—no stress, no FOMO, aur kisi bhi cheez ki worry karne ki zaroorat nahi jab tak main yahan hun. Shree Radhe 🙏💖";
});
