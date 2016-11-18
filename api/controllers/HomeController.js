/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) { 
		Items.find({ where: {available: true}, limit: 4, sort: 'id DESC' }).exec(function (err, new_items) {
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

