/**
 * CartController
 *
 * @description :: Server-side logic for managing carts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addToCart: function (req, res) {
		// console.log(req.body);	// get POST parameters
		// console.log(req.params);	// get GET parameters
		var productNumber = req.param("productNumber");
		var amount = parseInt(req.param("amount"));

		if(typeof req.session.user === "undefined"){
			console.log("請先登入或註冊會員！");
			res.send("請先登入或註冊會員！");
		}else{
			Cart.findOne({ customer: req.session.user.id, productNumber: productNumber }).exec(function(err, cart){
				if (err) { return res.serverError(err); }

				if(cart){
					Cart.update({ id: cart.id }, { amount: cart.amount+amount }).exec(function(err2, newCart){
	                    if(err2){ res.send(500,{err:"DB error"}) }
	                    else{ res.send(newCart); }
	                });
				}else{
					Cart.create({ productNumber: productNumber,  amount: 1,  customer: req.session.user }).exec(function(err2, newCart){
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

