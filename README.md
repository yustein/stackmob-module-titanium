stackmob-module-titanium
========================

stackmob module for titanium

Contributed by Tony Yustein

To use the module simply copy the files:

underscore.js
backbone.js
stackmob-js-0.9.2.js
stackmob-titanium.js

to the same folder where your app.js resides

As you can see in the example,

These 4 lines below tell your app.js to load these file
(backbone.js used is version 1.0.0 underscore.js used is 1.4.4)

_ = require("underscore");
var Backbone = require('backbone');
require('stackmob-js-0.9.2');
require('stackmob-titanium');

after this you initialize the module with:

StackMob.init({
	appName : 'stackmob_test',
	publicKey : 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
	apiVersion : 0
});

appName has to be the app you already created at StackMob
publicKey is the public key of the app that you mentioned 1 step earlier

and all the code below simply writes a blog entry, you can go and check your
StackMob dashboard to see the data entered with your app

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

Your app will not notify you in the iOS simulator because the notifications are output to
the Titanium console with Ti.API.info commands

I hope you find all this useful for your future projects :-)

Tony Yustein, Jul 2, 2013