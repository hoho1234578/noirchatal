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
			for(var i = 0; i<new_items.length; i++){
				new_items[i].item_img = new_items[i].item_img[0];
			}
		    return res.view('home/index', {new_items: new_items});
		});
	},
	show_item_list: function (req, res) {
		var id = req.params[0].split("+");
		console.log(id);
		// if (id.length == 1) {
			Category.find({id: id}).exec(function (err, items) {
				Items.find({ where: {id: items[0].items, available: true}, sort: 'id DESC' }).exec(function (err, items) {
					if (err) { return res.serverError(err); }
					for(var i = 0; i<items.length; i++){
						items[i].item_img = items[i].item_img[0];
					}
					return res.view('shop/index', {items: items});
				});
			});
		// }else if (id.length == 2) {
		// 	Category.find({id: [id[0],id[1]]}).exec(function (err, items) {
		// 		console.log("two:"+items[0].items+" and "+items[1].items);

		// 	});
		// }
		

		// Items.find({ where: {available: true}, sort: 'id DESC' }).exec(function (err, items) {
		// 	if (err) { return res.serverError(err); }
		// 	for(var i = 0; i<items.length; i++){
		// 		items[i].item_img = items[i].item_img[0];
		// 	}
		// 	return res.view('shop/index', {items: items});
		// });
	},
	show_item: function (req, res) {
		Items.find({id: req.params[0]}).exec(function (err, item) {
			if (err) { return res.serverError(err); }
			item = item[0];
			if (item.available == true) {
				item.item_img = item.item_img;
				return res.view('shop/item_detail', {item: item});
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

// var test = function (a) {
// 	console.log(a);


// }
