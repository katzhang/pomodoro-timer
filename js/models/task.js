var app = app || {};

app.Task = Backbone.RelationalModel.extend({

	defaults: {
		timeLeft: null,
		finished: false,
	}
});