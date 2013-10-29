var app = app || {};

app.Task = Backbone.RelationalModel.extend({

	defaults: {
		project: 'Which project is this pomodoro for?',
		timeLeft: null,
		finished: false
	}
});