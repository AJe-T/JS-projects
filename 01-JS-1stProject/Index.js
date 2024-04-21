window.addEventListener('keydown', (e) => {
    const song = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!song) return;
    //================================================================
    const name = song.getAttribute('src');
    const match = name.match(/\/([^\/]+)\.mp3$/);
    if (match && match[1]) {
        const songName = match[1];
        const songNameDisplay = document.querySelector(".songName")
        songNameDisplay.innerHTML = songName
        console.log(songName);
    }
    //================================================================
    const allSongs = document.querySelectorAll('audio');
    allSongs.forEach((audio) => {
        if (audio !== song) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
    //================================================================
    song.currentTime = 0;
    song.play();
    key.classList.add('playing');
})
const removeSong = (e) => {
    if (e.propertyName !== 'transform') return;
    const key = e.target;

    key.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach((key) => {
    key.addEventListener('transitionend', removeSong)
})

