Router.route('/', {
	name: 'landing',
	template: 'landing'
});

Router.route('/aboutUs', {
  name: 'aboutUs',
  template: 'aboutUs',
  layoutTemplate: 'layout'
});

Router.route('/bulletinBoard', {
	name: 'bulletinBoard',
  template: 'bulletinBoard',
  layoutTemplate: 'layout'
});

Router.route('/myBoard', {
	name: 'myBoard',
  template: 'myBoard',
  layoutTemplate: 'layout'
});

Router.route('/messageBoard', {
	name: 'messageBoard',
  template: 'messageBoard',
  layoutTemplate: 'layout'
});

Router.route('/chatBoard', {
	name: 'chatBoard',
  template: 'chatBoard',
  layoutTemplate: 'layout'
});

Router.route('/dashBoard', {
	name: 'dashBoard',
  template: 'dashBoard',
  layoutTemplate: 'layout'
});

Router.route('/myEvents', {
	name: 'myEvents',
  template: 'myEvents',
  layoutTemplate: 'layout'
});

Router.route('/event_View/:_id', {
  name: "event_View",
  template: "event_View",
  layoutTemplate: "layout",
  data: function() {
    var selection = this.params._id;
    return Events.findOne({_id: selection});
  }
});

Router.route('/create-event', {
  name: "create-event",
  template: "eventForm_Create",
  layoutTemplate: "layout"
});

Router.route('/update-event/:_id', {
  name: "update-event",
  template: "eventForm_Update",
  layoutTemplate: "layout",
  data: function () {
    return UserEvents.findOne({_id: this.params._id});
  },
});

Router.route('/myFriends', {
  name: 'myFriends',
  template: 'myFriends',
  layoutTemplate: 'layout'
});

Router.route('/settings', {
	name: 'settings',
  template: 'settings',
  layoutTemplate: 'layout'
});