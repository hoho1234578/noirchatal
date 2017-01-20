var _ = require('lodash');

module.exports = {

    category: function(req, cb) { // You can put extra argument to pass data, e.g., category: function(req, data, cb)
        Category_association.find().exec(function (err, category) {
            if (err) { return res.serverError(err); }

            // Access to the express app to render the "menu.ejs" template
            // See http://stackoverflow.com/questions/32212856/sails-js-send-data-from-partial-controller-to-partial-view
            sails.hooks.http.app.render('shop/category', {category: category}, cb);
        }); 
    },

    getCartContent: function(req, cb) {
    	if(typeof req.cookies.cartItems == "undefined"){
    		var cookiesCart = [];
    	}else{
    		var cookiesCart = req.cookies.cartItems;
    	}

    	if(typeof req.session.user == "undefined"){
    		cb( {cookiesCart: cookiesCart} );
		}else{
			User.findOne({id: req.session.user.id}).populate('cart')
			.then(function(currentUser){
				var ItemImgs = Items.find({id: _.map(currentUser.cart, 'productNumber')}).then(function(ItemImgs){
					return ItemImgs;
				});
				return [currentUser, ItemImgs];
			})
			.spread(function(currentUser, ItemImgs){
				ItemImgs = _.keyBy(ItemImgs, 'id');
	
				currentUser.cart = _.map(currentUser.cart, function(cart) {
					cart.item_img = ItemImgs[cart.productNumber].item_img;
					cart.item_name = ItemImgs[cart.productNumber].item_name;
					if(!ItemImgs[cart.productNumber].special_price){
						cart.price = ItemImgs[cart.productNumber].price;
					}else{
						cart.price = ItemImgs[cart.productNumber].special_price;
					}
					return cart;
				});
				cb( {cookiesCart: cookiesCart, dbCart: currentUser.cart} );
			})
			.catch(function(err){
				return res.serverError(err);
			});
		}
    },

};