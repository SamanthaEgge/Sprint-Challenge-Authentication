/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (request, response, next) => {
  if (request.session && request.session.loggedIn) {
    next()
  } else {
    response.status(401).json({ you: 'shall not pass!' });
  }
};
