const taskController =require("./controllers/task-controller");
const home = require("./views/home");
import "./public/css/typography.css"
import "./public/css/styles.css"
//here we initiate the home screen
home.tasks();

//here we add an event to the Add button
const addTaskButton = document.getElementById("addTask");
addTaskButton.addEventListener("click",taskController.addTaskPost);