const express = require('express');
//body-parser

const placesRoutes = require('./routes/places-routes');

const userRoutes = require('./routes/user-routes')

const app = express();

app.use(express.json());

app.use('/api/places', placesRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occured'})
})

app.listen(5000);