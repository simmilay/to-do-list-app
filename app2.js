const tasks = [
  {
    id: 1,
    categoryId: 1,
    taskName: "evi topla",
    taskDescription: "çocuk odasını ve salonu süpür",
  },
  {
    id: 2,
    categoryId: 1,
    taskName: "yemek yap",
    taskDescription: "Lahana dolması ve mercimek çorbası pişir",
  },
  {
    id: 3,
    categoryId: 2,
    taskName: "Kitap Oku",
    taskDescription: "gurur ve önyargı, 30 sayfa oku",
  },
];

const addBtn = document.getElementById("add-btn");
const keyTxt = document.getElementById("key-txt");
const valTxt = document.getElementById("val-txt");
const itemList = document.getElementById("item-list");

function createCategory(){
    const enteredCategory = document.getElementById(create-ctgry);
    
}

function addItem(element) {
  // console.log(element);

  itemList.innerHTML += `
    <tr>
        <td><input type="text" value="${element.taskName}" disabled></td>
        <td><input type="text" value="${element.taskDescription}" ></td>
        <td><button onclick="removeItem(${element.id});" >&times;</button></td>
    </tr>
    `;
}

function removeItem(id) {
  //console.log(id);
  
// delete with map-filter
  const updatedTasks = tasks
    .map((task) => {
      if (task.id === id) {
        return null;
      }
      return task;
    })
    .filter((task) => task !== null);

// delete with filter
//   let tasks = JSON.parse(localStorage.getItem("tasks"));
//   tasks = tasks.filter((x) => x.id !== id);
//   let tasks = JSON.parse(localStorage.getItem("tasks"));
}

localStorage.setItem("tasks", JSON.stringify(tasks));
const storatedTaskData = localStorage.getItem("tasks");

const taskData = JSON.parse(storatedTaskData);

//bunun yerine for of kullan
taskData.forEach((element) => {
  addItem(element);
});
