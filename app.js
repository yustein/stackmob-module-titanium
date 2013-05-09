_ = require("underscore");
var Backbone = require('backbone');
//Ti.include('2.5.3-crypto-sha1-hmac.js');
require('stackmob-0.9.1');


StackMob.init({
	appName : 'stackmob_test',
	publicKey : 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
	apiVersion : 0
});

Ti.API.info(' data ' + JSON.stringify(StackMob));


var BlogEntry = StackMob.Model.extend({ schemaName: 'blogentry' });
var entry = new BlogEntry({ message: 'hello world!999' });
entry.create();

entry.create({
    success: function(model) {
        Ti.API.info('Todo object is saved, todo_id: ' + model.get('todo_id') + ', title: ' + model.get('title'));
    },
    error: function(model, response) {
        Ti.API.info(response);
    }
});
