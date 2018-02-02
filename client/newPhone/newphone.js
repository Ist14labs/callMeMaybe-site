Template.newphone.events({
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
        Phones.insert(obj);
        sAlert.success('Сохранено :)');
        Router.go('/list')
    }
})