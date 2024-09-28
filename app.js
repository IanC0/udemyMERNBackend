const express = require('express');
//body-parser
const mongoose = require('mongoose')

const placesRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/user-routes')
const HttpError = require('./models/http-error')

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  // could restrict this to localHost3000 but we are fine opening up to all for this app
  res.setHeader('Access-Control-Allow-Origin', '*',);
  // specify which headers these requests sent by the browser may have,
  // this controls which headers incoming requests may have so that they are handled.
  // could be star as well but wanted to be more specific
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-requested-With, Content-Type, Accept, Authorization');
  // which HTTP methods may be attached on incoming requests
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next();
})

app.use('/api/places', placesRoutes); // => /api/places...
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
  .connect('mongodb+srv://DB-user3:password1234@cluster0.himpb.mongodb.net/udemyMern?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    app.listen(5000);
  })
  .catch(() => {
    console.log(err)
  })
