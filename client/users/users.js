Template.users.helpers({
    'user':function () {
        return Meteor.users.find()
    },

});

Template.users.events({
    'submit .new-user':function (e) {
        e.preventDefault();
        Meteor.call('createNewUser', $('#newLogin').val(), $('#newPassword').val(), (error, result)=>{
            e.target.reset();
            if(error){
                sAlert.error('Ошибка при создании пользователя: '+error.reason);
            }
            else{
                sAlert.success('Пользователь создан');
            }
        });
    },
    'click .reset-password':function (e) {
        Meteor.call('resetPassword', $(e).data('userid'), function (err, res) {
            if(err){
                sAlert.error(err.reason);
            }
            else{
                e.target.outerHTMl='Пароль сброшен. Новый пароль:'+res;
            }
        })
    }
})