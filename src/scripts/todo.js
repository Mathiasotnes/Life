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
    console.log(todoList);
    return todoList;
}

