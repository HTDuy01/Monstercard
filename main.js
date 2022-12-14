const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tracklist = $(".tracklist");
const playBtn = $(".btn-listen");
const audio = $("audio");
const page = $(".page");
const songIcon = $(".song_icon");
const song = $(".song");

const app = {
  isPlaying: false,
  currentIndex: 0,
  songs: [
    {
      name: "The Small Things",
      singer: "Conro",
      path: "./assets/music/The Small Things - Conro.mp3",
      time: "3:35",
      id: 0,
    },
    {
      name: "Dreaming",
      singer: "Conro",
      path: "./assets/music/Dreaming - DEAMN.mp3",
      time: "2:57",
      id: 1,
    },
    {
      name: "Fighters",
      singer: "Conro",
      path: "./assets/music/Fighters - Sandaime J Soul Brothers.mp3",
      time: "3:46",
      id: 2,
    },
    {
      name: "Here To Stay",
      singer: "Conro",
      path: "./assets/music/Here To Stay - Lenka.mp3",
      time: "2:44",
      id: 3,
    },
    {
      name: "Out For The Night",
      singer: "Conro",
      path: "./assets/music/Out For The Night - 21 Savage.mp3",
      time: "3:05",
      id: 4,
    },
    {
      name: "Overdue",
      singer: "Conro",
      path: "./assets/music/Overdue - Muse.mp3",
      time: "2:48",
      id: 5,
    },
    {
      name: "Tattoo",
      singer: "Conro",
      path: "./assets/music/Tattoo - Jordin Sparks.mp3",
      time: "3:29",
      id: 6,
    },
    {
      name: "Therapy",
      singer: "Conro",
      path: "./assets/music/Therapy - Conro.mp3",
      time: "3:06",
      id: 7,
    },
    {
      name: "Waiting",
      singer: "Conro",
      path: "./assets/music/Waiting - Dash Berlin_ Emma Hewitt.mp3",
      time: "3:07",
      id: 8,
    },
    {
      name: "Way Up",
      singer: "Conro",
      path: "./assets/music/Way Up - Jaden Smith.mp3",
      time: "3:32",
      id: 9,
    },
    {
      name: "Without Your Love",
      singer: "Conro",
      path: "./assets/music/Here To Stay - Lenka.mp3",
      time: "3:09",
      id: 10,
    },
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
            <div class="song ${
              index === this.currentIndex &&
              page.classList.contains(".playing") === "true"
                ? "active"
                : ""
            }" data-index=${index}>
              <div class="song_index">${index + 1}</div>
              
              <div class="song_icon">
                <i class="fa-solid fa-play icon-play"></i>
                <i class="fa-solid fa-pause icon-pause"></i>
              </div>

              <div class="song_body">
                <div class="song_body-info">
                  <h3 class="title">${song.name}</h3>
                  <p class="author">${song.singer}</p>
                </div>
                <div class="time">${song.time}</div>
              </div>

              <div class="song_option">
                <i class="fa-solid fa-share-nodes"></i>
              </div>
            </div>
      `;
    });
    tracklist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handelEvent: function () {
    const _this = this;

    // Khi click v??o play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
        console.log(_this.currentSong.id === index);
      }
    };

    // Khi song ???????c play
    audio.onplay = function () {
      _this.isPlaying = true;
      page.classList.add("playing");
    };

    // Khi song b??? v??ng
    audio.onpause = function () {
      _this.isPlaying = false;
      page.classList.remove("playing");
    };

    // X??? l?? h??nh vi click v??o n??t play c???a tracklist

    $$(".song_icon").forEach((song_icon, index) => {
      const parentSongIcon = song_icon.parentElement;
      song_icon.onclick = function () {
        if (_this.isPlaying) {
          audio.pause();
          while (parentSongIcon.classList.contains("active")) {
            $(".song.active").classList.remove("active");
          }
        } else {
          parentSongIcon.classList.add("active");
          _this.currentIndex = Number(parentSongIcon.dataset.index);
          _this.loadCurrentSong();
          audio.play();
        }
      };
    });
  },
  loadCurrentSong: function () {
    audio.src = this.currentSong.path;
  },
  start: function () {
    // ?????nh ngh??a c??c thu???c t??nh cho object
    this.defineProperties();

    // T???i b??i h??t hi???n t???i
    this.loadCurrentSong();

    // Render tracklist
    this.render();

    // L???ng nghe v?? x??? l?? c??c s??? ki???n trong DOM
    this.handelEvent();
  },
};

app.start();
