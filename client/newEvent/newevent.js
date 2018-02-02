Template.newevent.helpers({
    'uniqueCategory':function () {
        var uniqueCategory = _.uniq(Phones.find({}, {
            sort: {category: 1}, fields: {category: true}
        }).fetch().map(function(x) {
            return x.category.toLowerCase();
        }), true);
        uniqueCategory=uniqueCategory.map(category=>category.charAt(0).toUpperCase() + category.slice(1).toLowerCase());
        return uniqueCategory;
    },
    'uniquePlace':function () {
        var uniquePlace = _.uniq(Phones.find({}, {
            sort: {place: 1}, fields: {place: true}
        }).fetch().map(function(x) {
            return x.place.toLowerCase();
        }), true);
        uniquePlace=uniquePlace.map(place=>place.charAt(0).toUpperCase() + place.slice(1).toLowerCase());
        return uniquePlace;
    },
    'uniqueDistrict':function () {
        var uniqueDistrict = _.uniq(Phones.find({}, {
            sort: {district: 1}, fields: {district: true}
        }).fetch().map(function(x) {
            return x.district.toLowerCase();
        }), true);
        uniqueDistrict=uniqueDistrict.map(district=>district.charAt(0).toUpperCase() + district.slice(1).toLowerCase());
        return uniqueDistrict;
    }
});

Template.newevent.events({
    'submit .new-event':function (e) {
        e.preventDefault();
        var filter={};
        var eventTitle='';
        $(e.target.elements).each(function(index, el){
            var currentFormElement=$(el);
            var val=currentFormElement.val();
            if(currentFormElement.attr("id") && val){
                if(currentFormElement.attr('id')!='eventName'){
                    filter[currentFormElement.attr("id")]=val;
                }
               else{
                   eventTitle=val;
                }
            }
        });
        Events.insert({
            title:eventTitle,
            createdAt:(new Date).getTime(),
            createdBy:Meteor.user().username,
            isActive:true,
            calledPhonesIDs:[],
            heldPhonesIDs:[],
            filter:filter
        }, function (err, res) {
            if(err){
                sAlert.error(err.reason);
            }
            else{
                Router.go('/events');
            }
        });

    }
});