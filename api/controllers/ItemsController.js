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
			// console.log(new_items);
			for(var i = 0; i<new_items.length; i++){
				var new_item_img_arr= new_items[i].item_img.split(";");
				new_items[i].item_img = new_item_img_arr[0];
			}
		    return res.view('home/index', {new_items: new_items});
		});
	},
	show_item_list: function (req, res) {
		Items.find({sort: 'id DESC'}).exec(function (err, items) {
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
	// create: function (req, res) {
	//     Items.create({
	//     	item_category: '手提包系列',
	//     	item_name: '北歐森林手提包',
	//     	item_description: '有內裡，可放手機、鑰匙等雜物',
	//     	price: 350,
	//     	special_price: 299,
	//     	inventory_level: 1,
	//     	item_img: 'bag.jpg;bag_1.jpg',
	//     	available: true,
	//     }).exec(function (err, newUser) {
	//         // If there was an error, we negotiate it.
	// 		if (err) { return res.serverError(err); }
 //        });//</User.create>
 //    },//</UserController.signup>
    create: function (req, res) {
	    User.create({
	    	email: 'hoho1234578@gmail.com',
	    	password: '123456',
	    	mobile: '0988249628',
	    	first_name: '禾',
	    	last_name: '何',
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
	    	id: 37
	    }).exec(function (err, newUser) {
	        // If there was an error, we negotiate it.
			if (err) { return res.serverError(err); }
        });//</User.create>
    },

};

