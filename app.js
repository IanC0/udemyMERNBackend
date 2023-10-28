const express = require('express');
//body-parser

const placesRoutes = require('./routes/places-routes')

const app = express();

app.use(placesRoutes);

app.listen(5000)