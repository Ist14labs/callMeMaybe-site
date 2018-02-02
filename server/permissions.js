Phones.allow({
    insert:function () {
        return !!Meteor.userId();
    },
    update:function () {
        return !!Meteor.userId();
    },
    remove:function () {
        return !!Meteor.userId();
    }
});

Events.allow({
    insert:function () {
        return !!Meteor.userId();
    },
    update:function () {
        return !!Meteor.userId();
    },
    remove:function () {
        return !!Meteor.userId();
    }
})