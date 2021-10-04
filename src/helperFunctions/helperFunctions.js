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

//This function will get the name of the day from unixtimestamp
function getDay(timestamp) {
  let a = new Date(timestamp * 1000);
  let weekday = a.toLocaleString('default', { weekday: 'long' });
  return weekday;
}

module.exports = {
  convertDt,
  getDay,
};
