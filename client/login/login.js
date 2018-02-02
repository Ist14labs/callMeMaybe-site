Template.login.events({
    'submit #loginform':function (e) {
        e.preventDefault();
        Meteor.loginWithPassword($(e.target).find('#login').val(), $(e.target).find('#password').val(), function(err, res){
            if(err){
                sAlert.error('Логин или пароль невалидны :(');
            }
            else{

            }
        })
    }
})