function ToDoItem(title, details, duedate, priority) {
    this.title = title;
    this.details = details;
    this.duedate = duedate;
    this.priority = priority;
}

export default ToDoItem;

let addTask = document.querySelector(".addTask");
let submitTask = document.getElementById("submitTask");
let cancelButton = document.getElementById("cancel");

addTask.addEventListener('click', openTaskForm);
cancelButton.addEventListener('click', closeTaskForm);

function openTaskForm() {
  document.getElementById("myForm").style.display = "flex";
  overlay.style.display = "block";
}

function closeTaskForm() { //closes form and clears previous content
  document.getElementById("myForm").style.display = "none";
  overlay.style.display = "none";
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
}

  //gets information for task items and pushes once submitted
  document.querySelector(".form-container").addEventListener("submit", function(event) { 
    event.preventDefault();
    let title = document.getElementById("title").value;
    let details = document.getElementById("details").value;
    let date = document.getElementById("date").value;
    let priority = document.getElementById("priority").value;
    closeForm();
    addTask(title, details, date, priority);
});