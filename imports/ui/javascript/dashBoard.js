import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '../html/dashBoard.html';
import '../css/dashBoard.css';

Template.dashBoard.onCreated(() => {
     Meteor.subscribe('userDetails_Cur', Meteor.userId());
});

Template.dashBoard.helpers({
  isUser: function(){
    return Router.current().params.owner === Meteor.userId();
  },

  hasSubscribed: function(){
    var currFollowers = Users.find({User: Meteor.userId()}).fetch()[0].FollowingList;
  	var q = _.find(currFollowers, (x) => x == Router.current().params.owner);
  	if(q == Router.current().params.owner) {

  		return true;
  	} else {
  		return false;
  	}
  },
  whichUser: function(){
  if (Router.current().params.owner === Meteor.userId()){ //Visiting own dashboard
    return Users.find({User: Meteor.userId()});
  } else {
    return Users.find({User: Router.current().params.owner});
  }
  },

});

Template.dashBoard.events({
  'click #subscribe':function(){
    var id = Router.current().params.owner;
    //console.log(id);
    //alert('Clicked!');
    Meteor.call("toggleSubscription",id);
  },

  'click .email' : function(){

  }
});
