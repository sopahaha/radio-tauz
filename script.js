const batidas = [
  "./songs/monster.mp3",
  "./songs/resident evil 6.mp3",
  "./songs/warface.mp3",
];

const imgs = [
  "./images/monster.jpg",
  "./images/resident evil 6.jpg",
  "./images/warface.jpg",
];

let songs = [];

let batidaIndex = 0;

batidas.forEach((batida) => {
  let sound = new Howl({
    src: [batida],
    volume: 0.05,
  });
  songs.push(sound);
});

const playBtn = document.querySelector("#play-btn");

playBtn.addEventListener("click", () => {
  if (playBtn.className == "fa-solid fa-pause") {
    playBtn.className = "fa-solid fa-play";
    songs[batidaIndex].pause();
  } else if (playBtn.className == "fa-solid fa-play") {
    playBtn.className = "fa-solid fa-pause";
    songs[batidaIndex].play();
  }
});

console.log(songs[batidaIndex]);

const progressBar = document.querySelector("#progress-bar");

function UpdateProgess() {
  const progressEl = document.querySelector("#progress");
  const progress =
    (songs[batidaIndex].seek() / songs[batidaIndex].duration()) * 100;

  progressEl.style.width = progress + "%";

  requestAnimationFrame(UpdateProgess);
}

progressBar.addEventListener("click", (e) => {
  let coordPerCent = (e.offsetX / progressBar.offsetWidth) * 100;

  songs[batidaIndex].seek((coordPerCent * songs[batidaIndex].duration()) / 100);
});

UpdateProgess();

const nextBtn = document.querySelector("#next-btn");

const backBtn = document.querySelector("#back-btn");

nextBtn.addEventListener("click", () => {
    songs[batidaIndex].stop();
    batidaIndex += 1;
    songs[batidaIndex].play();
    UpdateImage();
});

backBtn.addEventListener("click", () => {
    songs[batidaIndex].stop();
    batidaIndex -= 1;
    songs[batidaIndex].play();
    UpdateImage();
});

const img = document.querySelector("#image");

function UpdateImage() {
  img.src = imgs[batidaIndex];
}
