const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// Adiciona tarefa ao pressionar Enter
inputBox.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Apaga a última tarefa ao pressionar Backspace
inputBox.addEventListener("keydown", function(event) {
  if (event.key === "Backspace" && inputBox.value === "") {
    deleteLastTask();
  }
});

// Apaga todas as tarefas ao pressionar ESC
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    deleteAllTasks();
  }
});

// onkeyup event
inputBox.onkeyup = () => {
  let userEnteredValue = inputBox.value;
  if (userEnteredValue.trim() != "") {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

showTasks();

addBtn.onclick = addTask;

function addTask() {
  let userEnteredValue = inputBox.value;
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  listArray.push(userEnteredValue);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
  addBtn.classList.remove("active");
}

function showTasks() {
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length;
  if (listArray.length > 0) {
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag;
  inputBox.value = "";
}

function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
}

function deleteLastTask() {
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData != null) {
    listArray = JSON.parse(getLocalStorageData);
    if (listArray.length > 0) {
      listArray.pop(); // Remove a última tarefa
      localStorage.setItem("New Todo", JSON.stringify(listArray));
      showTasks();
    }
  }
}

function deleteAllTasks() {
  localStorage.setItem("New Todo", JSON.stringify([]));
  showTasks();
}

deleteAllBtn.onclick = deleteAllTasks;
