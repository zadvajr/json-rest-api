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

//POST /users - Creates a new user
app.post('/users', (req, res) => {
    const newUser = {
        id: Date.now(),
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);

    res.status(201).json(newUser);
});

//PUT /users/:id - Update an existing user
app.put('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id, 10));
    if (userIndex !== -1) {
        users[userIndex] = {
            ...users[userIndex],
            ...req.body
        };

        res.status(200).json(users[userIndex]);
    }
    else {
        res.status(404).json({ error: 'User not found'});
    }
});

//DELETE /users/:id - Delete a users