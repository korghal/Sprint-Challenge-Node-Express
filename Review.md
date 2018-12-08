# Review Questions

## What is Node.js?
Node.js is a runtime which interprets JavaScript and allows us to run it outside of the browser.

## Mention two parts of Express that you learned about this week.
We learned more in depth about middleware and splitting our code into routes.

## What is Middleware?
Middleware is code, an array of functions, which extends the functionality of express. This includes our own routing code and CRUD operations.

## What is a Resource?
A resource is pretty much any information which we are connecting CRUD operations to. And is a key part of the RESTful principles.

## What can the API return to help clients know if a request was successful?
Status codes and messages. Typically by using res.status(code).json(message object)

## How can we partition our application into sub-applications?
We partition our application by creating and importing routers and setting up a server.use() at the correct route.

## What is express.json() and why do we need it?
express.json() processes json sent in the req.body and allows us to access it.