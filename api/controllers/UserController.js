/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	authUsersOnly: function(req, res) {
        res.json("i have access");
    },

    user_create: function (req, res) {
        User.create({
	    	email: 'hoho1234578@gmail.com',
	    	password: '123456',
	    	mobile: '0988249628',
	    	first_name: '禾',
	    	last_name: '何',
	    }).exec(function (err, newUser) {
	        // If there was an error, we negotiate it.
			if (err) { return res.serverError(err); }
        });//</User.create>
    },
};

