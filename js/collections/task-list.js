var app = app || {};

app.Task,List = Backbone.Collection.extend({
	model: app.Task,

	localStorage: new Backbone.LocalStorage('tasks'),

});
