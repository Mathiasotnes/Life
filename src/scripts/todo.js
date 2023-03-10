const firebase = require('firebase/app');
const getFirestore = require('firebase/firestore/lite');
const collection = require('firebase/firestore/lite');
const getDocs = require('firebase/firestore/lite');
const deleteDoc = require('firebase/firestore/lite');
const addDoc = require('firebase/firestore/lite');
const setDoc = require('firebase/firestore/lite');

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
const tasks = collection.collection(db, 'todo');
const counter = collection.collection(db, 'todoCounter');
renderTasks();
updateCounter(0);

function backToDashboard() {
    window.location.href = "../index.html";
  }

  
async function getTasks() { 
    const todos = getFirestore.collection(db, 'todo');
    const todosSnapshot = await getDocs.getDocs(todos);
    const todoList = todosSnapshot.docs.map(doc => doc.data());
    return todoList;
}

async function addTasks() {
    const input = document.getElementById('toDoInput');
    
    const todo = {
        task: input.value,
        done: false
    };
    await setDoc.setDoc(collection.doc(db, 'todo', todo.task), todo).then(() => {
        console.log("Added task: %s", todo.task);
        renderTasks();
    });
    input.value = "";
    
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

    /* Creating new HTML */
    todoContainer.innerHTML = "";
    todoList.forEach((todo) => {
        const todoElement = document.createElement('div');
        const todoText = document.createElement('div');
        const todoCheckbox = document.createElement('input');

        todoElement.classList.add('toDoElement');

        todoCheckbox.type = 'checkbox';
        todoCheckbox.classList.add('toDoCheckbox');

        todoText.classList.add('toDoText');
        todoText.innerText = todo.task;

        if (todoListArrayCheckedText.includes(todo.task)) {
            todoCheckbox.checked = true;
        }

        todoElement.appendChild(todoCheckbox);
        todoElement.appendChild(todoText);
        todoContainer.appendChild(todoElement);
      
    });
}

async function updateTasks() {
    /* Getting all checked tasks */
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
    
    /* Updating all checked tasks */
    var completedTasks = 0;
    todoListArrayCheckedText.forEach(async (todo) => {
        await deleteDoc.deleteDoc(collection.doc(db, "todo", todo)).then(() => {    
            console.log("Deleted task: %s", todo);
            completedTasks++;
            renderTasks();
            updateCounter(completedTasks);
        });
        
    });
    
}

/* Updating counter */
async function updateCounter(completedTasks) {
    getDocs.getDoc(collection.doc(db, 'todoCounter', 'todoCount')).then((doc) => {
        if (doc.exists()) {
            completedTasks += doc.data().count;
            console.log("new count: %s", completedTasks);
            const count = {
                count: completedTasks
            };
            setDoc.setDoc(collection.doc(db, 'todoCounter', 'todoCount'), count).then(() => {
                console.log("Updated counter: %s", count.count);
                document.getElementById('count').innerText = count.count;
                renderTasks();
            });
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

/* Pressing enter triggers addTasks() */
const input = document.getElementById("toDoInput");
input.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        addTasks();
    }
});



