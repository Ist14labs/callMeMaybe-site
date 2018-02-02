let filtersMap={
    category:'Категория',
    place:'Местоположение',
    isVerified:'Верифицирован?',
    isReadyForOutdoorAgitation:'Готов к уличной агитации?',
    isReadyForSupervision:'Готов стать наблюдателем?',
    district:'Район',
    doesHaveBike:'Есть велосипед?',
    doesHaveAuto:'Есть автомобиль?',
    isReadyForHomeAgitation:'Готов к агитации в своем районе?',
}
Template.events.helpers({
    getDate:function(timestamp){
        let date=new Date(timestamp);
        return [date.getDate(), date.getMonth()+1, date.getFullYear()].join('.');
    },
    getFilters:function () {
        let resultString='';

        Object.keys(this.filter).forEach(key=>{
            resultString+='<b>'+filtersMap[key]+':</b>';
            resultString+=this.filter[key].join(',').replace('true', 'Да').replace('false', 'Нет')+';<br>'
        })
        return resultString;
    },
    getCalled:function () {
        return this.calledPhonesIDs.length;
    },
    getHeld:function () {
        return this.heldPhonesIDs.length;
    },
    getProgress:function () {
        let mongoFilterCondition={};
        Object.keys(this.filter).forEach(key=>{
            mongoFilterCondition[key]={$in:this.filter[key].map(condition=>condition=='true'?true:condition=='false'?false:condition)}
        });
        return Phones.find(mongoFilterCondition).count();
    }
})