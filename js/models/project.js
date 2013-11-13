var app = app || {};

app.Project = Backbone.Model.extend({
	relations: [{
		type: 'HasMany',
		key: 'tasks',
		relatedModel: 'app.Tasks',
		reverseRelation: {
			key: 'project'
		}
	}],

	defaults: {
		title: 'What is this project about?',
		createdDate: null,
		finishedDate: null,
		finished: false,
		tag: 'None',
		currentTask: [],
		finishedTasks: []
	},

    // Toggle the `completed` state of this todo item.
    finish: function () {
    	if(!this.get('finished'))
            this.save({
                    finished: true
            });
    }
});