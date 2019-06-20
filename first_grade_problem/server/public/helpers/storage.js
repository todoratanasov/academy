//this is a function that executes simple CRUD operations in the local storage
exports.saveData = function(key, value) {
  localStorage.setItem(key, value);
};
exports.getData = key => {
  return localStorage.getItem(key);
};

exports.deleteData = function(key) {
  localStorage.removeItem(key);
};
