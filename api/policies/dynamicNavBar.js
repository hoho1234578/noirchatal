module.exports = function(req, res, next) {

	// Call the service that generate the content of the navBar
  	// and inject the result in a "navBar" variable accessible in the controller's template
  	// See http://stackoverflow.com/questions/32212856/sails-js-send-data-from-partial-controller-to-partial-view
	partials.navBar(req, function(err, html) {
	    res.locals.navBar = html;
	    next();
	});

};