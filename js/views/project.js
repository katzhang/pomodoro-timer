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
		return this;
	}

});