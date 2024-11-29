
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

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Website with Click Sounds</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding-top: 50px;
        }
        .clickable {
            background-color: #f0f0f0;
            border: 2px solid #333;
            padding: 10px 20px;
            margin: 10px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .clickable:hover {
            background-color: #e0e0e0;
        }
    </style>
</head>
<body>
    <h1>Click Sound Demo</h1>
    
    <!-- Audio element to play click sound -->
    <audio id="clickSound">
        <source src="assets/music/song.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>

    <!-- Clickable elements -->
    <div class="clickable" onclick="playClickSound()">Button 1</div>
    <div class="clickable" onclick="playClickSound()">Button 2</div>
    <div class="clickable" onclick="playClickSound()">Button 3</div>

    <script>
        function playClickSound() {
            const clickSound = document.getElementById('clickSound');
            
            // Reset the audio to start from the beginning each time
            clickSound.currentTime = 0;
            
            // Play the sound
            clickSound.play();
        }

        // Optional: Add click sound to all clickable elements
        document.addEventListener('DOMContentLoaded', () => {
            const clickables = document.querySelectorAll('.clickable');
            clickables.forEach(element => {
                element.addEventListener('click', playClickSound);
            });
        });
    </script>
</body>
</html>
