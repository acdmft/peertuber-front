// return cardNum - maximum possible number of Cards in a row
export function getRowCardsNum() {
  const screenWidth = window.innerWidth;
  console.log('screenWidth', screenWidth);
  if (screenWidth <= 640) {
    return 1;
  } else if (screenWidth <= 768) {
    return 2;
  } else if (screenWidth <= 1024) {
    return 3;
  } else {
    return 4;
  }
}
// get difference between downloaded cards and maximum possible in a row
// number of Strip (empty) Cards in a row
export function getStripCardsNum(cardNum, arrLength) {
  return cardNum - arrLength;
}
