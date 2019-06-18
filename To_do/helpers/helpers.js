const home = require("../views/home");
const requests = require("../helpers/requester");

//here we make PUT request to the db
exports.saveChanges = function (event) {
    const id = event.target.id;
    const taskToSave = document.getElementsByClassName("taskToSave");
    const data = {
        content: taskToSave[0].value
    };
    requests.sendRequest(`/tasks/${id}`, "PUT", data)
        .then((result) => {
            home.tasks();
        })
        .catch((err)=>{
            console.log(`This is an error from modifying a recor in db: ${err}`)
        })

};

//here we make DELETE request to db
exports.deleteTask = function (event) {
    const id = event.target.id;
    requests.sendRequest(`/tasks/${id}`, "DELETE")
        .then((result)=>{
            home.tasks();
        })
        .catch((err)=>{
            console.log(`This is an error from deleting a record in db: ${err}`)
        })
}