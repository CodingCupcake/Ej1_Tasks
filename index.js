const express = require('express');
const bodyParser = require('body-parser');
const taskroutes = require('./routes/taskRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const authUtils = require('./middleware/authUtils');

const app = express();
app.use(bodyParser.json());

app.post('/login', (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    //const {username, password} = req.body

    if(username === 'admin' && password === 'admin'){
        const token = authUtils.generateToken({id: 1, username: username});
        res.json({token});
    }else{
        res.json(401).json({error: "Unauthorized"});
    }
});

app.use(authMiddleware);

app.use('/task',taskroutes);

const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=> {
    console.log(`Servidor ejecutado ${PORT}`);    
});
