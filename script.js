
function updateDateTime() {
    const dateTimeElement = document.getElementById('datetime');
    const now = new Date();
    
    const day = now.getDate();
    const month = now.toLocaleString('default', { month: 'short' }); 
    const formattedDate = `${day} ${month}`;

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

    dateTimeElement.textContent = `${formattedDate} ${formattedTime}`;
  }

function updateBackground(url) {
    document.body.style.background = `url('${url}') no-repeat center center fixed`;
    document.body.style.backgroundSize = 'cover';
}

setInterval(updateDateTime, 1000);


updateDateTime();

const playButton = document.getElementById("playButton");
const volumeButton = document.getElementById("volumeButton");
const volumeSlider = document.getElementById("volumeSlider");


let isPlaying = false;


const audio = new Audio(`/music/song1.mp3`);
audio.loop = true; 

playButton.addEventListener("click", () => {
    isPlaying = !isPlaying;
    const playIcon = playButton.querySelector("svg path");
    playIcon.setAttribute("d", isPlaying ? "M6 5h4v14H6zm8 0h4v14h-4z" : "M8 5v14l11-7z");

    if (isPlaying) {
        audio.play();
    } else {
        audio.pause();
    }
});

volumeSlider.value = audio.volume * 100;


volumeButton.addEventListener("click", () => {
    volumeSlider.style.display = volumeSlider.style.display === "none" ? "block" : "none";
});



volumeSlider.addEventListener("input", (event) => {
    const volume = event.target.value / 100; 
    audio.volume = volume; 
    console.log("Volume:", volume);
});


