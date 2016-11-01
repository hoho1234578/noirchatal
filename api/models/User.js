/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');

module.exports = {

  	attributes: {
  		email: {
            type: 'email',
            unique: true
        },
        password: {
            type: 'string',
            minLength: 6,
            required: true
        },
        mobile: {
            type: 'string',
            required: true
        },
        first_name: {
        	type: 'string',
        	required: true
        },
        last_name: {
        	type: 'string',
        	required: true
        },
        preference: { // 存取顧客收件地址、取貨超商位址等偏好資訊
        	type: 'json'
        },
        cart: {
            collection: 'cart',
            via: 'customer'
        },
        /** Most of the User.js is self explanatory, when we return our User object, 
        	the toJSON function will delete the password so it is not sent to the client. **/
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
  	},
  	/** The beforeCreate function will hash the password before persisting to our datastore.**/
  	beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    }
};

