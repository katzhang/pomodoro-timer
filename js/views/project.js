var app = app || {};

app.ProjectView = Backbone.View.extend({

	tagName: 'li',

	template: _.template( $('#project-template').html()),

	events: {

	},

	initialize: function() {

		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		if(this.model.get('finished') === true) {
			this.$('span').addClass('finished');
		}
		return this;
	}

});

// app.ProjectListView = Backbone.View.extend({

// 	tagName: 'ul',

// 	className: 'project-list',

// 	initialize: function() {
// 		var self = this;
// 		this.listenTo(this.model, 'reset', this.render);
// 		this.listenTo(this.model, 'add', function(project) {
// 			self.$el.append(new app.ProjectView({model: project}).render().el);
// 		})
// 	},

// 	render: function() {
// 		this.$el.empty();
// 		_.each(this.model.models, function(project) {
// 			this.$el.append(new app.ProjectView({model: project}).render().el);
// 		});
// 	}
// })