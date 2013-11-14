var app = app || {};

app.Task = Backbone.Model.extend({

	defaults: {
		project: 'Which project is this pomodoro for?',
		timeLeft: null,
		finished: false
	},

	checkTimeLeft: function() {
		var self = this;
		var intervalID = 
			setInterval(
				(function(self) {
					return function() {
						var timeLeft = self.getTimeLeft();
						if(timeLeft === '00:00:00') {
							self.save({finished: true});
							self.pushToProject();
							clearInterval(intervalID);
						} else {
							console.log('not finished yet');
						}
					}
				// this.getTimeLeft.apply(self);
			})(this), 50);
	},

	getTimeLeft: function() {
		return this.get('timeLeft');
	},

	pushToProject: function() {
		var project = app.Projects.where({title: this.get('project')})[0];
		project.get('finishedTasks').push(this.id);
		project.save();
	}
});