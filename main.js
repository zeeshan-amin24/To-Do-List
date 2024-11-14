


let input = document.querySelector("#input");
let taskcontainer = document.querySelector(".task-container");
let date = document.querySelector("#date");
let deleteAll=document.getElementById("delete")
let tasks = JSON.parse(localStorage.getItem('task'));

if (!tasks) {
  tasks = [];
}
showtasks()



function addtask() {
  if (input.value) {
    let task = input.value.slice(1)
    let task2 = input.value.toUpperCase()[0];
    input.value = "";
    let taskDate = date.value;
    date.value = "";
    tasks.push({ task: task2 + task, date: taskDate,completed:false});
    saveData()
    
    showtasks();
  }
}

function formatDate(dateString) {
  let date = new Date(dateString);
  let day = date.getDate();
  let month = date.getMonth() + 1; 
  let year = date.getFullYear();
  
  if (day < 10) {
    day = "0" + day
  }
  
  if (month < 10) {
    month = "0" + month
  }
  
  return `${day}-${month}-${year}`;
}
function showtasks() {
  taskcontainer.innerHTML = "";
  
  for (let i = 0; i < tasks.length; i++) {
    let taskcontent = tasks[i].task;
    let dateContent = tasks[i].date ? formatDate(tasks[i].date) : '';
    let checked = tasks[i].completed ? 'checked' : '';
    

    taskcontainer.innerHTML += `
      <p>
        ${i + 1}. <input class="checkbox" type="checkbox" onchange="completed(${i})" ${checked}> <span class="span-task ${checked}">${taskcontent} ${dateContent}</span>
        <button class="button" onclick="deleteTask(${i})"><img class="cross-img" src="https://cdn-icons-png.flaticon.com/128/1828/1828774.png"></button>
      </p>
    `;
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveData()
  showtasks();
}
function completed(index) {
    if(tasks[index].completed){
      tasks[index].completed=false;
    }else{
      tasks[index].completed=true;
    }
  let spanTask = document.getElementsByClassName("span-task")[index];
  spanTask.classList.toggle("checked"); 
  saveData()
}



function deleteall(){
tasks.splice(0)
saveData()
showtasks();
}
function saveData(){
  localStorage.setItem('task', JSON.stringify(tasks));
}