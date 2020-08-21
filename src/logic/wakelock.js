const FIVE_MINUTES = 5 * 60 * 1000;

async function wakeLock(release = false) {
  if (!'wakeLock' in navigator) return;

  let wakelock = await navigator.wakeLock.request('screen');
  console.log('screen will stay awake for 5 minutes');

  wakelock.addEventListener('release', () => console.log('screen wake lock was released'));

  window.setTimeout(() => {
    wakelock.release();
    wakelock = null;
  }, FIVE_MINUTES);
}
export default wakeLock;