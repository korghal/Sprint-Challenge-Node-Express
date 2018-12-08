const express = require('express');

const projectDB = require('../data/helpers/projectModel')

const router = express.Router();

router.get('/', (req, res) => {
    projectDB.get()
    .then((projects) => {
        res.status(200).json(projects);
    })
    .catch((error) => {
        res.status(500).json({errorMessage: `Server had an error of: ${error}`});
    })
})
module.exports = router;