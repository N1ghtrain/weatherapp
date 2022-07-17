const axios = require('axios');
const cron = require("node-cron");
const mongoose = require('mongoose');
const express = require('express');
const cheerio = require('cheerio');
const dataModel = require('./model.js');


const router = express.Router(); //routing yok

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://127.0.0.1/crawlingInMySkin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB connection is set.')
});

//şimdilik her dakika çalışıyor, her dakika atacağı istek 0-9 saniyelik aralıkta rastgele seçiliyor
//isteğe göre şekillendirilebilir
cron.schedule(`${Math.floor(Math.random() * 10)} * * * * *`, () => {
    console.log("doing stuff");
    console.log("=============================================");
    axios.get('https://tr.weatherspark.com/td/95434/%C4%B0stanbul-T%C3%BCrkiye-Ortalama-Hava-Durumu-Bug%C3%BCn',
        { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36' } })
        .then(res => {

            htmlData = res.data
            const $ = cheerio.load(htmlData)
            // body_table_style kısmı içerisindeki bütün paragrafları text olarak aldım
            $('.body_table_style').each(function () {
                part = $(this).find('p').text()
            })
            //ilgili kısım başta olduğu için text'i kırptım
            partey = part.slice(0, 500)
            array = [];
            array = partey.split(" ");
            //found = array.find("°C")
            console.log(array);
            derecesizMin = (array[7].split("°C")[0] * 1);
            //console.log(derecesizMin);
            derecesizMax = (array[9].split("°C")[0] * 1);
            //console.log(derecesizMax);
            nomMin = (array[14].split("°C")[0] * 1);
            //console.log(nomMin);
            nomMax = (array[18].split("°C")[0] * 1);
            console.log(array[4])
            //console.log(nomMax);
            
            //const data = dataModel.create({min: derecesizMin,max: derecesizMax,nomMin: nomMin,nomMax: nomMax});
            //console.log(data)
            //bir promise-await yapısı içerisinde olmadığı için null değer kaçırabilir, düzenlenmesi gerek
            async function f1() {
                const data = await dataModel.create({city: array[4], min: derecesizMin, max: derecesizMax, nomMin: nomMin, nomMax: nomMax});
                console.log(data);
                return
            }
            //fonksiyonu çalıştırıyorum
            f1();
            //promise yapısı içerisine aldım
}).catch(function (error) {
    // handle error
    console.log(error);
});
})

/* cron.schedule(`15-25 ${math.random(1 - 10)} * * * *`, () => {
    console.log("repeated stuff");
}) */





