function getRandom() {
  const arr = ["1h", "4h", "24h", "5min", "15min", "30min"];
  const random = Math.floor(Math.random() * arr.length);
  return arr[random];
}
function getTimeTableRight(dateTimeString) {
  const dateObj = new Date(dateTimeString);
  const timeString = dateObj.toLocaleTimeString("en-US", { hour12: true });
  return timeString;
}

function getState(data, condition) {
  if (!data) {
    return "";
  }
  let arr = JSON.parse(data);
  let new_arr = arr.filter((i) => i.interval == condition);
  let standard = new_arr[0].state;
  standard = standard.toUpperCase();
  return standard;
}
function getPrice(data) {
  let price = data.toLocaleString("en-US");
  return price;
}

function getColorToChange(data) {
  if (data > 0) {
    return "green--text";
  } else {
    return "red--text";
  }
}
function getColorToScore(data) {
  if (data > 70) {
    return "green--text";
  } else if (data < 30) {
    return "red--text";
  } else {
    return "orange--text";
  }
}
function getTimeStampToolip(data) {
  const date = new Date(data);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  // const timeZoneOffset = date.getTimezoneOffset() / 60; // Chuyển đổi sang giờ

  const formattedDate = `${month}/${day}/${year} ${hour}:${minute} ${
    hour >= 12 ? "pm" : "am"
  } GMT+0`;
  return formattedDate;
}
function getColor(state) {
  switch (state) {
    case "BULLISH":
      return "green--text";
    case "BEARISH":
      return "red--text";
    case "NEUTRAL":
      return "orange--text";
  }
}
function getSrc(src) {
  return (
    "https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/" +
    src.toLowerCase() +
    ".png"
  );
}
export {
  getSrc,
  getRandom,
  getTimeTableRight,
  getColor,
  getState,
  getPrice,
  getColorToChange,
  getColorToScore,
  getTimeStampToolip,
};
