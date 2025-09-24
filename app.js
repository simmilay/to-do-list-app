const taskBtn = document.getElementById("task-btn");
const enteredTask = document.getElementById("create-task");

const ctgryBtn = document.getElementById("ctgry-btn");

window.addEventListener("load", function chekLocalStorage() {
  if (!localStorage.getItem("categories")) {
    let temporaryListC = [];
    localStorage.setItem("categories", JSON.stringify(temporaryListC));
  }

  if (!localStorage.getItem("tasks")) {
    let temporaryListT = [];
    localStorage.setItem("tasks", JSON.stringify(temporaryListT));
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key == "Escape") {
    const ctd = document.getElementById("create-task-description");
    ctd.innerHTML = ``;
    enteredTask.value = "";
  }
});

//identities are created here
function idGenerator() {
  const random_id =
    Date.now() + Math.floor(Math.random() * 100250 + 10000) + 25978;
  return idCheck(random_id);
}

//Here we check if the ID is unique or not.
function idCheck(uniqueId) {
  let categoriesData = callCategoryData();
  let taskData = callTaskData();

  const ctgryId = categoriesData.find((x) => x.id == uniqueId);
  const taskId = taskData.find((y) => y.id == uniqueId);

  if (ctgryId || taskId) {
    return idGenerator();
  } else {
    return uniqueId;
  }
}

//category data is called here
function callCategoryData() {
  return JSON.parse(localStorage.getItem("categories"));
}

//When the button is pressed, the Category is added to the localStorage from here
ctgryBtn.addEventListener("click", function createCategory() {
  const enteredCategory = document.getElementById("create-ctgry");

  if (!enteredCategory.value) {
    const alarm = alert(
      "If you want to create a category, please give a name to the category you will create."
    );
    return alarm;
  }
  const uniqueId = idGenerator();
  const item = {
    id: uniqueId,
    categoryName: enteredCategory.value,
  };
  let category = JSON.parse(localStorage.getItem("categories"));
  category.push(item);

  localStorage.setItem("categories", JSON.stringify(category));
  enteredCategory.value = "";
});

function callTaskData() {
  return JSON.parse(localStorage.getItem("tasks"));
}

const taskDetail = document.getElementById("create-task-description");
//When the button is pressed, the Task is added to the localStorage from here
taskBtn.addEventListener("click", function createTask() {
  const task_Description = document.getElementById("task-detail");
  if (!enteredTask.value) {
    const alarm = alert(
      "If you want to create a task, please give a name to the task you will create."
    );
    return alarm;
  }

  const uniqueId = idGenerator();

  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");
  //for date
  if (
    endDate.value &&
    startDate.value &&
    new Date(endDate.value) < new Date(startDate.value)
  ) {
    const dateAlert = alert("End date cannot be earlier than start date");
    return dateAlert;
  }

  const item = {
    id: uniqueId,
    categoryId: document.getElementById("category-select").value,
    taskName: enteredTask.value,
    taskDescription: task_Description.value,
    taskStartDate: startDate.value,
    taskEndDate: endDate.value,
  };
  let task = JSON.parse(localStorage.getItem("tasks"));
  task.push(item);

  localStorage.setItem("tasks", JSON.stringify(task));
  taskDetail.innerHTML = ``;
  listTasks();
});

//When the button is pressed, the Task is deleted from localStorage.
function removeItem(taskId) {
  let tasks = callTaskData();
  let message = confirm("Are you sure you want to delete the task?");
  if (message == true) {
    tasks = tasks.filter((e) => e.id != taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    listTasks();
  }
}

function updateItem(taskId) {
  let tasks = callTaskData();

  tasks.forEach((x) => {
    if (x.id === taskId) {
      let updateArea = document.getElementById(`divId_${taskId}`);
      updateArea.innerHTML = `
  <input type="text" id="newTaskName_${x.id}" value="${x.taskName}">
  <input type="text" id="newTaskDescription_${x.id}" value="${x.taskDescription}">
  <input type="date" id="newTaskStartDate_${x.id}" value="${x.taskStartDate}">
  <input type="date" id="newTaskEndDate_${x.id}" value="${x.taskEndDate}">
  <button onclick = "saveItem(${x.id})" >save </button>
`;
    }
  });
}

//the section created by the content of the select element containing the categories
function createCategorySelect(documentElementId) {
  const selectBar = document.getElementById(documentElementId);

  selectBar.innerHTML = "";
  selectBar.innerHTML = `<option value=''>Select Category</option>`;

  const selectedValue = callCategoryData().forEach((element) => {
    const categoryOption = document.createElement("option");
    categoryOption.value = element.id;
    categoryOption.id = element.id;
    categoryOption.innerText = element.categoryName;

    selectBar.appendChild(categoryOption);
  });
}

//section that opens to add task details
enteredTask.addEventListener("click", function detailedTask() {
  taskDetail.innerHTML = `
    <input
          type="text"
          name="task-detail"
          id="task-detail"
          class="task-detail"
          placeholder="Enter Task Description"
        />
        <select name="category-select" id="category-select" >
          <option value="Choice-Category">Choice Category</option>
        </select>
        <div>
        <input type="date" id="startDate"/>
        <input type="date" id="endDate"/></div>    
    `;

  //for date
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");

  startDate.addEventListener("change", function () {
    endDate.min = startDate.value;
  });

  endDate.addEventListener("change", function () {
    if (endDate.value < startDate.value) {
      alert("End date cannot be earlier than start date");
      endDate.value = "";
    }
  });

  createCategorySelect("category-select");
});

//list all tasks
function listTasks() {
  const itemList = document.getElementById("task-list");
  itemList.innerHTML = "";
  const taskData = callTaskData();

  taskData.forEach((element) => {
    if (element.id) {
      itemList.innerHTML += `
    <ul style="display : flex; list-style-type:none; margin:0px; padding : 0px; ">
        <li  style ="margin: 0 3px"><input id="taskName_${element.id}" type="text" value="${element.taskName}" disabled ></li>
        <li style ="margin: 0 3px"><button  onclick="removeItem(${element.id})"><img src="images/delete_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" class="btn-img" alt=""></button></li>
        <li style ="margin: 0 3px">
        <button id="-updatebtn-${element.id}" onclick="openModal(${element.id})">
        <img src="images/edit_note_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" class="btn-img" alt="">
        </button></li>
        <div id="divId_${element.id}"}>
    </ul>   
    `;
    }
  });
}

//calls the update modal
const modal_container = document.getElementById("modal_container");
const close = document.getElementById("close");
const updateSave = document.getElementById("update-save");
let taskId_forSave = null;

function openModal(taskId) {
  modal_container.classList.add("show");
  createCategorySelect("category-select-modal");
  const tasks = callTaskData();
  const check = tasks.find((x) => {
    if (x.id === taskId) {
      document.getElementById("task-name-modal").value = x.taskName;
      document.getElementById("task-description-modal").value =
        x.taskDescription;
      document.getElementById("category-select-modal").value = x.categoryId;
      document.getElementById("task-start-date-modal").value = x.taskStartDate;
      document.getElementById("task-end-date-modal").value = x.taskEndDate;
      
    }
  });
  if(check){
    taskId_forSave = taskId;  
  }
}

function closeModal() {
  modal_container.classList.remove("show");
}
close.addEventListener("click", closeModal);

function saveItem(taskId) {
  const newTaskName = document.getElementById("task-name-modal").value;
  const newTaskDescription = document.getElementById(
    "task-description-modal"
  ).value;
  const newTaskCategory = document.getElementById(
    "category-select-modal"
  ).value;
  const newTaskStartDate = document.getElementById(
    "task-start-date-modal"
  ).value;
  const newTaskEndDate = document.getElementById("task-end-date-modal").value;

  let tasks = callTaskData();

  tasks.find((x) => {
    if (x.id === taskId) {
      x.taskName = newTaskName;
      x.taskDescription = newTaskDescription;
      x.taskStartDate = newTaskStartDate;
      x.taskEndDate = newTaskEndDate;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      listTasks();
      closeModal();
    }
  });

  updateSave.addEventListener("click", saveItem(taskId_forSave));
}
