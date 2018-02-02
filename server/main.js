Meteor.startup(() => {
    if(Meteor.users.find().count()===0){
       Accounts.createUser({
           username:'testuser',
           password:'XgGDaEwK'
       });
    }
});
