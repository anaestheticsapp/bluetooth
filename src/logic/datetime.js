function formatDate(dateObj, dateFormat) {
  let day = dateObj.getDate();
  let month = dateObj.getMonth() + 1;
  let year = dateObj.getFullYear();
  let hrs = dateObj.getHours();
  let min = dateObj.getMinutes();
  let sec = dateObj.getSeconds();

  day = day < 10 ? '0' + day : day;
  month = month < 10 ? '0' + month : month;
  hrs = hrs < 10 ? '0' + hrs : hrs;
  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;

  switch (dateFormat) {
    case 'HH:mm':
      return hrs + ':' + min;
    default:
      console.error('no dateFormat');
  }
}

class DateTime {
  constructor(date) {
    if (date instanceof Date) {
      this.date = date;
    }
  }
  format(format) {
    return formatDate(this.date, format);
  }
}
const timely = (date = new Date(), format = null) => new DateTime(date, format);

export default timely;
