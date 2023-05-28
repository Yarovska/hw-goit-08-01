import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const CURRENT_TIME_KEY = 'videoplayer-current-time';

const onPlay = function (data) {
  const currentTime = data.seconds;
  localStorage.setItem(CURRENT_TIME_KEY, currentTime);
};

player.on('timeupdate', throttle(onPlay, 1000));

player.ready().then(function () {
  const storedTime = localStorage.getItem(CURRENT_TIME_KEY);
  if (storedTime) {
    player.setCurrentTime(storedTime).catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // The time was less than 0 or greater than the video's duration
          break;
        default:
          // Some other error occurred
          break;
      }
    });
  }
});
