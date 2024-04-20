const express = require('express');
//body-parser
const mongoose = require('mongoose')

const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error')

const userRoutes = require('./routes/user-routes')

const app = express();

app.use(express.json());

app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error; //syncronous
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occured'})
})

mongoose
  .connect('mongodb+srv://DB-user3:password1234@cluster0.himpb.mongodb.net/places?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    app.listen(5000);
  })
  .catch(() => {
    console.log(err)
  })
