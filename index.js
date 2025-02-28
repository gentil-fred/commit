document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    document.getElementById("addTaskBtn").addEventListener("click", addTask);
});

//add our tasks
function addTask() {
    let description = document.getElementById("taskDescription").value.trim();
    let status = document.getElementById("taskStatus").value;
    let errorMessage = document.getElementById("errorMessage");

    //condition if
    if (!description) {
        errorMessage.textContent = "Task description cannot be empty.";
        return;
    }
    if (description.length > 200) {
        errorMessage.textContent = "Task description cannot exceed 200 characters.";
        return;
    }

    errorMessage.textContent = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.unshift({ description, status });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("taskDescription").value = "";

    loadTasks()
}

//load your task to Localstorage
function loadTasks(filter = "all") {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        if (filter !== "all" && task.status !== filter) return;

        let li = document.createElement("li");
        li.className = task.status === "Completed" ? "completed" : "";  //iterate condition
        li.innerHTML = `
            <span>${task.description}</span>
            <div>
                <button onclick="toggleStatus(${index})">${task.status === "Pending" ? "✔" : "↺"}</button> 
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}


//function of changing our status from pending to complete or from complete to pending
function toggleStatus(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].status = tasks[index].status === "Pending" ? "Completed" : "Pending";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

//deleting some element from our local storage
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
//load our tasks after our html is well parsed
function filterTasks(filter) {
    loadTasks(filter);
}