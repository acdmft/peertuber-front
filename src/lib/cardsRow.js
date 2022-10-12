// return cardNum - maximum possible number of Cards in a row
export function getRowCardsNum() {
  const screenWidth = window.innerWidth;
  console.log('screenWidth', screenWidth);
  if (screenWidth <= 424) {
    return 1;
  } else if (screenWidth <= 764) {
    return 2;
  } else if (screenWidth <= 1024) {
    return 3;
  } else {
    return 4;
  }
}
