Router.route('/', function () {
    if(!Meteor.userId()){
        this.redirect('/login');
    }
    else{
        this.redirect('/list');
    }
});

Router.route('/login', function () {
    if(Meteor.userId()){
        this.redirect('/')
    }
    else {
        console.log(123);
        this.layout('loginlayout');
        this.render('login');
    }
});

Router.route('/list', function () {
    if(!Meteor.userId()){
        this.redirect('/login');
    }
    else{
        this.layout('appLayout');
        this.wait(Meteor.subscribe('phones'));
        if (this.ready()) {
            console.log('ready!')
            this.render('list', {
                data:{
                    phones:Phones.find()
                }
            });
        } else {
            console.log('not ready!')
            window.that=this;
            this.render('loading');
        }
    }
});

Router.route('/phone/:id', function () {
    if(!Meteor.userId()){
        this.redirect('/login');
    }
    else{
        this.layout('appLayout');
        this.wait(Meteor.subscribe('phones'));
        if (this.ready()) {
            this.render('phone', {
                data: Phones.find({_id:this.params.id}).fetch()[0]

            });
        } else {
            this.render('loading');
        }
    }
});

Router.route('/newphone', function () {
    if(!Meteor.userId()){
        this.redirect('/login');
    }
    else{
        this.layout('appLayout');
        this.wait(Meteor.subscribe('phones'));
        if (this.ready()) {
            this.render('newphone');
        } else {
            this.render('loading');
        }
    }
});

Router.route('/users', function () {
    if(!Meteor.userId()){
        this.redirect('/login');
    }
    else{
        this.layout('appLayout');
        this.wait(Meteor.subscribe('users2'));
        if (this.ready()) {
            this.render('users');
        } else {
            this.render('loading');
        }
    }
});


Router.route('/newevent', function () {
    if(!Meteor.userId()){
        this.redirect('/login');
    }
    else{
        this.layout('appLayout');
        this.wait(Meteor.subscribe('phones'));
        this.wait(Meteor.subscribe('events'));
        if (this.ready()) {
            this.render('newevent');
        } else {
            this.render('loading');
        }
    }
});

Router.route('/events', function(){
    if(!Meteor.userId()){
        this.redirect('/login');
    }
    else{
        this.layout('appLayout');
        this.wait(Meteor.subscribe('phones'));
        this.wait(Meteor.subscribe('events'));
        if (this.ready()) {
            this.render('events', {
                data:{
                    event:Events.find()
                }
            });
        } else {
            this.render('loading');
        }
    }
})