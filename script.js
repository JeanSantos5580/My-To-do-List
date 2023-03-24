const buttonCreateNewTask = document.querySelector(".button-new-task");
const buttonClearTasks = document.querySelector(".button-clear-all-tasks");
const modalButtonCancel = document.querySelector(".button-cancel");
const modalButtonAdd = document.querySelector(".button-add");
const backgroundModal = document.querySelector(".background-modal");
const containerModalNewTask = document.querySelector(
  ".container-modal-new-task"
);
const containerCards = document.querySelector(".container-cards");
let childrenContainerCards = containerCards.children;
const containerImgWaitingTask = document.querySelector(
  ".container-img-waiting-task"
);

let taskList = [];

const checkForTasks = async () => {
  childrenContainerCards.length > 0
    ? (containerImgWaitingTask.style.display = "none")
    : (containerImgWaitingTask.style.display = "flex");
};

const openModalNewTask = () => {
  backgroundModal.style.visibility = "visible";
  containerModalNewTask.style.visibility = "visible";
};

const closeModalNewTask = () => {
  backgroundModal.style.visibility = "hidden";
  containerModalNewTask.style.visibility = "hidden";
};

const clearAllTasks = async () => {
  containerCards.innerHTML = null;
  await checkForTasks();
};

const addnewTaskCard = async (
  taskTitle,
  taskDescription,
  taskDate,
  taskStart,
  taskEnd
) => {
  /* Create new task */
  const taskCard = document.querySelector(".new-task-card");
  const newCard = taskCard.cloneNode(true);
  const deleteTask = newCard.querySelector(".container-icon-xmark");
  const checkbox = newCard.querySelector(".checkbox");
  const textDecoration = "line-through #06d6a0 3px";
  const fontColor = "#aaa";

  const newTaskTitle = newCard.querySelector(".task-title");
  newTaskTitle.innerHTML = taskTitle;

  const newTaskDescription = newCard.querySelector(".task-description");
  newTaskDescription.innerHTML = taskDescription;

  const newTaskDate = newCard.querySelector(".task-date");

  const containerTaskRange = newCard.querySelector(".container-task-range");

  const newTaskRangeStart = newCard.querySelector(".task-range-start");
  const containerRangeStart = newCard.querySelector(".container-range-start");

  const newTaskRangeEnd = newCard.querySelector(".task-range-end");
  const containerRangeEnd = newCard.querySelector(".container-range-end");

  /* Check if inputs of task date creation and task range values are true or false */

  const checkDateAndHourRange = () => {
    taskDate
      ? (newTaskDate.innerHTML = taskDate)
      : (newTaskDate.style.display = "none");

    taskStart
      ? (newTaskRangeStart.innerHTML = taskStart)
      : (containerRangeStart.style.display = "none");

    taskEnd
      ? (newTaskRangeEnd.innerHTML = taskEnd)
      : (containerRangeEnd.style.display = "none");

    !taskStart && !taskEnd && (containerTaskRange.style.display = "none");
  };

  checkDateAndHourRange();

  /* Add the new card into array taskList*/

  taskList.push(newCard);

  /* Add the new card as a child of container cards */
  containerCards.insertBefore(newCard, containerCards.firstChild);
  /* containerCards.insertBefore(newCard, containerCards.firstChild); */

  /* Changes display propertie of the new card */
  newCard.style.display = "flex";

  /* After the new card is created a new class is added to it */
  newCard.classList.add("new-card-generated");



  /* Delete task, and check if after this, still there's any task card */
  deleteTask.addEventListener("click", (e) => {
    newCard.remove();
    checkForTasks();
  });

  /* Finish task */

  const inputsValues = [
    newTaskTitle,
    newTaskDescription,
    newTaskDate,
    newTaskRangeStart,
    newTaskRangeEnd,
  ];

  checkbox.addEventListener("click", (e) => {
    if (checkbox.checked) {
      for (let inputValue of inputsValues) {
        inputValue.style.textDecoration = textDecoration;
        inputValue.style.color = fontColor;
      }
    } else {
      for (let inputValue of inputsValues) {
        inputValue.style.textDecoration = "none";
        inputValue.style.color = "";
      }
    }
  });
};

const takeFormData = () => {
  let inputTaskTitle = document.querySelector(".input-task-title").value;
  let inputTaskDescription = document.querySelector(
    ".input-task-description"
  ).value;
  let inputTaskDate = document.querySelector(".input-task-date").value;
  let inputTimeRangeStart = document.querySelector(".range-start").value;
  let inputTimeRangeEnd = document.querySelector(".range-end").value;

  addnewTaskCard(
    inputTaskTitle,
    inputTaskDescription,
    inputTaskDate,
    inputTimeRangeStart,
    inputTimeRangeEnd
  );

  /* Clear form for user to create a new task */

  document.querySelector(".input-task-title").value = "";
  document.querySelector(".input-task-description").value = "";
  document.querySelector(".input-task-date").value = "";
  document.querySelector(".range-start").value = "";
  document.querySelector(".range-end").value = "";
};

buttonCreateNewTask.addEventListener("click", (e) => openModalNewTask());

buttonClearTasks.addEventListener("click", (e) => clearAllTasks());

modalButtonCancel.addEventListener("click", (e) => {
  e.preventDefault();
  closeModalNewTask();
});

modalButtonAdd.addEventListener("click", (e) => {
  e.preventDefault();
  takeFormData();
  closeModalNewTask();
  checkForTasks()
});
