module.exports = function(req, res, next) {

	// Call the service that generate the content of the menu
  	// and inject the result in a "category" variable accessible in the controller's template
  	// See http://stackoverflow.com/questions/32212856/sails-js-send-data-from-partial-controller-to-partial-view
	partials.category(req, function(err, html) {
	    res.locals.category = html;
	    next();
	});

};