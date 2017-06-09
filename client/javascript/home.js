if (Meteor.isClient) {
	Meteor.subscribe('userEvents');

	Template.home.helpers({
		userEvents: function() {
			if (Session.get('done')) {
				return UserEvents.find({checked: {$ne: true}});
			} else {
				return UserEvents.find();
			}
		}
	});
}