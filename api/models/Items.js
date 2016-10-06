/**
 * Items.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
		item_name: {	//品名
		  	type: 'text',
		  	required: true
		},
		item_description: {	//商品描述
		  	type: 'text'
		},
		price: {	//價格
		  	type: 'integer',
		  	required: true
		},
		special_price: {	//特價
		  	type: 'integer'
		},
		inventory_level: {	//庫存量
		  	type: 'integer',
		  	required: true
		},
		item_img: {	//商品照片
		  	type: 'text',
		  	required: true
		},
		available: {	//是否顯示商品
		  	type: 'boolean',
		  	required: true
		},
		item_category: {	//商品分類
	  		// type: 'text',
	  		collection: 'Category',
	  		via: 'item',
	  		// required: true
		}
    }
};

