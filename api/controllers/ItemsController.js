/**
 * ItemsController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	show_item_list: function (req, res) {
		Items.find().exec(function (err, items) {
			if (err) { return res.serverError(err); }
			for(var i = 0; i<items.length; i++){
				var item_img_arr= items[i].item_img.split(";");
				items[i].item_img = item_img_arr[0];
			}
			return res.view('shop/index', {items: items});
		});
	},
	show_item: function (req, res) {
		Items.find({id: req.params[0]}).exec(function (err, item) {
			if (err) { return res.serverError(err); }
			item[0].item_img = item[0].item_img.split(";");
			return res.view('shop/item_detail', {item: item});
		});
	},
	create: function (req, res) {
	    Items.create({
	    	item_category: '狗狗服飾系列',
	    	item_name: '小紅帽斗篷 false',
	    	item_description: '小紅帽 + 北七 Ruki',
	    	price: 600,
	    	inventory_level: 0,
	    	item_img: 'ruki_in_red_4.jpg',
	    	available: false,
	    }).exec(function (err, newUser) {
	        // If there was an error, we negotiate it.
			if (err) { return res.serverError(err); }
        });//</User.create>
    },//</UserController.signup>
	
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
	    	id: 33
	    }).exec(function (err, newUser) {
	        // If there was an error, we negotiate it.
			if (err) { return res.serverError(err); }
        });//</User.create>
    },

};

