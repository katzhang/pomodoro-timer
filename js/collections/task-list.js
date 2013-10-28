var app = app || {};

var TaskList = Backbone.Collection.extend({
	
	model: app.Task,

	localStorage: new Backbone.LocalStorage('tasks')

});

app.Tasks = new TaskList();

