
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


const audio = new Audio(`/music/song.mp3`);
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


function playClickSound() {
    const clickSound = document.getElementById('clickSound');
    clickSound.currentTime = 0;
    clickSound.play();
}

document.querySelectorAll('.clickable').forEach(element => {
    element.addEventListener('click', playClickSound);
});

function playClickSound() {
    const clickSound = document.getElementById('clickSound');
    const errorMessage = document.getElementById('errorMessage');

    // Check if audio element exists
    if (!clickSound) {
        errorMessage.textContent = "Audio element not found!";
        return;
    }

    // Check if sound file is loaded
    if (clickSound.readyState === 0) {
        errorMessage.textContent = "Sound file not loaded. Check file path!";
        return;
    }

    try {
        // Attempt to play sound
        clickSound.currentTime = 0;
        const playPromise = clickSound.play();

        // Handle potential promise rejection
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Successful play
                errorMessage.textContent = "";
            })
            .catch(error => {
                // Autoplay was prevented or other error
                errorMessage.textContent = "Audio play failed: " + error.message;
                console.error("Sound play error:", error);
            });
        }
    } catch (error) {
        errorMessage.textContent = "Unexpected error: " + error.message;
        console.error("Unexpected sound play error:", error);
    }
}

// Add click event listeners with error handling
document.querySelectorAll('.clickable').forEach(element => {
    element.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent any default actions
        playClickSound();
    });
});

// Optional: Log when the script runs
console.log("Click sound script loaded successfully");