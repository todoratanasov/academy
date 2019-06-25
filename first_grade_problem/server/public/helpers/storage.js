//saveData saves data into the localStorage
exports.saveData = (key, value) => {
  localStorage.setItem(key, value);
};
//getData retreives data from the localStorage
exports.getData = key => {
  return localStorage.getItem(key);
};
//deleteData deletes data from the localStorage
exports.deleteData = key => {
  if (!key) {
    localStorage.clear();
  } else {
    localStorage.removeItem(key);
  }
};
