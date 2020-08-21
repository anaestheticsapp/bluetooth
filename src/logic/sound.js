const sounds = {
  alarm: new Audio('./mp3/alarm.mp3'),
  beep: new Audio('./mp3/beep.mp3'),
}

function audio(sound, play = true) {
  const player = sounds[sound];
  if (!player) return console.error('sound not found!');
  if (play) {
    player.loop = sound == 'alarm' ? true : false;
    player.play();
  } else {
    player.currentTime = 0;
    player.pause();
  }
}
export default audio;