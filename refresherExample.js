const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.post('/user', (req, res, next) => {
    res.send('<h1>User: ' + req.body.username + '<h1>')
})

app.get('/', (req, res, next) => {
  res.send(
    '<form action="/user" method="POST"><input type="text" name="username"><button type="submit">Creat User</button></form>'
  );
});

app.listen(5002);
