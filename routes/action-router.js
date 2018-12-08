const express = require('express');

const actionDB = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    actionDB.get()
    .then((actions) => {
        res.status(200).json(actions);
    })
    .catch((error) => {
        res.status(500).json({errorMessage: `Server had an error of: ${error} trying to get the action list.`});
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    actionDB.get(id)
    .then((action) => {
        if(action) {
            res.status(200).json(action);
        }
        else {
            res.status(404).json({error: `Action id: ${id} not found.`});
        }
    })
    .catch((error) => {
        res.status(500).json({errorMessage: `Server had an error of: ${error} trying to get action id: ${id}`})
    })
})

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    let deletedAction;
    actionDB.get(id)
    .then((action) => {
        if (action) {
            deletedAction = action;
            actionDB.delete(id)
            .then((deleteRes) => {
                console.log(deleteRes);
                res.status(200).json(deletedAction);
            })
        }
        else {
            res.status(404).json({error: `Action id: ${id} not found.`});
        }
    })
    .catch((error) => {
        res.status(500).json({errorMessage: `Server error of ${error} Getting action of id: ${id} during delete operation.`})
    })
})

module.exports = router;