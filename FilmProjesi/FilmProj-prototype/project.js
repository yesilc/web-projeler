//projemizin ana js dosyası
const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.getElementById("director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


//UI objesini Başlatma
const ui = new UI();

//Storage Objesi 
const storage = new Storage();

//Tüm eventleri yükleme
eventListeners();
function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });

    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value.trim();
    const director = directorElement.value.trim();
    const url = urlElement.value.trim();
    console.log(title,director,url);

    if(title === "" || director ==="" || url ===""){
        //hata
        ui.displayMessages("Tüm Alanları Doldurun....","danger");
    }
    else{
        //Yeni Film
        const newFilm = new Film(title,director,url);
        ui.addFilmToUi(newFilm);
        storage.addFilmToStorage(newFilm); //Storage'a film ekleme
        ui.displayMessages("Film Başarıyla Eklendi","success");
    }

    ui.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}

function deleteFilm(e){
    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        // console.log(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme İşlemi Başarılı..","success");
    }
}

function clearAllFilms(){
    if(confirm("Emin misiniz ?"))
    {ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();}
}