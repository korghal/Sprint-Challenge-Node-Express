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
    const newAction = req.body;
    //Must contain: project_id, description, notes
    if (newAction.project_id && newAction.description && newAction.notes) {
        actionDB.insert(newAction)
        .then((info) => {
            res.status(201).json(info);
        })
        .catch((error) => {
            res.status(500).json({errorMessage: `Server had an error of: ${error} trying to post a new action.`})
        })
    }
    else {
        res.status(400).json({message: 'Posting a new action must contain fields for a project_id, description and notes'});
    }
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const updatedAction = req.body;
    actionDB.get(id)
    .then((action) => {
        if (action) {
            actionDB.update(id, updatedAction)
            .then((action) => {
                res.status(200).json(action);
            })
            .catch((error) => {
                res.status(500).json({errorMessage: `Server had an error of: ${error} trying to update action id: ${id}`})
            })
        }
        else {
            res.status(404).json({error: `Action id: ${id} not found.`});
        }
    })
    .catch((error) => {
        res.status(500).json({errorMessage: `Server had an error of: ${error} trying to get action id: ${id}`})
    })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    let deletedAction;
    actionDB.get(id)
    .then((action) => {
        if (action) {
            deletedAction = action;
            actionDB.remove(id)
            .then((deleteRes) => {
                res.status(200).json({deleteResponse: deleteRes, actionDeleted: deletedAction});
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