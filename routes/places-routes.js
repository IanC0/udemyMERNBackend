const express = require("express");

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        Description: 'One of the most famous sky scrapers in the world!',
        location: {
            lat: 40.7484474,
            lng: -739871516
        },
        address: '20 W 34th St, new York, NY 10001',
        creator: 'u1'
    }
];

const router = express.Router();

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });

  res.json({ place }); // {place: place}
});

router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find(p => {
    return p.creator === userId;
  });

  res.json({ place });

});

module.exports = router;