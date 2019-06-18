//this is a function that executes simple CRUD operations in the local storage
const storage = function(){

    const saveData = function (key, value) { 
        localStorage.setItem(key, value)
    };

    const getData = function (key) {
        return localStorage.getItem(key)
    };

    const deleteData = function (key) {
       localStorage.removeItem(key) 
    }
    return{
        saveData,
        getData,
        deleteData,
    }
}()