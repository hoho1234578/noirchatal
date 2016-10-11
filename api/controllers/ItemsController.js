/**
 * ItemsController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	show_new_in: function (req, res) { 
		Items.find({ where: {available: true}, limit: 4, sort: 'id DESC' }).exec(function (err, new_items) {
			if (err) { return res.serverError(err); }
			for (var i = 0; i<new_items.length; i++){
				new_items[i].item_img = new_items[i].item_img[0];
			}
		    return res.view('home/index', {
		    	new_items: new_items,
		    	scripts: [
                	'/js/home.js'
                ],
                stylesheets: [
                	'/styles/custom_home.css',
                	'/styles/custom_shop_item.css'
                ]
		    });
		});
	},
	show_item_list: function (req, res) {
		var id = req.params[0].split("+");
			Category.find({id: id}).exec(function (err, items) {
				
				var id_arr = items[0].items;
				if (items.length > 1){
					for (var i = 1; i < items.length; i++){
						id_arr = intersect(id_arr, items[i].items);
					}
				}

				Items.find({ where: {id: id_arr, available: true}, sort: 'id DESC' }).exec(function (err, items) {
					if (err) { return res.serverError(err); }
					for(var i = 0; i < items.length; i++){
						items[i].item_img = items[i].item_img[0];
					}
					return res.view('shop/index', {
						items: items,
						scripts: [
		                ],
		                stylesheets: [
		                ]
					});
				});
			});
	},
	show_item: function (req, res) {
		Items.find({id: req.params[0]}).exec(function (err, item) {
			if (err) { return res.serverError(err); }
			item = item[0];
			if (item.available == true) {
				item.item_img = item.item_img;
				return res.view('shop/item_detail', {
					item: item,
					scripts: [
		                '/js/shop.js'
		            ],
		            stylesheets: [
		            	'/styles/custom_shop_item.css',
                		'/styles/custom_shop.css'
		            ]
				});
			}else{
				return res.send('This item is not available now!');
			}
			
		});
	},

    create: function (req, res) {
    	Items.create({
    		item_name: req.param('item_name'),
    		item_description: req.param('item_description'),
    		price: req.param('price'),
    		special_price: req.param('special_price'),
    		inventory_level: req.param('inventory_level'),
    		item_img: req.param('item_img'),
    		available: req.param('available')
    	
    	// Category.create({
    	// 	category_name: req.param('category_name'),
    	// 	items: req.param('items')

    	// Category_association.create({
    	// 	parents: req.param('parents'),
    	// 	child: req.param('child')
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

// 找兩陣列交集
var intersect = function (a, b) {
	var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        if (b.indexOf(e) !== -1) return true;
    });

}
