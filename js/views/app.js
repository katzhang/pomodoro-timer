var app = app || {};

app.AppView = Backbone.View.extend({

	el: '#app',

	events: {
		'keypress #new-project-title': 'createProject',
		'click .clear-all-projects': 'clearAllProjects',
		'click #new-task': 'createTask'
	},

	initialize:function() {
		this.$pTitle = this.$('#new-project-title');
		this.$tButton = this.$('#new-task');

		this.listenTo(app.Projects, 'add', this.addProject);
		this.listenTo(app.Projects, 'reset', this.addAllProjects);
		this.listenTo(app.Tasks, 'add', this.addTask);

		//nested Views?
		this.listenTo(app.Projects, 'reset', this.render);
		this.listenTo(app.Tasks, 'all', this.render);

		app.Projects.fetch();

	},

	render: function() {
		console.log('from render' + app.Projects.length)
		if(app.Projects.length) {
			console.log('there are projects');
			this.$('.project-list').show();
			app.Projects.each(this.addProject, this);
		} else {
			this.$('.project-list').hide();
		}

		// app.Projects.each(this.addProject, this);

	},

	newProjectAttributes: function() {
		return {
			title: this.$pTitle.val().trim()
		}
	},

	createProject: function() {
      if ( event.which !== ENTER_KEY || !this.$pTitle.val().trim() ) {
        return;
      }

      app.Projects.create( this.newProjectAttributes());
      this.$pTitle.val('');

	},

	clearAllProjects: function() {
		console.log('clear all');
		app.Projects.reset();
		console.log(app.Projects.length);
	},

	addProject: function(project) {
		var view = new app.ProjectView({model: project});
		$('.project-list').append(view.render().el);
	},

	// Add all items in the **Todos** collection at once.
	addAll: function () {
		this.$('.project-list').html('');
		app.Projects.each(this.addProject, this);
	},

	createTask: function() {

	}

})