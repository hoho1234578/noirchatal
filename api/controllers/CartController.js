/**
 * CartController
 *
 * @description :: Server-side logic for managing carts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');

module.exports = {
	addToCart: function (req, res) {
		// console.log(req.body);	// get POST parameters
		// console.log(req.params);	// get GET parameters
		var productNumber = req.param("productNumber");
		var amount = parseInt(req.param("amount"));

		if(typeof req.session.user === "undefined"){
			console.log("請先登入或註冊會員！");
			res.send("請先登入或註冊會員！");
			// res.cookie('ccart', { items: [1,2,3] });

			Items.findOne({ id: productNumber })
			.then(function(item){
				var abc = []
				// [{
				// 	'productNumber': 1,
				// 	'amount': 1,
				// 	'item_name': "111",
				// 	'price': 111
				// },
				// {
				// 	'productNumber': 2,
				// 	'amount': 2,
				// 	'item_name': "222",
				// 	'price': 222
				// }]
				return [abc]
			})
			.spread(function(abc){
				if(abc.length > 0){
					var isExist = _.findIndex(abc, function(o) { return o.productNumber == 3; });
					if(isExist > -1){

					}
					console.log(result);
				}else{
					console.log("result");
				}
				
			});
		}else{
			Cart.findOne({ customer: req.session.user.id, productNumber: productNumber }).exec(function(err, cart){
				if (err) { return res.serverError(err); }

				if(cart){
					Cart.update({ id: cart.id }, { amount: cart.amount+amount }).exec(function(err2, newCart){
	                    if(err2){ res.send(500,{err:"DB error"}) }
	                    else{ res.send(newCart); }
	                });
				}else{
					Cart.create({ productNumber: productNumber,  amount: amount,  customer: req.session.user }).exec(function(err2, newCart){
						if(err2){ res.send(500,{err:"DB error"}) }
	                    else{ res.send(newCart); }
					});
				}
			});
		}
	},
	throwFromCart: function (req, res) {
		// console.log(req.body);	// get POST parameters
		// console.log(req.params);	// get GET parameters
		var productNumber = req.param("productNumber");
		var amount = parseInt(req.param("amount"));

		if(typeof req.session.user === "undefined"){
			console.log("請先登入或註冊會員！");
			res.send("請先登入或註冊會員！");
		}else{
			Cart.destroy({ customer: req.session.user.id, productNumber: productNumber }).exec(function (err) {
                if (err) { return res.serverError(err); }
                return res.ok();
            });
		}
	},
};

