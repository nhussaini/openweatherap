//extract the time from dt system and change 24 hrs to 12
function convertDt(dt) {
  const date = new Date(dt * 1000);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  // const month = date.getMonth();
  // console.log('month: ', monthNames[date.getMonth()]);
  const month = monthNames[date.getMonth()];
  // console.log('month', month);
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
  let newDate = '';

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = a.getDate();
  console.log('day: ', day);
  // const month = date.getMonth();
  // console.log('month: ', monthNames[date.getMonth()]);
  const month = monthNames[a.getMonth()].slice(0, 3);
  let weekday = a.toLocaleString('default', { weekday: 'short' });
  newDate = weekday + month;
  // return weekday;
  // return newDate;
  return weekday + '  ' + month + ' ' + day;
}

module.exports = {
  convertDt,
  getDay,
};
