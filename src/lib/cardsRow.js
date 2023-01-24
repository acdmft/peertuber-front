// return cardNum - maximum possible number of Cards in a row
export function getRowCardsNum() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 424) {
    return 1;
  } else if (screenWidth <= 828) {
    return 2;
  } else if (screenWidth <= 1044) {
    return 3;
  } else {
    return 4;
  }
}
export function getCardProps(cardNum) {
  switch (cardNum) {
    case 1:
      // 	width: 18rem; /* 288px */
      return {width:"w-72", height: "h-40"}; 
    case 2:
      // 	width: 12rem; /* 192px */
      return {width: "w-48", height: "h-24"}
    case 3: 
      // width: 14rem; /* 224px */ 
      return {width: "w-56", height: "h-24"}
    case 4:
      // width: 16rem; /* 256px */
      return {width: "w-96", height: "h-48"}
    default:
      return  {width:"w-72", height: "h-40"};
  }
}