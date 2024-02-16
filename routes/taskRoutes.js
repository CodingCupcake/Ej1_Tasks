const express = require('express');
const router = express.Router();
const taskcontroller = require('../controllers/taksController');
const authutils = require('../middleware/authUtils');

function authenticate(req, res, next) {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({error: "Unauthorized"});
    }
    const decodedtoken = authutils.verifyToken(token);
    if(!decodedtoken){
        return res.status(401).json({error: 'Unauthorized'});
    }
    req.user = decodedtoken;
    next();
}

router.get('/', authenticate, (req, res) => {
    // const tasks =
    res.json(taskcontroller.getAllTasks());
});

router.post('/', authenticate, (req, res) => {
    const { title, description } = req.body;
    const newTask = taskcontroller.createTask(title, description);
    res.status(201).json(newTask);
});

router.get('/:id', authenticate, (req, res) => {
    const idtask = parseInt(req.params.id) //id a numero
    const TaskFound = taskcontroller.findTask(idtask); 

    if (TaskFound){
        res.json(TaskFound);
    } else {
        res.status(404).json({ error: 'No se encontro la tarea' });
    }
});

router.put('/:id', authenticate, (req, res) => {
    const idtask = parseInt(req.params.id) //id a numero
    const { title, description } = req.body;
    const TaskFound = taskcontroller.updateTask(idtask, title, description); 
    
    if (TaskFound){
        res.json(TaskFound);
    } else {
        res.status(404).json({ error: 'No se encontro la tarea' });
    }
});

router.delete('/:id', authenticate, (req, res) => {
    const idtask = parseInt(req.params.id) //id a numero
    const TaskFound = taskcontroller.deleteTask(idtask); 
    
    if (TaskFound){
        res.json(TaskFound);
    } else {
        res.status(404).json({ error: 'No se encontro la tarea' });
    }
});

/* ========================= punto 3 =========================== */

router.get('/', (req, res) => {
    res.json(taskcontroller.getTasksAmount());
});

module.exports = router;