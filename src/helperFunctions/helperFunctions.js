//extract the time from dt system and change 24 hrs to 12
function convertDt(dt) {
  const date = new Date(dt * 1000);
  const hour = date.getHours();
  let time = '';
  if (hour > 12) {
    time = hour - 12 + 'PM';
  } else {
    time = hour + 'AM';
  }
  return time;
}

module.exports = {
  convertDt,
};
