var app = app || {};

var ProjectList = Backbone.Collection.extend({
	model: app.Project,

	localStorage: new Backbone.LocalStorage('projects'),

	finished: function() {
		return this.filter(function(project) {
			return project.get('finished');
		});
	},

	remaining: function() {
		return this.without.apply(this, this.completed());
	},

	nextOrder: function() {
		if( !this.length) {
			return 1;
		}
		return this.last().get('createdDate')+ 1;
	}
});

app.Projects = new ProjectList();
