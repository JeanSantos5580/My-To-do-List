const buttonCreateNewTask = document.querySelector(".button-new-task");
const modalButtonCancel = document.querySelector(".button-cancel");
const modalButtonAdd = document.querySelector(".button-add");

const backgroundModal = document.querySelector(".background-modal");
const containerModalNewTask = document.querySelector(
  ".container-modal-new-task"
);

const taskList = [];

const openModalNewTask = () => {
  backgroundModal.style.visibility = "visible";
  containerModalNewTask.style.visibility = "visible";
};

const closeModalNewTask = () => {
  backgroundModal.style.visibility = "hidden";
  containerModalNewTask.style.visibility = "hidden";
};

const addnewTaskCard = (
  taskTitle,
  taskDescription , taskDate, taskStart, taskEnd
) => {
  const containerCards = document.querySelector(".container-cards");
  const taskCard = document.querySelector(".new-task-card");
  const newCard = taskCard.cloneNode(true);

  const newTaskTitle = newCard.querySelector(".task-title");
  newTaskTitle.innerHTML = taskTitle;

  const newTaskDescription = newCard.querySelector(".task-description");
  newTaskDescription.innerHTML = taskDescription;

  const newTaskDate = newCard.querySelector(".task-date");
  newTaskDate.innerHTML = taskDate;

  const newTaskRangeStart = newCard.querySelector(".task-range-start");
  newTaskRangeStart.innerHTML = taskStart;

  const newTaskRangeEnd = newCard.querySelector(".task-range-end");
  newTaskRangeEnd.innerHTML = taskEnd;

  taskList.push(newCard);

  containerCards.appendChild(newCard);
};

const takeFormData = () => {
  const inputTaskTitle = document.querySelector(".input-task-title").value;
  const inputTaskDescription = document.querySelector(".input-task-description").value;
  const inputTaskDate = document.querySelector(".input-task-date").value;
  const inputTimeRangeStart = document.querySelector(".range-start").value;
  const inputTimeRangeEnd = document.querySelector(".range-end").value;

  addnewTaskCard(inputTaskTitle, inputTaskDescription, inputTaskDate, inputTimeRangeStart, inputTimeRangeEnd);
};

buttonCreateNewTask.addEventListener("click", (e) => openModalNewTask());

modalButtonCancel.addEventListener("click", (e) => {
  e.preventDefault();
  closeModalNewTask();
});

modalButtonAdd.addEventListener("click", (e) => {
  e.preventDefault();
  takeFormData();
  closeModalNewTask();
});
