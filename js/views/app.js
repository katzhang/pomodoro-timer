var app = app || {};

app.AppView = Backbone.View.extend({

	el: '#app',

	events: {
		'keypress #new-project-title': 'createProject',
		'click #new-task': 'createTask'
	},

	initialize:function() {
		this.$pTitle = this.$('#new-project-title');
		this.$tButton = this.$('#new-task');

		this.listenTo(app.Projects, 'add', this.addProject);
		this.listenTo(app.Tasks, 'add', this.addTask);

		//nested Views?
		this.listenTo(app.Projects, 'all', this.render);
		this.listenTo(app.Tasks, 'all', this.render);

	},

	createProject: function() {
      if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
        return;
      }

      app.Projects.create()


	}

})