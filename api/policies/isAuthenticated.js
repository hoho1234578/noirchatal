/**
 * We determine whether the user is logged in by calling the function req.isAuthenticated. 
 * If the user is authenticated, we will move to the next existing policy (if any) 
 * until we reach our controller function; which we defined in our route. 
 * If the user is not logged in, they will be redirected to the login page.
 * You can think of policies as rules that are checked with each request.
 */
module.exports = function(req, res, next) {
   if (req.isAuthenticated()) {
        return next();
    }
    else{
        return res.redirect('/');
    }
};
