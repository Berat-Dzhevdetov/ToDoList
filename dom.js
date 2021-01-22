const btnAddTaskId = document.getElementById('btnAddTaskId');
const tasks = document.querySelector('.tasks');
btnAddTaskId.addEventListener('click', () => addNewTask())
document.getElementById('inputTaskId').addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        addNewTask();
    }
})

function changeTrashToRed(e) {
    e.target.src = 'red-trash-bin.svg';
}

function removeRedTrash(e) {
    e.target.src = 'trash-bin.svg';
}

function changeCheckToGreen(e) {
    e.target.src = 'check-green.svg';
}

function removeGreenCheck(e) {
    e.target.src = 'check-black.svg';
}

function createAndVisualizateNewTask(inputTaskId) {

    let newlyDivTask = document.createElement('div');
    newlyDivTask.classList.add('task');

    let newlyDivLeftPart = document.createElement('div');
    newlyDivLeftPart.classList.add('left-part');
    newlyDivLeftPart.innerHTML = inputTaskId;
    newlyDivTask.appendChild(newlyDivLeftPart);

    let newlyDivRightPart = document.createElement('div');
    newlyDivRightPart.classList.add('right-part');
    newlyDivRightPart.innerHTML = '<img src="trash-bin.svg" alt="" onclick="deleteTask(event)" onmouseover="changeTrashToRed(event)" title="Delete" onmouseout="removeRedTrash(event)"><img src="check-black.svg" alt="" onclick="makeTaskDone(event)" onmouseover="changeCheckToGreen(event)" title="Done" onmouseout="removeGreenCheck(event)">'
    newlyDivTask.appendChild(newlyDivRightPart);
    tasks.appendChild(newlyDivTask);
    let lastAddedTaks = document.querySelector('.task');
    $(newlyDivTask).insertBefore(lastAddedTaks);
    document.getElementById('inputTaskId').value = '';
}

function addNewTask() {
    const inputTaskId = document.getElementById('inputTaskId').value.trim();
    if (inputTaskId.length <= 0) {
        return;
    }
    createAndVisualizateNewTaskAndCheck(inputTaskId);
}

function changeReverseIconToBlack(e) {
    e.target.src = './reversed-rotating-arrow.svg';
}

function changeReverseIconToBlue(e) {
    e.target.src = './reversed-rotating-arrow-blue.svg';
}

function createNewDoneTask(doneTask) {
    let newlyIl = document.createElement('li');

    let newlySpan = document.createElement('span');
    newlySpan.classList.add('text');
    newlySpan.innerHTML = doneTask;

    newlyIl.appendChild(newlySpan);
    let newlyReversedArrow = document.createElement('img');
    newlyReversedArrow.addEventListener('mouseover', (e) => changeReverseIconToBlue(e));
    newlyReversedArrow.addEventListener('mouseout', (e) => changeReverseIconToBlack(e));
    newlyReversedArrow.addEventListener('click', (e) => backToTodoTasks(e));
    newlyReversedArrow.src = './reversed-rotating-arrow.svg';
    newlyReversedArrow.title = 'Back to ToDo list';
    newlyReversedArrow.style.width = '50px';
    newlyReversedArrow.style.height = '50px';

    let newlyTrashBin = document.createElement('img');
    newlyTrashBin.addEventListener('mouseover', (e) => changeTrashToRed(e));
    newlyTrashBin.addEventListener('mouseout', (e) => removeRedTrash(e));
    newlyTrashBin.addEventListener('click', (e) => removeFromTodo(e));
    newlyTrashBin.src = './trash-bin.svg';
    newlyTrashBin.title = 'Delete';
    newlyTrashBin.style.width = '50px';
    newlyTrashBin.style.height = '50px';

    newlyIl.appendChild(newlyTrashBin)
    newlyIl.appendChild(newlyReversedArrow);

    $(newlyIl).insertAfter(".notaholder");
}

function renderDoneTasks(doneTask) {
    createNewDoneTask(doneTask);
}