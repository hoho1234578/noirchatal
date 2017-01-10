/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// var _ = require('lodash');

module.exports = {
	// 在 policies.js 中有定義，當該 action 執行時，將觸發 dynamicNavBar 這個 action
	// (HomeController -> config/policies.js -> policies//dynamicNavBar.js -> services/partials.js)
	index: function (req, res) { 
		Items.find({ where: {available: true}, limit: 8, sort: 'id DESC' }).exec(function (err, new_items) {
			if (err) { return res.serverError(err); }
			for (var i = 0; i<new_items.length; i++){
				new_items[i].item_img = new_items[i].item_img[0];
			}

			return res.view({
			    new_items: new_items,
			    scripts: [
	            	'/js/home.js'
	            ],
	            stylesheets: [
	               	// '/styles/custom_home.css',
	               	// '/styles/custom_shop_item.css'		// 主要效果: 圖片 hover
	            ]
			});
		});
	},
};

