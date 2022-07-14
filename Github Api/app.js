//Elementleri seçme
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched); //son aramaları sayfa yenilendikçe storage'dan alıp arayüze yerleştirme 
}

function getData(e){
    let username = nameInput.value.trim();
    if(username === ""){
        alert("lütfen geçerli bir kullanıcı adı girin.");
    }
    else{
        github.getGithubData(username)
        // .then(response => console.log(response))
        .then(response => {
            if(response.user.message === "Not Found"){
                //Kullanıcı adı bulunamadıysa
                ui.showError("Kullanıcı Bulunamadı");
            }
            else{
                // console.log(response);
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserınfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err =>ui.showUserınfo(err));
    }


    ui.clearInput();
    e.preventDefault();
}
function clearAllSearched(){
    //Tüm aramaları temizle
    if(confirm("Emin misin?")){
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }
}
function getAllSearched(){
    //Arananları storagedan al ve UI'ye ekle
    let users = Storage.getSearchedUsersFromStorage();
    let result = "";
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`
    });

    lastUsers.innerHTML = result;
}