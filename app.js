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

const taskBtn = document.getElementById("task-btn");
const categorySelect = document.getElementById("category-select");
const enteredTask = document.getElementById("create-task");
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
  /* if (
    endDate.value &&
    startDate.value &&
    new Date(endDate.value) < new Date(startDate.value)
  ) {
    const dateAlert = alert("End date cannot be earlier than start date");
    return dateAlert;
  } */

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
  enteredTask.value = "";
});

let tasks = callTaskData();
//When the button is pressed, the Task is deleted from localStorage.
function removeItem(taskId) {
  tasks = tasks.filter((e) => e.id != taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//the section created by the content of the select element containing the categories
function createCategorySelect() {
  const selectBar = document.getElementById("category-select");
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
  createCategorySelect();
});

function listTasks() {
  const itemList = document.getElementById("task-list");
  const taskData = callTaskData();
  taskData.forEach((element) => {
    if (element.id) {
      itemList.innerHTML += `
    <tr>
        <td><input type="text" value="${element.taskName}" disabled></td>
        <td><input type="text" value="${element.taskDescription}" disabled ></td>
        <td><input type="date" " value="${element.taskStartDate}" disabled ></td>
        <td><input type="date" " value="${element.taskEndDate}" disabled></td>
        <td><button onclick="removeItem(${element.id})">&times;</button></td>
    </tr>
    <br>
    `;
    }
  });
}

//for date
/* const endDate = document.getElementById("start-date");
const startDate = document.getElementById("end-date");

endDate.addEventListener("change", function () {
  startDate.min = endDate.value;
});

startDate.addEventListener("change", function () {
  endDate.max = startDate.value;
});
 */
