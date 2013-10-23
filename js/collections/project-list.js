var app = app || {};

app.TaskList = Backbone.Collection.extend({
	model: app.Task
});
