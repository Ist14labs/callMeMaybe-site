Template.phone.helpers({
    optionEnabled:function (data) {
        return (data.hash.param?'true':'false')==data.hash.placer?'selected':'';
    }
});

Template.phone.events({
    'submit .edit-phone':function (e, t) {
        e.preventDefault();

        var obj={};
        $(e.target.elements).each(function(index, el){
            var jEl=$(el);
            var val=jEl.val();
            if(jEl.attr('type')===undefined){
                val=val=='true';
            }
            obj[jEl.attr("id")]=val;
        });
        console.log(obj);
        Phones.update({_id:t.data._id}, {$set:obj});
        sAlert.success('Сохранено :)')
    }
})