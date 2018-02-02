Meteor.publish('phones', function () {
    return this.userId?Phones.find():Phones.find({_id:'UnexisingID'});
});
Meteor.publish('events', function () {
    return this.userId?Events.find():Events.find({_id:'UnexisingID'});
});
Meteor.publish('users2', function usersPublication(){
    console.log("Trying to publish: " + Meteor.users.find().count() + " users");
    return this.userId?Meteor.users.find({}):Meteor.users.find({_id:'UnexistingID'});
});