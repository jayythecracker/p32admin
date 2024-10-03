// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAIU5jUkQ06tAvROkZg6mgrHCyO1fY6sAo",
    authDomain: "p32pos-16de3.firebaseapp.com",
    databaseURL: "https://p32pos-16de3-default-rtdb.firebaseio.com",
    projectId: "p32pos-16de3",
    storageBucket: "p32pos-16de3.appspot.com",
    messagingSenderId: "229442513263",
    appId: "1:229442513263:web:5843ae184f45c8d4f9609a",
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
 
  function showAddUser(){
    var  addform=  document.getElementById('add-user');
    var usersform = document.getElementById('user-list');
  addform.classList.remove('visually-hidden');
  usersform.classList.add('visually-hidden');
  }
  function hideAddUser(){
    var addform=  document.getElementById('add-user');
    var usersform = document.getElementById('user-list');
    addform.classList.add('visually-hidden');
    usersform.classList.remove('visually-hidden');
  }