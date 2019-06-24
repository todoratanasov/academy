//this is a function that executes simple CRUD operations in the local storage
exports.saveData = (key, value) => {
  localStorage.setItem(key, value);
};
exports.getData = key => {
  return localStorage.getItem(key);
};

exports.deleteData = key => {
  if (!key) {
    localStorage.clear();
  } else {
    localStorage.removeItem(key);
  }
};
