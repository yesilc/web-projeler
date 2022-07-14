//projemizin ana js dosyası
const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.getElementById("director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");




//Tüm eventleri yükleme
eventListeners();
function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = Storage.getFilmsFromStorage();
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
        UI.displayMessages("Tüm Alanları Doldurun....","danger");
    }
    else{
        //Yeni Film
        const newFilm = new Film(title,director,url);
        UI.addFilmToUi(newFilm);
        Storage.addFilmToStorage(newFilm); //Storage'a film ekleme
        UI.displayMessages("Film Başarıyla Eklendi","success");
    }

    UI.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}

function deleteFilm(e){
    if(e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        // console.log(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("Silme İşlemi Başarılı..","success");
    }
}

function clearAllFilms(){
    if(confirm("Emin misiniz ?"))
    {UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();}
}