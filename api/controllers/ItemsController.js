/**
 * ItemsController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
    	// Items.create({
    	// 	item_name: req.param('item_name'),
    	// 	item_description: req.param('item_description'),
    	// 	price: req.param('price'),
    	// 	special_price: req.param('special_price'),
    	// 	inventory_level: req.param('inventory_level'),
    	// 	item_img: req.param('item_img'),
    	// 	available: req.param('available')
    	
    	// Category.create({
    	// 	category_name: req.param('category_name'),
    	// 	items: req.param('items')

    	Category_association.create({
    		parents_id: req.param('parents_id'),
            parents_name: req.param('parents_name'),
    		child_id: req.param('child_id'),
            child_name: req.param('child_name'),
    	}).exec(function (err, newUser){
    		if (err) { return res.serverError(err); }
    		else { return res.ok(newUser); }
    	});
    },
	
	destroy: function (req, res) {
	    Items.destroy({
	    	item_category: '口金系列'
	    }).exec(function (err, newUser) {
	        // If there was an error, we negotiate it.
			if (err) { return res.serverError(err); }
        });//</User.create>
    },//</UserController.signup>

    remove: function (req, res) {
	    Items.destroy({
	    	id: 37
	    }).exec(function (err, newUser) {
	        // If there was an error, we negotiate it.
			if (err) { return res.serverError(err); }
        });//</User.create>
    },

};