const requests = require("../helpers/requester");
const home = require("../views/home")
const helpers = require("../helpers/helpers");

//here we make POST request to DB
exports.addTaskPost = function(){
    const taskToAdd = document.getElementById("taskToAdd");
    let data = {
        "id": 0,
        "content": taskToAdd.value
    }
    requests.sendRequest("/tasks", "POST", data)
        .then((result)=>{
            taskToAdd.value = "";
            home.tasks();
        })
        .catch((err)=>{
            console.log(`This is an error from adding post to db: ${err}`);
        })
    
};
//here we add events to edin and delete buttons
exports.editTaskPost = function (event) {
    let id = event.target.id.toString();

    requests.sendRequest(`/tasks/${id}`)
        .then((result) => {
            //we toggle the html forms
            const addForm = document.getElementsByClassName("addForm");
            addForm[0].setAttribute("hidden", "true");
            const editForm = document.getElementsByClassName("editForm")
            editForm[0].removeAttribute("hidden");
            //here we set the input for editing
            const taskToSave = document.getElementsByClassName("taskToSave");
            taskToSave[0].value = result.data.content;
            //here we configure the delete button
            const deleteTaskButton = document.getElementsByClassName("deleteTask");
            deleteTaskButton[0].setAttribute("id", result.data.id);
            deleteTaskButton[0].addEventListener("click", helpers.deleteTask);
            //here we configure the save button
            const saveTask = document.getElementsByClassName("saveTask");
            saveTask[0].setAttribute("id", result.data.id);
            saveTask[0].addEventListener("click", helpers.saveChanges);
        })
        .catch((err) => {
            console.log(`This is an error from retreiving a record from db: ${err}`)
        })
    };