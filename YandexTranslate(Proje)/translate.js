//https://yandex.com/dev/translate/doc/dg/reference/translate.html
//https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20210814T084838Z.cfdaf7a313850dd7.9491397081bac43f8ed8201defac16467e795a9c&text=Nas%C4%B1ls%C4%B1n&lang=en
function Translate(word,language){  //Obje
    this.apikey = "trnsl.1.1.20210814T084838Z.cfdaf7a313850dd7.9491397081bac43f8ed8201defac16467e795a9c";
    this.word = word;
    this.language = language;

    //XHR object

    this.xhr = new XMLHttpRequest();

}

Translate.prototype.translateWord =function(callback){//callback ile bunu app.js'ye döndüreceğiz  //bunu arrow function şeklinde yazarsak hataya düşeriz. çünkü arrow function window objesini gösterecek
    //this -> Translate , arrow func. ile yazsaydık window objesini gösterecekti.

    //Ajax İşlemleri

    const endpoint = `https:translate.yandex.net/api/v1.5/tr.json/translate?key=${this.apikey}&text=${this.word}&lang=${this.language}`

    this.xhr.open("GET",endpoint);
    this.xhr.onload=()=> {
        //this normal function => xhr objesi, arrow => Translate
        if(this.xhr.status === 200){
            const json = JSON.parse(this.xhr.responseText);
            const text = json.text[0];

            callback(null,text);
            //console.log(JSON.parse(this.xhr.responseText).text[0]); //text dizi içinde dönüyor
        }
        else{
            callback("Bir Hata oluştu",null);
        }
    
    }
    this.xhr.send();

}

Translate.prototype.changeParameters = function(newWord,newLanguage){ //Çevirilecek kelimeyi ve dili sonradan değiştirdiğimiz zaman Translate objesinin içindeki word ve language değişmeyecek çünkü biz bunu sadece constructer'da değerleri atadık yani sayfamız ilk yüklendiği zaman word=Nasılsın ise bu parametre sadece Nasılsın olarak kalacak.
    this.word = newWord;
    this.language = newLanguage;
}
