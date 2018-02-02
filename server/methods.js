Meteor.methods({
    'createNewUser':function (user, password) {
        return Accounts.createUser({username:user, password:password});
    }
})

