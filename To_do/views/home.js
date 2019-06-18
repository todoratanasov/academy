const requests = require("../helpers/requester");
const taskList = document.getElementsByClassName("taskList");
const taskController = require("../controllers/task-controller")

//here we take all tasks from db and everytme this function is called on the homescreen the tasks are up to date
const tasks = function(){
    taskList[0].innerHTML="";
    let addForm = document.getElementsByClassName("editForm");
    addForm[0].setAttribute("hidden", "true");
    let editForm = document.getElementsByClassName("addForm")
    editForm[0].removeAttribute("hidden");
    return requests.sendRequest("/tasks", "GET")
    .then((result)=>{
        result.data.forEach(element => {
            let li = document.createElement("li");
            let editButton = document.createElement("button");
            editButton.innerText = "Edit"
            editButton.setAttribute("id", `${element.id}`);
            editButton.value = "Edit";
            editButton.addEventListener("click", taskController.editTaskPost);

            li.innerText = element.content;
            li.appendChild(editButton);
            taskList[0].appendChild(li);
        });
    })
    .catch((err)=>{
        console.log(`This is an error from retreiving tasks from db: ${err}`)
    });
};

module.exports = {
    tasks,

}

