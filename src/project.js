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

let addProject = document.querySelector(".addProject");
let cancelButton = document.getElementById("cancelProject")

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