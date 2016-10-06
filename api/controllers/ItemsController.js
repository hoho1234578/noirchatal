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

	// addStoreCustomer: function(req, res){
 //        Store.create({Name: 'Sari Sari Store'}).exec(function(e,r){
 //            Customer.create({Name: 'Pedro', store: r.id}).exec(function(err, result){
 //                Customer.create({Name: 'Juan', store: r.id}).exec(function(err1, res1){
 //                    return res.json({ok: 'success'});
 //                });
 //            });
 //        });
 //    },

	create: function (req, res) {
	    Items.create({
	    	// item_category: r.id,
	    	item_name: '北歐森林筆盒',
	    	item_description: '內裡鬆緊袋可固定筆，另一邊內袋可放橡皮擦、卡片等雜物。',
	    	price: 499,
	    	special_price: 399,
	    	inventory_level: 5,
	    	item_img: 'IMG_4184.JPG;IMG_4184_1.jpg;IMG_4184_2.jpg',
	    	available: true
	    }).exec(function (e, r) {
	    	Category.create({category_name: '口金', item: r.id}).exec(function(err, result){
	    		Category.create({category_name: '筆盒', item: r.id}).exec(function(err1, res1){
	    			return res.json({ok: 'success'});
	    		});
	    	});
	        // If there was an error, we negotiate it.
			if (e) { return res.serverError(e); }
        });//</User.create>
    },//</UserController.signup>


    // create: function (req, res) {
    	// console.log(req.param('item_category'));


    	// Items.create({
    	// 	item_category: req.param('item_category'),
    	// 	item_name: req.param('item_name'),
    	// 	item_description: req.param('item_description'),
    	// 	price: req.param('price'),
    	// 	special_price: req.param('special_price'),
    	// 	inventory_level: req.param('inventory_level'),
    	// 	item_img: req.param('item_img'),
    	// 	available: req.param('available')
    	// }).exec(function (err, newUser){
    	// 	if (err) { return res.serverError(err); }
    	// 	else { return newUser; }
    	// });

	  //   User.create({
	  //   	email: 'bunnyhj369@yahoo.com.tw',
	  //   	password: '123456',
	  //   	mobile: '0988249628',
	  //   	first_name: '禾',
	  //   	last_name: '何',
	  //   }).exec(function (err, newUser) {
	  //       // If there was an error, we negotiate it.
			// if (err) { return res.serverError(err); }
   //      });//</User.create>
   //  },//</UserController.signup>
	
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

