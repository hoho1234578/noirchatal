/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		category_name: {	//商品分類
	  		type: 'text',
	  		// required: true,
		},
		item: {
			model: 'Items'
		}
  	}
};

