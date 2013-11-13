var app = app || {};

app.AppView = Backbone.View.extend({

	el: '#app',

	events: {
		'keypress #new-project-title': 'createProject',
		'click .clear-all-projects': 'clearAllProjects',
		'click .project-list span': 'createTask',
		'click .mark-finished': 'markFinished'
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
		app.Projects.set(app.Projects.models);

	},

	render: function() {
		// console.log('render');

		if(app.Projects.length) {
			$('.project-list').show();
		} else {
			$('.project-list').hide();
		}

	},

	newProjectAttributes: function() {
		var currentDate = new Date;
		return {
			title: this.$pTitle.val().trim(),
			createdDate: currentDate.getTime()
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

	markFinished: function() {
		console.log('markFinished');
		$('.project-view').each(function() {
			var checkbox = $(this).find('input:checkbox');
			var projectTitle;
			var project;
			if(checkbox.is(':checked')) {
				projectTitle = $(this).find('span');
				projectTitle.addClass('finished');
				
				project = app.Projects.where({title: projectTitle.html()})[0];
				project.finish();
			}
		})
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

	createTask: function(e) {
		console.log('createTask');
		var linkedProject = e.currentTarget.innerHTML;
		var tLNumber = 10*1000;
		console.log(linkedProject);
		var newTask = app.Tasks.create({
			timeLeft: tLNumber, 
			project: linkedProject
		});
		newTask.checkTimeLeft();
		var currentProject = app.Projects.where({title: linkedProject})[0];
		currentProject.get('currentTask').push(newTask.id);
	},

	addTask: function(task) {
		console.log('addTask');
		var view = new app.TaskView({model: task});
		$('.current-task').append(view.render().el);
		setTimeout(function() {
			$.getScript('js/scripts.js');
		}, 500);
	},

})