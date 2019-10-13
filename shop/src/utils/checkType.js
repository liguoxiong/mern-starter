const getArrayKeyInObject = obj => {
  const listKey = Object.keys(obj);
  for (let key of listKey) {
    if (typeof obj[key] === "array") return key;
  }
};

export default {
  getArrayKeyInObject
};
