

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
        todo.isDone === false ? todo.isDone = true : todo.isDone = false;
        displayTodos();
    },

    delete: function (id) {
        const todos = loadTodos();
        const todo = todos.find(item => item.id === id);
        todos.splice(id,1);
        
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
    const itemEl = document.getElementById('item');
    const messageEl = document.getElementById('message');
    const itemListElement = document.getElementById('item-list');


const todo = {
    id:randomID(),
 name : itemEl.value,
    isDone: false
}
if(todo.name.length < 1){
   messageEl.innerText = "Input cannot be empty, please type in something"
   return; 
}

   const item = todoApp.create(todo);
   
   console.log(item)
}

const displayTodos = () => {
const todos = loadTodos();
const itemListElement = document.getElementById('item-list');
const todoItem = todos.map((item)=>{
    return(
        `<div class="todo-item">
<div class="item-name" key=${item.id}>${item.name}</div>
<div><a href="#" class="complete-todo" onclick="completeTodo(${item.id})"><i class="fa fa-check-circle"></i></a>
<a href="#" class="edit-todo" ><i class="fa fa-edit"></i></a>
<a href="#" class="delete-todo" onclick="deleteTodo(${item.id})"><i class="fa fa-times-circle"></i></a>
</div>
</div>`
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
}

const randomID = function() {
    const letters = "0123456789ABCDEF";
    let id = "TD";
    for (let i = 0; i < 9; i++) {
      id += letters[Math.floor(Math.random() * 16)];
    }
    return id;
  }

  displayTodos();

