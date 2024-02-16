const Task = require('../models/task');

let tasks = [
    { id: 1, title: 'tarea 1', description: 'Descripcion de la tarea 1'},
    { id: 2, title: 'tarea 2', description: 'Descripcion de la tarea 2'}
];

function getAllTasks(){
    return tasks;
}

function createTask(title, description) {
    const newTask = new Task(tasks.length+1, title, description);
    tasks.push(newTask);
    return newTask;
}    

function findTask(id){
    const idtask = parseInt(id);
    //buscar tarea por id
    const TaskFound = tasks.find(a => a.id === idtask);
    return TaskFound;
}

function updateTask(id, title, description) {
    const idtask = parseInt(id);
    const TaskFoundD = tasks.findIndex(a => a.id === idtask);
    
    tasks[TaskFoundD].title = title; 
    tasks[TaskFoundD].description = description; 
    return tasks;
}

function deleteTask(id) {
    const idtask = parseInt(id);
    const TaskFoundD = tasks.findIndex(a => a.id === idtask);
    
    tasks.splice(TaskFoundD, 1);
    return tasks;
}

/* ========================= punto 3 =========================== */

function getTasksAmount(){
    const TaskAmount = tasks.length;
    return TaskAmount;
}

module.exports = {
    getAllTasks,
    createTask,
    findTask,
    updateTask,
    deleteTask,
    getTasksAmount
}