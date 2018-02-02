Template.list.events({
    'click .upload-excel':function (e) {
        e.preventDefault();
        document.querySelector('.upload-excel-file').click();
    },
    'click .gotoPhone':function (e) {
        Router.go('/phone/'+$(e.currentTarget).data('phoneid'));
    },
    'change .upload-excel-file':function (e) {
        e.preventDefault();
        var reader = new FileReader();

        reader.onload = function(e) {
            var workbook = XLSX.read(e.target.result, {type:"binary"});
            var worksheet = workbook.Sheets['Лист1'];
            var jsonsheet=XLSX.utils.sheet_to_json(worksheet, {blankValue:true, defval:"нет", raw:true});
            var addedCount=0;
            jsonsheet.forEach(function (row) {
                console.log(row['тел.']);
                var phone={
                    name:row['ФИО'],
                    phone:(row['тел.']+'').replace('+', '').split('').map(function (i, k) {
                        if(k==0 && i=='8'){
                            return '7';
                        }
                        if(k==0 && i=='9'){
                            return '7'+i;
                        }
                        return i;
                    }).join(''),
                    age:row['Возраст/паспорт'],
                    category:row['категория'],
                    place:row['23/12/2017 (местонахождение на момент официального старта кампании)'],
                    isVerified:row['Прошёл ли верификацию'].toLowerCase().includes('да'),
                    email:row['Почта'],
                    isReadyForOutdoorAgitation:row['Готов агитировать на улице'].toLowerCase().includes('да'),
                    comments:row['Примечания']||'нет',
                    isReadyForSupervision:row['Готов ли стать наблюдателем'].toLowerCase().includes('да'),
                    district:row['Район'],
                    doesHaveBike:row['Есть велосипед'].toLowerCase().includes('да'),
                    doesHaveAuto:row['Есть автомобиль'].toLowerCase().includes('да'),
                    isReadyForHomeAgitation:row['Готов агитировать в своём доме'].toLowerCase().includes('да')
                };
                if(Phones.find({name:phone.name, phone:phone.phone}).count==0) {
                    Phones.insert(phone);
                    addedCount++;
                }

            });
            sAlert.success('Добавлено '+addedCount+' волонтеров (в базе уже было '+(jsonsheet.length-addedCount)+')')
        };

        reader.readAsBinaryString(e.target.files[0]);
    }
});

Template.list.helpers({
    'truefalser':function (val) {
        return val.hash.param?'Да':'Нет'
    }
})