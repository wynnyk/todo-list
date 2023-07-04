import './style.css';
import { format } from 'date-fns';
import { ordinal } from 'date-fns/esm';
import { addDays, isWithinInterval, isToday, startOfToday, endOfToday } from 'date-fns';
const myProjects = [];


//ToDoList Constructor
function ToDoItem(task, details, duedate, priority) {
    this.task = task;
    this.details = details;
    this.duedate = duedate;
    this.priority = priority;
}

//export default ToDoItem;


//Project Constructor
function Project(title) {
  this.title = title;
  this.todoItems = [];

  this.addTodoItem = function (task, details, duedate, priority) {
    var todoItem = new ToDoItem(task, details, duedate, priority);
    this.todoItems.push(todoItem);
  };
}

function createProject(title) {
  var newProject = new Project(title);
  myProjects.push(newProject);
}

createProject("Inbox");
createProject("One");
createProject("Two");
createProject("Three");
createProject("Four");
myProjects[0].addTodoItem('Inbox Test', 'Inbox Details', "2023-07-05", 'High')
console.log(myProjects);

let selectedProject = myProjects[0];

//Project related stuff

let mainTitle = document.getElementById("mainTitle");
let addProject = document.querySelector(".addProject");
let cancelButton = document.getElementById("cancelProject");

addProject.addEventListener('click', openProjectForm);
cancelButton.addEventListener('click', closeProjectForm);

function openProjectForm() {
  document.getElementById("projectForm").style.display = "flex";
  overlay.style.display = "block";
}

function closeProjectForm() { //closes form and clears previous content
  document.getElementById("projectForm").style.display = "none";
  overlay.style.display = "none";
  document.getElementById("projectInput").value = "";
}

document.querySelector(".project-form-container").addEventListener("submit", function(event) { 
  event.preventDefault();
  let projectInput = document.getElementById("projectInput").value;
  closeProjectForm();
  createProject(projectInput);
  console.log(myProjects);
  updateProjectList()
});

let projectsList = document.getElementById('projects');

function updateProjectList() {
  let projectItems = projectsList.querySelectorAll('li');
  projectItems.forEach((li) => {
    li.remove();
  });
  myProjects.forEach(function(obj, index){
    console.log(obj);
    if (index === 0) {
      return;
    }
    console.log(myProjects.indexOf(obj))
    let newItem = document.createElement('li')
    projectsList.appendChild(newItem);
    newItem.classList.add('project');
    let title = obj.title;
    let projectName = document.createElement('p');
    projectName.textContent = title;
    newItem.appendChild(projectName);
    projectName.classList.add('projectName');
    let delButton = document.createElement('button')
    delButton.classList.add('deleteProject');
    delButton.textContent = "X";
    delButton.addEventListener('click', function() {
        let index = myProjects.indexOf(obj);
        myProjects.splice(index, 1);
        delButton.parentNode.remove()
    });
    newItem.appendChild(delButton);
  })
}

//Task related stuff

let selectedTaskIndex;

let addTask = document.querySelector(".addTask");
let cancelTaskButton = document.getElementById("cancel");

addTask.addEventListener('click', openTaskForm);
cancelTaskButton.addEventListener('click', closeTaskForm);

function openTaskForm() {
  document.getElementById("myForm").style.display = "flex";
  overlay.style.display = "block";
}

function closeTaskForm() { //closes form and clears previous content
  document.getElementById("myForm").style.display = "none";
  overlay.style.display = "none";
  document.getElementById("taskName").value = "";
  document.getElementById("details").value = "";
  document.getElementById("due-date").value = "";
}

//Edit open/close/submiy

function closeEditForm() {
  document.getElementById("editForm").style.display = "none";
  overlay.style.display = "none";
}

let cancelEdit = document.getElementById("cancelEdit");
cancelEdit.addEventListener('click', closeEditForm);

let submitEdit = document.getElementById("submitEdit");
submitEdit.addEventListener('click', (event) => {
  event.preventDefault();
  const editedTaskName = document.getElementById("editTaskName").value;
  const editedDetails = document.getElementById("editDetails").value;
  const editedDueDate = document.getElementById('edit-due-date').value;
  selectedProject.todoItems[selectedTaskIndex].task = editedTaskName;
  selectedProject.todoItems[selectedTaskIndex].details = editedDetails;
  selectedProject.todoItems[selectedTaskIndex].duedate = editedDueDate;
  updateTaskList(selectedProject);
  closeEditForm();
});

  //gets information for task items and pushes once submitted
  document.querySelector(".task-form-container").addEventListener("submit", function(event) { 
    event.preventDefault();
    let taskName = document.getElementById("taskName").value;
    let details = document.getElementById("details").value;
    let duedate = document.getElementById("due-date").value;
    let priority = document.getElementById("priority").value;
    closeTaskForm();
    selectedProject.addTodoItem(taskName, details, duedate, priority);
    updateTaskList(selectedProject)
});

let taskList = document.getElementById('items');

function clearMain() {
  let taskItems = taskList.querySelectorAll('div');
    taskItems.forEach((div) => {
      div.remove();
    });
}

function updateTaskList(currentProject) {
    clearMain();
    currentProject.todoItems.forEach(function(obj){
    console.log(obj);
    console.log(currentProject.todoItems.indexOf(obj))
    let newTask = document.createElement('div')
    taskList.appendChild(newTask);
    newTask.classList.add('item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    newTask.appendChild(checkbox);

    const taskMainDiv = document.createElement('div');
    taskMainDiv.classList.add('taskmain');
    newTask.appendChild(taskMainDiv);

    let taskName = document.createElement('h4');
    taskName.textContent = obj.task;
    taskMainDiv.classList.add('taskName');
    taskMainDiv.appendChild(taskName);
    
    let details = document.createElement('p');
    details.textContent = obj.details;
    taskMainDiv.appendChild(details);
    
    let duedate = document.createElement('p');
    duedate.textContent = obj.duedate;
    duedate.classList.add('duedate');
    newTask.appendChild(duedate);
   
    //Edit features  
    let editButton = document.createElement('button')
    editButton.classList.add('edit');
    editButton.textContent = "Edit";
    newTask.appendChild(editButton);
    
    editButton.addEventListener('click', () => {
      selectedTaskIndex = currentProject.todoItems.indexOf(obj);
      document.getElementById("editTaskName").value = obj.task;
      document.getElementById("editDetails").value = obj.details;
      document.getElementById('edit-due-date').value = obj.duedate;
      document.getElementById("editForm").style.display = "flex";
      overlay.style.display = "block";
    })
    
    //Delete button
    let deleteTask = document.createElement('button')
    deleteTask.classList.add('delete');
    deleteTask.textContent = "Delete";
    deleteTask.addEventListener('click', function() {
        let index = currentProject.todoItems.indexOf(obj);
        currentProject.todoItems.splice(index, 1);
        deleteTask.parentNode.remove()
    });
    newTask.appendChild(deleteTask);
  });
}

//End of task related stuff
updateProjectList();

//Selects default/inbox project
const inbox = document.querySelector('.inbox');
function selectInbox() {
  removeActiveClass();
  inbox.classList.add("active");
  selectedProject = myProjects[0];
  updateTaskList(selectedProject);
  mainTitle.textContent = "Inbox"
}
inbox.addEventListener('click', selectInbox);

//Selects what project you are on
projectsList.addEventListener('click', function(event) {
  removeActiveClass();
  const clickedElement = event.target;
  if (clickedElement.classList.contains('project')) {
    const index = Array.from(projectsList.children).indexOf(clickedElement);
    selectedProject = myProjects[index + 1];
    console.log("Clicked index:", index);
    clickedElement.classList.add("active");
    mainTitle.textContent = clickedElement.firstChild.textContent;
    updateTaskList(selectedProject);
  }
});

function removeActiveClass() {
  let projects = projectsList.getElementsByClassName('project');
  for (let i = 0; i < projects.length; i++) {
    projects[i].classList.remove('active');
  }
  inbox.classList.remove('active');
  week.classList.remove('active');
  today.classList.remove('active');
}

const week = document.querySelector('.week');
week.addEventListener('click', () => {
  removeActiveClass();
  week.classList.add("active");
})

const today = document.querySelector('.today');
today.addEventListener('click', () => {
  removeActiveClass();
  today.classList.add("active");
})

//Defaults to inbox on start
selectInbox();