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
    Math.random().toString(30) + Math.random().toString(30).substring(2, 17);
  console.log(random_id);
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
  console.log("deneme");

  const uniqueId = idGenerator();
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");

  const item = {
    id: uniqueId,
    categoryId: categorySelect,
    taskName: enteredTask.value,
    taskDescription: task_Description,
    taskStartDate: startDate,
    taskEndDate: endDate,
  };
  let task = JSON.parse(localStorage.getItem("tasks"));
  task.push(item);

  localStorage.setItem("tasks", JSON.stringify(task));
  taskDetail.innerHTML = ``;
});


function createCategorySelect(){
    const selectBar = document.getElementById("category-select");
    
    selectBar.innerHTML="";

    const selectedValue = callCategoryData().forEach(element => {
        const categoryOption =document.createElement("option");
        categoryOption.value =  element.id;
        categoryOption.innerText =element.categoryName;

        selectBar.appendChild(categoryOption);
    });
    
}

enteredTask.addEventListener("click", function detailedTask() {
  console.log("denem");
  taskDetail.innerHTML = `
    <input
          type="text"
          name="task-detail"
          id="task-detail"
          class="task-detail"
          placeholder="Enter Task Description"
        />
        <select name="category" id="category-select" onclick="createCategorySelect(this)">
          <option value="Choice-Category">Choice Category</option>
        </select>
        <div><input type="date" id="startDate"/><input type="date" id="endDate"/></div>    
    `;
});
