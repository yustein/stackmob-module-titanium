_.extend(StackMob, {
	ajax: function(model, params, method) {
		params['beforeSend'] = function(xhr, settings) {
			xhr.setRequestHeader("Accept", settings['accepts']);
			if (!_.isEmpty(settings['headers'])) {

				for (key in settings['headers']) {
					xhr.setRequestHeader(key, settings['headers'][key]);
				}
			}
		};

		var err = params['error'];

		params['error'] = function(jqXHR, textStatus, errorThrown) {

			var data;

			if (jqXHR && (jqXHR.responseText || jqXHR.text)) {
				var result;
				try {
					result = JSON.parse(jqXHR.responseText || jqXHR.text);
				} catch (err) {
					result = {
						error : 'Invalid JSON returned.'
					};
				}
				data = result;
			}

			(function(m, d) {
				if (err)
					err(d);
			}).call(StackMob, model, data);
		}
		var success = params['success'];

		var defaultSuccess = function(response) {

			var result = response && response.responseText ? JSON.parse(response.responseText) : null;

			if (_.isFunction(params['stackmob_on' + method]))
				params['stackmob_on' + method](result);

			if (result) {

				!model.models && model.clear();

				if (StackMob.isOAuth2Mode() && (method === 'accessToken' || method === 'facebookAccessToken') && result['stackmob']) {
					//If we have "stackmob" in the response, that means we're getting stackmob data back.
					//pass the user back to the user's success callback
					result = result['stackmob']['user'];
					success(result);
				} else {
					if (params["stackmob_count"] === true) {
						success(response);
					} else if (!model.models && !model.set(result))
						return false;
					success(result);
				}
			} else
				success();

		};

		params['success'] = defaultSuccess;

		var xhr = Ti.Network.createHTTPClient({
			onload : function(e) {
				params['success'](xhr);
			},
			onerror : function(e) {
				params['error'](xhr)
			},
			timeout : 5e3
		});

		// if logging in...
		if (StackMob.isOAuth2Mode() && (method === 'accessToken' || method === 'facebookAccessToken')) {
			xhr.open(params.type, params.url + "?" + params.data);
			params['beforeSend'](xhr, params);
			return xhr.send();
		} else {
			xhr.open(params.type, params.url);
			params['beforeSend'](xhr, params);
			// if not 'GET' then post body here!!
			return xhr.send(params.type !== 'GET' ? params.data : null);
		}

	}
});

_.extend(StackMob.Storage, {
	//Use this to save things to local storage as a key/value pair.
	persist : function(key, value) {
		//If there's an HTML5 implementation of Local Storage available, then use it.  Otherwise, there's no fallback at this point in time.
		if (Titanium.App.Properties)
			Titanium.App.Properties.setString(this.STORAGE_PREFIX + key, value);
	},

	//Read a value from local storage given the `key`.
	retrieve : function(key) {
		if (Titanium.App.Properties)
			return Titanium.App.Properties.getString(this.STORAGE_PREFIX + key);
		else
			null;
	},

	//Remove a value from local storage given the `key`.
	remove : function(key) {
		if (Titanium.App.Properties)
			Titanium.App.Properties.removeProperty(this.STORAGE_PREFIX + key);
	}      
});