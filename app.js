const express = require('express');
//body-parser

const placesRoutes = require('./routes/places-routes');

const userRoutes = require('./routes/user-routes')

const app = express();

app.use('/api/places', placesRoutes);

app.listen(5000);