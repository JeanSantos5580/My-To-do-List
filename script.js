const buttonCreateNewTask = document.querySelector(".button-new-task");
const buttonFinishTask = document.querySelector(".container-checkbox");
const containerModal = document.querySelector(".container-modal-new-task");
const inputsModal = containerModal.querySelectorAll("input");
const modalButtonCancel = document.querySelector(".button-cancel");
const modalButtonAdd = document.querySelector(".button-add");
const backgroundModal = document.querySelector(".background-modal");
const containerModalNewTask = document.querySelector(
  ".container-modal-new-task"
);
const containerCards = document.querySelector(".container-cards");
const childrenContainerCards = containerCards.children;
const containerImgWaitingTask = document.querySelector(
  ".container-img-waiting-task"
);

let taskList = [];

const checkForTasks = () => {
  for (let i = 0; i < childrenContainerCards.length; i++) {
    if (childrenContainerCards[i].classList.contains("new-card-generated")) {
      containerImgWaitingTask.style.display = "none";
    }

    if(!(childrenContainerCards[i].classList.contains("new-card-generated"))){
      containerImgWaitingTask.style.display = "flex";
    }
  }
};

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
  taskDescription,
  taskDate,
  taskStart,
  taskEnd
) => {
  /* Create new task */
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

  console.log(taskList);

  containerCards.appendChild(newCard);
  newCard.style.display = "flex";

  /* Check if there's at least a task, if true, remove the wait image */
  newCard.classList.add("new-card-generated");
  checkForTasks();

  /* Delete task */
  const deleteTask = newCard.querySelector(".container-icon-xmark");
  deleteTask.addEventListener("click", (e) => {
    newCard.remove();
    checkForTasks();
  });

  /* Finish task */
  const checkbox = newCard.querySelector(".checkbox");
  const textDecoration = "line-through #ffbe0b 3px";
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
      }
    } else {
      for (let inputValue of inputsValues) {
        inputValue.style.textDecoration = "none";
      }
    }
  });

  /* Clear inputs */
  if (modalButtonAdd) {
    taskTitle.value = "";
    taskDescription.value = "";
    taskDate.value = "";
    taskStart.value = "";
    taskEnd.value = "";
  }
};

const takeFormData = () => {
  const inputTaskTitle = document.querySelector(".input-task-title").value;
  const inputTaskDescription = document.querySelector(
    ".input-task-description"
  ).value;
  const inputTaskDate = document.querySelector(".input-task-date").value;
  const inputTimeRangeStart = document.querySelector(".range-start").value;
  const inputTimeRangeEnd = document.querySelector(".range-end").value;

  addnewTaskCard(
    inputTaskTitle,
    inputTaskDescription,
    inputTaskDate,
    inputTimeRangeStart,
    inputTimeRangeEnd
  );
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
