/**
 * ItemsController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	show_new_in: function (req, res) { 
		Items.find({ where: {available: true}, limit: 4, sort: 'id DESC'}).exec(function (err, new_items) {
			if (err) { return res.serverError(err); }
			for(var i = 0; i<new_items.length; i++){
				new_items[i].item_img = new_items[i].item_img[0];
			}
		    return res.view('home/index', {new_items: new_items});
		});
	},
	show_item_list: function (req, res) {
		Items.find({sort: 'id DESC'}).exec(function (err, items) {
			if (err) { return res.serverError(err); }
			for(var i = 0; i<items.length; i++){
				// var item_img_arr= items[i].item_img;
				// items[i].item_img = item_img_arr[0];
				items[i].item_img = items[i].item_img[0];
			}
			return res.view('shop/index', {items: items});
		});
	},
	show_item: function (req, res) {
		Items.find({id: req.params[0]}).exec(function (err, item) {
			if (err) { return res.serverError(err); }
			// item[0].item_category = item[0].item_category.split(";");
			// test(item[0].item_category);
			item[0].item_img = item[0].item_img;
			// console.log("which");
			return res.view('shop/item_detail', {item: item});

		});
	},

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
    		parents: req.param('parents'),
    		child: req.param('child')
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

var test = function (a) {
	console.log(a);


}
