//JS file for to-do list project
//Developed by Rakshan A Jain, Vaidik S Prabhu and Suraj Pai K


//selectors
//Selectors are used to select HTML elements based on their tag name, id, classes, types, attributes, values of attributes. etc.,
//The querySelector() method returns the first element that matches a specified CSS selector in the document.
const todoInput=document.querySelector(".todo-input");
const todoButton=document.querySelector(".todo-button");
const todoList=document.querySelector(".todo-list");
const filterOption=document.querySelector(".filter-todo");

//Event Listner
//The addEventListener() method attaches an event handler to the specified element.
document.addEventListener("DOMContentLoaded",getTodos); // used to display contents stored in local storage upon loading the page
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Functions
function addTodo(event){
    //prevent form from submitting
    event.preventDefault(); // to remove default setting of refreshing page upon clicking refresh
    //Todo DIV
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    //create Li
    const newTodo=document.createElement("li");
    newTodo.innerText=todoInput.value; 
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    saveLocalTodos(todoInput.value);
    //check mark button
    const completedButton=document.createElement("button");
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton=document.createElement("button");
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value=""; // todo box content will be erased
}

function deleteCheck(e){
    const item=e.target;
    //delete todo
    if(item.classList[0]==='trash-btn'){
        const todo=item.parentElement;
        //animation while deleting
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove();
        });
        //todo.remove(); if you need to delete item directly
    }
    //check todo
    if(item.classList[0]==='complete-btn'){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
    }
}

// filtering out into side bars
function filterTodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all": 
                todo.style.display="flex";
                break;
                // for Complete
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex"; // if to-dos are completed
                }else{
                    todo.style.display="none"; // if to-dos of complete are empty
                }
                break;
                // for Incomplete
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display="flex"; // if to-dos are not completed
                }else{
                    todo.style.display="none"; // if to-dos of Incomplete are empty
                }
                break;
        }
    });
}

//save todo to local storage

function saveLocalTodos(todo){
    //check whether there is already todo is present
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos)); // retain contents in todo
}

function getTodos(){
    //check whether there is already todo is present
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        //to retrieve the contents in the screen upon closing and opening again 
        todos=JSON.parse(localStorage.getItem('todos')); //JavaScript Object Notation
    }

    todos.forEach(function(todo){
        //Todo DIV
        const todoDiv=document.createElement("div");
        todoDiv.classList.add("todo");
        //create Li
        const newTodo=document.createElement("li");
        newTodo.innerText=todo; // already present element
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //check mark button
        const completedButton=document.createElement("button");
        completedButton.innerHTML='<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //check trash button
        const trashButton=document.createElement("button");
        trashButton.innerHTML='<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    //check whether there is already todo is present
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1); // changes the contents of an array by removing or replacing existing elements
    localStorage.setItem("todos",JSON.stringify(todos));
}

