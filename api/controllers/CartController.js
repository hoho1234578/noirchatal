/**
 * CartController
 *
 * @description :: Server-side logic for managing carts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');
var fs = require('fs');
var ejs = require('ejs');

module.exports = {
	addToCart: function (req, res) {
		// console.log(req.body);	// get POST parameters
		// console.log(req.params);	// get GET parameters
		var productNumber = req.param("productNumber");
		var amount = parseInt(req.param("amount"));

		fs.readFile('./views/partials/cartItem.ejs', 'utf8', function (errReadFile, data) {
			if (errReadFile) { return console.log(errReadFile); }
			else{
				Items.findOne({ id: productNumber }).exec(function(errFindItem, item){
					if (errFindItem) { return res.serverError(errFindItem); }
					else{
						var price;
						if(!item.special_price){
							price = item.price;
						}else{
							price = item.special_price;
						}

						if(typeof req.session.user === "undefined"){
							var castratedItem = {
								'item_name': item.item_name,
								'price': price,
								'item_img': item.item_img,
								'productNumber': item.id,
								'amount': amount
							}

							if(typeof req.cookies.cartItems != "undefined" ){
								var indexOfItem = _.findIndex(req.cookies.cartItems, function(o) { return o.productNumber == productNumber; });
								if(indexOfItem > -1){ // update item
									result = _.update(req.cookies, 'cartItems['+indexOfItem+'].amount', function(n) { return n + amount; }).cartItems;
									res.cookie('cartItems', result);
									res.ok({type: "update", data: ejs.render(data, {eachItem: result[indexOfItem]})});
								}else{ // no item
									res.cookie('cartItems', _.concat(req.cookies.cartItems, castratedItem));
									res.ok({type: 'create', data: ejs.render(data, {eachItem: castratedItem})});
								}
							}else{ // empty cart
								res.cookie('cartItems', [castratedItem]);
								res.ok({type: 'create', data: ejs.render(data, {eachItem: castratedItem})});
							}
						}else{
							Cart.findOne({ customer: req.session.user.id, productNumber: productNumber }).exec(function(errFindCart, cart){
								if (errFindCart) { return res.serverError(errFindCart); }
					            else{
									if(cart){ // update
										Cart.update({ id: cart.id }, { amount: cart.amount+amount }).exec(function(errUpdateCart, newCart){
							                if(errUpdateCart){ res.send(500,{err:"DB error"}) }
							                else{
							                	var castratedItem = {
													'item_name': item.item_name,
													'price': price,
													'item_img': item.item_img,
													'productNumber': item.id,
													'amount': cart.amount+amount
												}
							                   	res.ok({type: 'update', data: ejs.render(data, {eachItem: castratedItem})});
							                }
							            });
									}else{	// create
										Cart.create({ productNumber: productNumber,  amount: amount,  customer: req.session.user }).populate('productNumber').exec(function(errCreateCart, newCart){
											if(errCreateCart){ res.send(500,{err:"DB error"}) }
							                else{
							                	var castratedItem = {
													'item_name': item.item_name,
													'price': price,
													'item_img': item.item_img,
													'productNumber': item.id,
													'amount': amount
												}
									            res.ok({type: 'create', data: ejs.render(data, {eachItem: castratedItem})});  
							                }
										});
									}
								}
							});
						}
					}
				});
			}
		});
	},
	throwFromCart: function (req, res) {
		// console.log(req.body);	// get POST parameters
		// console.log(req.params);	// get GET parameters
		var productNumber = req.param("productNumber");
		var amount = parseInt(req.param("amount"));

		if(typeof req.session.user === "undefined"){
			// console.log("請先登入或註冊會員！");
			// res.send("請先登入或註冊會員！");
			var result = _.remove(req.cookies.cartItems, function(o){
				return o.productNumber != productNumber;
			});
			res.cookie('cartItems', result);
		}else{
			Cart.destroy({ customer: req.session.user.id, productNumber: productNumber }).exec(function (err) {
                if (err) { return res.serverError(err); }
            });
		}
		return res.ok();
	},
};

