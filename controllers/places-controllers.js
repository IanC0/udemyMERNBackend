const uuid = require("uuid").v4;
const { validationResult } = require('express-validator');
 
const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -739871516,
    },
    address: "20 W 34th St, new York, NY 10001",
    creator: "u1",
  }
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
  }

  res.json({ place }); // {place: place}
};

//comment
//comment

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });
  if (!places || places.length === 0) {
    const error = new Error("Could not find a places for the provided user ID.");
    error.code = 404;
    return next(error);
  }
  res.json({ places });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors); 
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uuid(), //1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ places: createdPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).send({ message: "Deleted place." });
};

//both bundled to one object
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
