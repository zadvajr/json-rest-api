const express = require('express');
const app = express();

//Middleware to parse JSON bodies
app.use(express.json());

//Sample in-memory data store
let users = [
    {
        id: 1, name: 'Alice', email: 'alice@example.com'
    },
    {
        id: 2, name: 'Bob', email: 'bob@example.com'
    }
];

//GET /users - Retrieve all users
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

//GET /users/:id - Retrieve a user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id, 10));
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({error: 'User not found'});
    }
});

