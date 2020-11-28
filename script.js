const itemInput = document.getElementById('item');
const messageEl = document.getElementById('message');
const itemListElement = document.getElementById('item-list');



const todoApp = {

    create: function (todo) {
        const todoList = loadTodos();
        todoList.push(todo);
        localStorage.setItem('todos', JSON.stringify(todoList) );
       const data = loadTodos();
        return data[data.length - 1];
    },

    get: function (id) {
        const todos = loadTodos();
        const todo = todos.find(item => item.id === id);
        return todo;
    },

    getAll: function () {
        const todos = loadTodos();
        return todos;
    },

    tick: function (id) {
        const todos = loadTodos();
        const todo = todos.find(item => item.id === id);
        todo.isDone === true ? todo.isDone = false : todo.isDone = true;
localStorage.setItem("todos",JSON.stringify(todos) );   
        displayTodos();
    },

    delete: function (id) {
        console.log("delete: "+id)
        const todos = loadTodos();
        const index = todos.findIndex(item => item.id === id);
        todos.splice(index,1);
localStorage.setItem("todos",JSON.stringify(todos) );        
    } 

}





const loadTodos = () =>{

    const todos = JSON.parse(localStorage.getItem('todos'));
       //check if there are visitors 
if(!todos  || todos.length <1){
    return [];
    }
    else{
        return todos;
    }
}


const saveTodo = () => {
const todo = {
    id:randomID(),
 name : itemInput.value,
    isDone: false
}
if(todo.name.length < 1){
   messageEl.innerText = "Input cannot be empty, please type in something"

   return; 
}

   const item = todoApp.create(todo);
   const todoItem = `<div class="todo-item">
   <div class="item-name" >${item.name}</div>
   <div><a href="#" class="complete-todo" onclick="completeTodo('${ item.id}')"><i class="fa fa-check-circle"></i></a>
   <a href="#" class="edit-todo" onclick = "editTodo('${item.id}')" ><i class="fa fa-edit"></i></a>
   <a href="#" class="delete-todo" onclick="deleteTodo('${item.id}')"><i class="fa fa-times-circle"></i></a>
   </div>
   </div>` ;
   itemListElement.innerHTML= itemListElement.innerHTML + todoItem;
   itemInput.value ="";
}

const displayTodos = () => {
const todos = loadTodos();
const todoItem = todos.map((item)=>{
let visibility = '';
let strikeText = ''
if(item.isDone){
    visibility = "visibility",
    strikeText = "strike"
}
    return(
        `<div class="todo-item">
<div class="item-name ${strikeText} ${visibility}" >${item.name}</div>
<div><a href="#" class=" ${visibility}" onclick="completeTodo('${ item.id}')"><i class="fa fa-check-circle"></i></a>
<a href="#" class="edit-todo" onclick = "editTodo(this, '${item.id}')" ><i class="fa fa-edit"></i></a>
<a href="#" class="delete-todo" onclick="deleteTodo('${item.id}')"><i class="fa fa-times-circle"></i></a>
</div>
</div>
<div class = "edit-item hide">
  <div id="edit-message"></div>
  <form action="" onsubmit="return false ">
    <input type="text" value="${item.name}"  />
    <button type="submit">Edit Item</button>
  </form>
</div>
`
    )
})
itemListElement.innerHTML = todoItem.join('\n');

}

const completeTodo = (id) =>{
  
  todoApp.tick(id);  
}

const deleteTodo = (id) => {
    console.log(id);
    todoApp.delete(id);
    displayTodos();
}
// console.log(editEl);
// editEl.addEventListener('click', (e)=>{
//     e.preventDefault();
//     console.log(e.target);
// })

function editTodo (id){
el.classList.remove('hide');
}

const clearItems = ()=>{
    localStorage.removeItem("todos");
itemListElement.innerText="";
}

const randomID = function() {
    const letters = "0123456789ABCDEF";
    let id = "TD";
    for (let i = 0; i < 9; i++) {
      id += letters[Math.floor(Math.random() * 16)];
    }
    return id;
  }

  function saveInitialData() {
    const data =[
        {id: "TD01C4DF4B4", name: "Pray", isDone: false}, 
        {id: "TD06902BE9F", name: "Clean", isDone: false}, 
        {id: "TD069045E9F", name: "Do Laundry", isDone: false}, 
        {id: "TD06978BE9F", name: "Cook", isDone: false},
        {id: "TD06902B69F", name: "Eat", isDone: false},
        {id: "TD07902BE9F", name: "Code", isDone: false}
    ];
localStorage.setItem('todos', JSON.stringify(data));
const todos = JSON.parse(localStorage.getItem('todos'));
  }
  saveInitialData();

  displayTodos();

