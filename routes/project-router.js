const express = require('express');

const projectDB = require('../data/helpers/projectModel')

const router = express.Router();

router.get('/', (req, res) => {
    projectDB.get()
    .then((projects) => {
        res.status(200).json(projects);
    })
    .catch((error) => {
        res.status(500).json({errorMessage: `Server had an error of: ${error} trying to get projects`});
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    projectDB.get(id)
    .then((project) => {
        if (project) {
            res.status(200).json(project);
        }
        else {
            res.status(404).json({error: `Project id: ${id} not found.`});
        }
    })
    .catch((error) => {
        res.status(500).json({errorMessage: `Server had an error of: ${error} trying to get a project`})
    })
})

router.get('/:id/actions', (req, res) => {
    const {id} = req.params;
    projectDB.getProjectActions(id)
    .then((actions) => {
        res.status(200).json(actions);
    })
    .catch((error) => {
        res.status(500).json({errorMessage: `Server had an error of: ${error} trying to get the actions of project id: ${id}`});
    })
})

router.post('/', (req, res) => {
    const newProject = req.body;
    // name, description fields required.
    if (newProject.name && newProject.description) {
        projectDB.insert(newProject)
        .then((project) => {
            res.status(201).json(project);
        })
        .catch((error) => {
            res.status(500).json({errorMessage: `Server had an error of: ${error} trying to post a project.`})
        })
    }
    else {
        res.status(400).json({message: 'Posting a new project must contain name and description fields.'});
    }
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const updatedProject = req.body;
    projectDB.get(id)
    .then((project) => {
        if (project) {
            projectDB.update(id, updatedProject)
            .then((project) => {
                res.status(200).json(project);
            })
            .catch((error) => {
                res.status(500).json({errorMessage: `Server had an error of: ${error} trying to modify project id: ${id}`});
            })
        }
        else {
            res.status(404).json({error: `Project id: ${id} not found.`})
        }
    })
    .catch((error) => {
        res.status(500).json({errorMessage: `Server had an error of: ${error} trying to get project id: ${id}`});
    })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    let deletedProject;
    projectDB.get(id)
    .then((project) => {
        if (project) {
            deletedProject = project;
            projectDB.remove(id)
            .then((deletedRes) => {
                res.status(200).json({deleteResponse: deletedRes, projectDeleted: deletedProject});
            })
        }
        else {
            res.status(404).json({error: `Project id ${id} not found.`});
        }
    })
    .catch((error) => {
        res.status(500).json({errorMessage: `Server had an error of: ${error} while trying to get project of id: ${id}`});
    })
})

module.exports = router;