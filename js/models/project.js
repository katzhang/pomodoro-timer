var app = app || {};

app.Project = Backbone.RelationalModel.extend({
	relations: [{
		type: 'HasMany',
		key: 'tasks',
		relatedModel: 'Task',
		reverseRelation: {
			key: 'project'
		}
	}],

	defaults: {
		title: 'What is this project about?',
		createdDate: null,
		finishedDate: null,
		finished: false,
		tag: 'None'
	}
});