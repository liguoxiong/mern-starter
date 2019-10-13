const priceVND = number => {
  const thousandSeparator = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${thousandSeparator} VND`;
};

export default {
  priceVND
};
