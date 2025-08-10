

const taskInput = document.getElementById("inputId");
const addTask = document.getElementById("add-btn")
const taskList = document.getElementById("task-list")

let tasks = [];

function renderTasks(){
    taskList.innerHTML = "";
    const filterCategory = document.getElementById("category").value;
    const searchItem = document.getElementById("search").value.toLowerCase();

    tasks
         .filter(task=>{
            const matchesCategory = filterCategory ? task.category === filterCategory: true;
            const matchesSearch = task.text.toLowerCase().includes(searchItem);
            return matchesCategory && matchesSearch;
         })
         .sort((a,b)=> new Date(a.due)- new Date(b.due));
         tasks.forEach((task, index)=>{
        const li= document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", ()=>{
            tasks[index].completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

    const span = document.createElement("span");
    span.textContent = `${task.text}-Due: ${task.due}`;
    if(task.completed){
        span.style.textDecoration = "line-through";
    }

    //deadline tasks
    const today = new Date();
    const deadline = new Date(task.due);
    if(!task.completed && deadline < today){
        span.style.color = "red";
        span.style.fontWeight = "bold";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", ()=>{
        tasks.splice(index,1);
        saveTasks();
        renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li)

    });
    updateStats();
};

addTask.addEventListener("click", () => {
    const text = taskInput.value.trim();
    const dueDate = document.getElementById("due-date").value
    const category = document.getElementById("category").value;
    if(text && dueDate && category){
        tasks.push({text: text, completed: false, due: dueDate, category: category});
        taskInput.value = "";
        dueDate.value = "";
        saveTasks();
        renderTasks();
    }
});

document.getElementById("category").addEventListener("change", renderTasks);
document.getElementById("search").addEventListener("input", renderTasks);

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
}


function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;

  document.getElementById("total-tasks").textContent = total;
  document.getElementById("completed-tasks").textContent = completed;

  const progress = total === 0 ? 0 : (completed / total) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
}

function loadTasks(){
    const stored = localStorage.getItem("tasks");
    if(stored){
        tasks = JSON.parse(stored);
    }
}

loadTasks();
renderTasks();



