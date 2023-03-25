//Basic error handling middleware:
//This middleware catches all errors that are thrown in the application and sends a response with an appropriate error message.

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  

//Custom error handling middleware:
//This middleware catches specific types of errors and sends a response with a custom error message.
function handleError(err, req, res, next) {
    if (err instanceof CustomError) {
      res.status(err.statusCode).send(err.message);
    } else {
      next(err);
    }
  }
  
  app.use(handleError);
  

//   Error handling middleware for async functions:
//   This middleware is used to catch errors that occur in async functions and send an appropriate response.

app.use((err, req, res, next) => {
    if (err instanceof Error) {
      console.error(err.stack);
      res.status(500).send('Something went wrong!');
    }
  });

  
//   Error handling middleware for production environment:
//   This middleware is used to catch errors that occur in production environment and send a user-friendly error message.

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Sorry, something went wrong!');
  });

  
//   Error handling middleware for invalid routes:
//   This middleware is used to catch invalid routes and send a custom error message.
app.use(function (req, res, next) {
    res.status(404).send("Sorry, we can't find that!");
  });

  
//Error handling middleware for JSON parsing:
// This middleware is used to catch errors that occur during JSON parsing and send an appropriate responseL
app.use(function (err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error(err.stack);
      res.status(400).send('Invalid JSON format');
    }
  });
  

