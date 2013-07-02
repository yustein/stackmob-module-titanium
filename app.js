window = new Object();
window.location = new Object();
window.location.hostname = '';
window.location.protocol = 'http';

_ = require("underscore");
var Backbone = require('backbone');
<<<<<<< HEAD
require('stackmob-0.9.1');
require('stackmob-titanium');
=======
require('stackmob-js-0.9.2');
>>>>>>> Update after StackMob JS version 0.9.2


StackMob.init({
	appName : 'stackmob_test',
	publicKey : 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
	apiVersion : 0
});

Ti.API.info(' data ' + JSON.stringify(StackMob));


var BlogEntry = StackMob.Model.extend({ schemaName: 'blogentry' });
var entry = new BlogEntry({ message: 'hello world!999' });

entry.create({
    success: function(model) {
        Ti.API.info('Todo object is saved, todo_id: ' + model.get('todo_id') + ', title: ' + model.get('title'));
    },
    error: function(model, response) {
        Ti.API.info(response);
    }
});
