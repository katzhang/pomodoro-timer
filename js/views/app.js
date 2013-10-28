var app = app || {};

app.AppView = Backbone.View.extend({

	el: '#app',

	events: {
		'keypress #new-project-title': 'createProject',
		'click .clear-all-projects': 'clearAllProjects',
		'click .new-task': 'createTask'
	},

	initialize:function() {
		console.log('app view initialized');
		this.$pTitle = this.$('#new-project-title');
		this.$tButton = this.$('#new-task');

		this.listenTo(app.Projects, 'add', this.addProject);
		this.listenTo(app.Projects, 'reset', this.addAllProjects);
		this.listenTo(app.Projects, 'all', this.render);

		this.listenTo(app.Tasks, 'add', this.addTask);

		//nested Views?
		// this.listenTo(app.Projects, 'reset', this.render);
		this.listenTo(app.Tasks, 'all', this.render);

		app.Projects.fetch();

	},

	render: function() {
		console.log('render');

		if(app.Projects.length) {
			$('.project-list').show();
		} else {
			$('.project-list').hide();
		}

	},

	newProjectAttributes: function() {
		return {
			title: this.$pTitle.val().trim()
		}
	},

	createProject: function(e) {
        if ( event.which !== ENTER_KEY || !this.$pTitle.val().trim() ) {
        	return;
      	}
      	console.log('createProject');

      	app.Projects.create( this.newProjectAttributes());
      	this.$pTitle.val('');

	},

	destroyProject: function(project) {
		console.log('destroyProject');
		project.destroy();
	},

	clearAllProjects: function(e) {
		// e.preventDefault();
		console.log('clearAllProjects');
		var model;

		while(model = app.Projects.first()) {
			model.destroy();
		}
	},

	addProject: function(project) {
		console.log('addProject');
		var view = new app.ProjectView({model: project});
		$('.project-list').append(view.render().el);
	},

	// Add all items in the **Todos** collection at once.
	addAllProjects: function () {
		$('.project-list').html('');
		app.Projects.each(this.addProject, this);
	},

	createTask: function() {
		console.log('createTask');
		app.Tasks.create({timeLeft: 25*60*1000});
	},

	addTask: function(task) {
		console.log('addTask');
		var view = new app.TaskView({model: task});
		$('.current-task').append(view.render().el);
	},

})