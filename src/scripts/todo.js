const firebase = require('firebase/app');
const getFirestore = require('firebase/firestore/lite');
const collection = require('firebase/firestore/lite');
const getDocs = require('firebase/firestore/lite');

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4PJMKD7cO4AjEtZiGJEa1YXA7EqhZjrY",
  authDomain: "todo-34270.firebaseapp.com",
  projectId: "todo-34270",
  storageBucket: "todo-34270.appspot.com",
  messagingSenderId: "963353731622",
  appId: "1:963353731622:web:572e3dd56fc78abef57ce7",
  measurementId: "G-L9CW2YK963"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore.getFirestore(firebaseApp);

function backToDashboard() {
    window.location.href = "../index.html";
  }

  
async function getTasks() { 
    const todos = getFirestore.collection(db, 'todo');
    const todosSnapshot = await getDocs.getDocs(todos);
    const todoList = todosSnapshot.docs.map(doc => doc.data());
    return todoList;
}

async function renderTasks() {
    const todoList = await getTasks();
    const todoContainer = document.getElementById('toDoList');
    

    const todoListHTML = document.getElementById('toDoList');
    const todoElements = todoListHTML.getElementsByClassName('toDoElement');
    const todoListArray = Array.from(todoElements);
    const todoListArrayChecked = todoListArray.filter((todo) => {
        return todo.getElementsByClassName('toDoCheckbox')[0].checked;
    }
    );
    const todoListArrayCheckedText = todoListArrayChecked.map((todo) => {
        return todo.getElementsByClassName('toDoText')[0].innerText;
    }
    );

    todoContainer.innerHTML = "";

    todoList.forEach((todo) => {
        if (todoListArrayCheckedText.includes(todo.task)) {
            // getFirestore.deleteDoc(todo);
            console.log(todoList);
        }
        else {
          const todoElement = document.createElement('div');
          const todoText = document.createElement('div');
          const todoCheckbox = document.createElement('input');

          todoElement.classList.add('toDoElement');

          todoCheckbox.type = 'checkbox';
          todoCheckbox.classList.add('toDoCheckbox');

          todoText.classList.add('toDoText');
          todoText.innerText = todo.task;

          todoElement.appendChild(todoCheckbox);
          todoElement.appendChild(todoText);
          todoContainer.appendChild(todoElement);
      }
    });
}

async function updateTasks() {
    const todoList = document.getElementById('toDoList');
    const todoElements = todoList.getElementsByClassName('toDoElement');
    const todoListArray = Array.from(todoElements);
    const todoListArrayChecked = todoListArray.filter((todo) => {
        return todo.getElementsByClassName('toDoCheckbox')[0].checked;
    }
    );
    const todoListArrayCheckedText = todoListArrayChecked.map((todo) => {
        return todo.getElementsByClassName('toDoText')[0].innerText;
    }
    );
    console.log(todoListArrayCheckedText);


    const todos = getFirestore.collection(db, 'todo');
    todoListArrayCheckedText.forEach((todo) => {
        console.log('-----------------');
        console.log(todo);
        console.log(getFirestore.getDoc(todos, {task: todo}));
        getFirestore.deleteDoc(todos, {task: todo});
    }
    );


    const todosSnapshot = await getDocs.getDocs(todos);
    const todoListDB = todosSnapshot.docs.map(doc => doc.data());
    console.log(todoListDB);
    todoListDB.forEach((doc) => {
        if (todoListArrayCheckedText.includes(doc.task)) {
            getFirestore.deleteDoc(doc.ref);
        }
    }
    );

}

