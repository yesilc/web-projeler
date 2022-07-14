//Elementleri Seçme

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ //Tüm Event Listenerlar
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI); //Todolar local storage'a ekleniyor fakat sayfa yenilendiğinde todolar [Todolar] bölümünde kayboluyor. Bunu çözmek için DOMContentLoaded tetiklendiğinde Todolar sayfaya eklenecek.
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
};

function clearAllTodos(){
    //arayüzden todoları temizleme;
    if(confirm("Tümünü silmek istediğinize emin misiniz?")){
        // todoList.innerHTML = ""; //Yavaş Yöntem

        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        };
        localStorage.removeItem("todos"); //local storage'dan silme
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){ //https://www.w3schools.com/jsref/jsref_indexof.asp
            //Bulamadı
            listItem.setAttribute("style","display : none !important"); //CSS özelliği eklememizi sağlıyor. | !important -> bootstrap özelliği olan d-flex, display : none'ı baskılıyor, bunu önelemek için ekliyoruz.
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    })
};

function deleteTodo(e){
    // console.log(e.target);
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove(); //li bloğunu silme | sadece arayüzden silindi local storage'den silinmedi
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent); //Todo1 etc.
        showAlert("warning","Todo silindi."); 
    }
}
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();
    
    todos.forEach(function(todo,index){ //indexi foreach metodu kendisi veriyor.
        if(todo === deletetodo){
            todos.splice(index,1); //indexten sonra kaç tane eleman silinecek | 1
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){

    const newTodo = todoInput.value.trim(); // todoInput'un içindeki değeri aldık | trim() -> baştaki ve sondaki boşlukları siler.
    //Eğer değer yazılmadan submit edilmişse
    if(newTodo === ""){
     /* <div class="alert alert-danger" role="alert">  --bootstrap 4.0'dan alerts kısmından hazır aldık--
            <strong>Success!</strong> This is a danger alert—check it out!
        </div> */
        showAlert("danger","Lütfen Bir Todo Girin"); //(type,message) | type -> danger,indo,success 
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo); //Arayüze eklediğimiz todoları local strorage'a ekleyeceğiz.
        showAlert("success","Todo başarıyla eklendi");
    }

    // addTodoToUI(newTodo); //UI arayüz

    e.preventDefault();
};

function getTodosFromStorage(){ //Storagedan Todoları Alma
    let todos;

    if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
};
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}


function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    //setTimeout
    // window.setTimeout
    setTimeout(function(){
        alert.remove();
    },1000); //1sn

    // console.log(alert);
};


//addTodoToUI -> String değerini list item olarak UI'ya ekleyecek.

function addTodoToUI(newTodo){       //Bunu neden addTodo'nun içinde yazmadık? | Büyük projelerde işlerimizi fonksiyonlara bölmek, bizim daha sonra değişiklik yapacağımız zaman işlerimizi kolaylaştıracak.
    
    /* <li class="list-group-item d-flex justify-content-between">Todo 1
            <a href = "#" class ="delete-item">
                <i class = "fa fa-remove"></i>
            </a>
        </li> Bu etiketten oluşturmaya çalışacağız*/

        //list item oluşturma
        const listItem = document.createElement("li");
        //link oluşturma
        const link = document.createElement("a");
        link.href = "#";
        link.className = "delete-item";
        link.innerHTML = "<i class = 'fa fa-remove'></i>";

        listItem.className = "list-group-item d-flex justify-content-between";

        //Text Node Ekleme

        listItem.appendChild(document.createTextNode(newTodo));    //https://www.w3schools.com/jsref/met_document_createtextnode.asp
        listItem.appendChild(link);
        //listItem'a üstteki yorum içindeki görünümü kazandırmış olduk.

        //Todo List'e List Item'ı ekleme; li etiketini ul etiketinin içine yerleştirme.
        todoList.appendChild(listItem);
        todoInput.value=""; //input'a yazdığımız değer eklendikten sonra input içinden kaldırılır.

};