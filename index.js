const express = require('express');

const actionRouter = require('./routes/action-router');
const projectRouter = require('./routes/project-router');

const server = express();
const PORT = 4000;

server.use(express.json());
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter);

server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})