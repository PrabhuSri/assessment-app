const express = require('express');
const userRoutes = express.Router();
const bcrypt = require('bcryptjs');
const RouteNames = require("../constants/routeNames");
const fs = require("fs");

userRoutes.post(RouteNames.register, function (req, res) {
    fs.readFile(__dirname + "/" + "DB.json", 'utf8', function (err, data) {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            const errors = [];
            if (!username)
                errors.push(`Username is required`);
            if (!password)
                errors.push(`Password is required`);
            if (!email)
                errors.push(`Email is required`);

            res.status(400).send(JSON.stringify({ status: 400, message: errors }));
        }
        let users = JSON.parse(data);
        if (users.find(x => x.username === req.body.username)) {
            res.status(400).send(JSON.stringify({ status: 400, message: `Username ${req.body.username} is already taken` }));
        }
        req.body.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
        users.push(req.body);
        fs.writeFile(__dirname + "/" + "DB.json", JSON.stringify(users), (err) => {
            if (err) throw err;
            res.end(JSON.stringify(`UserName saved sucessfully!`));
        });
    });
});

userRoutes.post(RouteNames.login, function (req, res) {
    fs.readFile(__dirname + "/" + "DB.json", 'utf8', function (err, data) {
        const { username, password } = req.body;
        if (!username || !password) {
            const errors = [];
            if (!username)
                errors.push(`Username is required`);
            if (!password)
                errors.push(`Password is required`);

            res.status(400).send(JSON.stringify({ status: 400, message: errors }));
        }
        let users = JSON.parse(data);
        console.log(users);
        const user = users.find(u => u.username === req.body.username && u.password === req.body.password);
        if (user) {
            res.end(JSON.stringify({ ...user, token: "dummy-token" }));
        }
        else {
            res.status(400).send(JSON.stringify({ status: 400, message: `Username or password is incorrect!` }))
        }
    });
});

module.exports = userRoutes;