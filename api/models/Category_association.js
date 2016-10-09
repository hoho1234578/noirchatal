/**
 * Category_association.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		parents_id: {
	  		type: 'integer',
	  		required: true,
		},
		parents_name: {
	  		type: 'string',
	  		required: true,
		},
		child_id: {
	  		type: 'integer'
		},
		child_name: {
			type: 'string'
		}
  	}
};

