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
			// item[0].item_category = item[0].item_category.split(";");
			test(item[0].item_category);
			item[0].item_img = item[0].item_img.split(";");
			console.log("which");
			return res.view('shop/item_detail', {item: item});

		});
	},

	/***** For One to may associations *****/
	// one_to_many: function (req, res) {
 //        Items.create({
	//     	item_name: '北歐森林手提包',
	//     	item_description: '內袋設計，可放手機、鑰匙等雜物。',
	//     	price: 350,
	//     	special_price: 299,
	//     	inventory_level: 3,
	//     	item_img: 'bag.jpg;bag_1.jpg',
	//     	available: true
	//     }).exec(function (e, r) {
	//     	Category.create({category_name: '手提袋', item: r.id}).exec(function(err, result){
	//     		Category.create({category_name: '北歐森林', item: r.id}).exec(function(err1, res1){
	//     			return res.json({ok: 'success'});
	//     		});
	//     	});
	// 		if (e) { return res.serverError(e); }
 //        });

 //        Items.update({id: 1}, {item_category: [{id: 1},{id: 2},{id: 4}]}).exec(function (err, newUser) {
	//         // If there was an error, we negotiate it.
	// 		if (err) { return res.serverError(err); }
 //        });
	// },

	create: function (req, res) {
		Items.create({
			item_category: '3;4',
	    	item_name: '北歐森林手提包',
	    	item_description: '有內裡，可放手機、鑰匙等雜物。',
	    	price: 350,
	    	special_price: 299,
	    	inventory_level: 5,
	    	item_img: 'bag.jpg;bag_1.jpg',
	    	available: true
	    }).exec(function (err, newItem) {
			if (err) { return res.serverError(err); }
        });

        Category.create({category_name: '手提袋'}).exec(function (err, newItem) {
			if (err) { return res.serverError(err); }
        });
    },

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
    	// 	else { return res.ok(newUser); }
    	// });
   //  },
	
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
	console.log(a.split(";"));


}
