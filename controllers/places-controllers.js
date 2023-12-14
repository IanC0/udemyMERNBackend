const uuid = require('uuid').v4;

const HttpError = require("../models/http-error")

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    Description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -739871516,
    },
    address: "20 W 34th St, new York, NY 10001",
    creator: "u1",
  },
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

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });
  if (!place) {
    const error = new Error("Could not find a place for the provided user ID.");
    error.code = 404;
    return next(error);
  }
  res.json({ place });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;  
  
  const createdPlace = {
    id: uuid(), //1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    title,
    description,
    location: coordinates,
    address,
    creator
  }

  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({'places': createdPlace})
}


//both bundled to one object
exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;