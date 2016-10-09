module.exports = {

    category: function(req, cb) { // You can put extra argument to pass data, e.g., category: function(req, data, cb)
        Category_association.find().exec(function (err, category) {
            if (err) { return res.serverError(err); }

            // Access to the express app to render the "menu.ejs" template
            // See http://stackoverflow.com/questions/32212856/sails-js-send-data-from-partial-controller-to-partial-view
            sails.hooks.http.app.render('shop/category', {category: category}, cb);
        }); 
    }

};