var app = app || {};

app.TaskView = Backbone.View.extend({

	tagName: 'div',

	id:'current-task-wrapper',

	template: _.template( $('#task-template').html()),

	events: {
		'click .destroy': 'clear',
		'click .finish': 'markFinished',
		'click #cancel': 'cancelTask',
		'click #play': 'updateTime'

	},

	initialize: function() {
		// this.model = new app.Task;
		this.listenTo(this.model, 'destroy', this.remove);
		// this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	clear: function() {
		this.model.destroy();
	},

	markFinished: function() {
		this.model.set('finished', true);
	},

	cancelTask: function() {
		this.model.destroy();
	},

	updateTime: function() {
		var self = this;
		setInterval(
			(function(self) {
				return function() {
					var currentTimeLeft = $('#countdown').html();
					self.model.save({timeLeft: currentTimeLeft});
				}
		})(this), 50);
	}

})