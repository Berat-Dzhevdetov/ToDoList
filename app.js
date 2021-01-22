function getDataAsObject() {
    return JSON.parse(localStorage.getItem("todo"));
}

function createAndVisualizateNewTaskAndCheck(inputTaskId) {
    if (valiteIfIsInStorageAlready(inputTaskId)) {
        document.getElementById('inputTaskId').value = '';
        alert('You already have this todo task');
        return;
    } else {
        createAndVisualizateNewTask(inputTaskId);
        pushNewTaskInTodo(inputTaskId);
    }
}

(function() {
    if (localStorage.getItem("todo") === null) {
        let obj = {
            todo: [],
            done: []
        }
        obj = JSON.stringify(obj);
        localStorage.setItem("todo", obj)
    }
    let todoTasksArray = getDataAsObject().todo;
    for (let i = 0; i < todoTasksArray.length; i++) {
        createAndVisualizateNewTask(todoTasksArray[i]);
    }
    let doneTaskArray = getDataAsObject().done;
    for (let i = 0; i < doneTaskArray.length; i++) {
        renderDoneTasks(doneTaskArray[i]);
    }
})()


function deleteTask(e) {
    let word = e.target.parentNode.parentNode.querySelector('.left-part').innerHTML;
    let askUserIfHeIsSure = confirm('Do you really want to delete this task : ' + word)
    if (askUserIfHeIsSure) {
        let array = getDataAsObject().todo;
        for (let i = 0; i < array.length; i++) {
            if (word == array[i]) {
                array.splice(i, 1);
                break;
            }
        }
        setNewToDoArray(array);
        e.target.parentNode.parentNode.remove();
    }

}

function valiteIfIsInStorageAlready(wordToFind) {
    let array = getDataAsObject().todo;
    for (let i = 0; i < array.length; i++) {
        if (array[i] == wordToFind) {
            return true;
        }
    }
    return false;
}

function pushNewTaskInTodo(inputTaskId) {
    let obj = getDataAsObject();
    obj.todo.push(inputTaskId);
    obj = JSON.stringify(obj);
    localStorage.setItem('todo', obj);
}

function setNewToDoArray(array) {
    let obj = getDataAsObject();
    obj.todo = array;
    obj = JSON.stringify(obj);
    localStorage.setItem('todo', obj);
}

function makeTaskDone(e) {
    let doneTask = e.target.parentNode.parentNode.querySelector('.left-part').innerHTML;
    e.target.parentNode.parentNode.remove();
    createNewDoneTask(doneTask);
    addTaskToDoneLocalStorage(doneTask);
    removeTaskFromTodo(doneTask);
}

function addTaskToDoneLocalStorage(doneTask) {
    let obj = getDataAsObject();
    obj.done.push(doneTask);
    obj = JSON.stringify(obj);
    localStorage.setItem('todo', obj);
}

function removeTaskFromTodo(word) {
    let array = getDataAsObject().todo;
    for (let i = 0; i < array.length; i++) {
        if (word == array[i]) {
            array.splice(i, 1);
            break;
        }
    }
    setNewToDoArray(array);
}

function removeFromTodo(e) {
    let word = e.target.parentNode.querySelector('.text').innerHTML;
    let askUserIfHeIsSure = confirm('Do you really want to delete this task : ' + word)
    if (askUserIfHeIsSure) {
        let array = getDataAsObject().done;
        for (let i = 0; i < array.length; i++) {
            if (word == array[i]) {
                array.splice(i, 1);
                break;
            }
        }
        setNewDoneArray(array);
        e.target.parentNode.remove();
    }
}

function setNewDoneArray(array) {
    let obj = getDataAsObject();
    obj.done = array;
    obj = JSON.stringify(obj);
    localStorage.setItem('todo', obj);
}

function backToTodoTasks(e) {
    let word = e.target.parentNode.querySelector('.text').innerHTML;
    createAndVisualizateNewTaskAndCheck(word);
    let array = getDataAsObject().done;
    for (let i = 0; i < array.length; i++) {
        if (word == array[i]) {
            array.splice(i, 1);
            break;
        }
    }
    setNewDoneArray(array);
    e.target.parentNode.remove();
}