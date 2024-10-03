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

// Fetch users from Firebase and display them as cards
function fetchUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear the user list before fetching

    database.ref('users').once('value', (snapshot) => {

        const userRow = document.createElement('div');
        userRow.classList.add('row', 'g-3'); // Bootstrap row with gutter

        snapshot.forEach((childSnapshot) => {
            const userId = childSnapshot.key;
            const userData = childSnapshot.val();

            // Create a user card
            const userCard = document.createElement('div');
            userCard.classList.add('card', 'col-lg-3', 'col-md-4', 'col-sm-6', 'shadow-sm'); // Responsive card

            // Add color based on user status
            if (userData.isPro) {
                userCard.style.borderLeft = '5px solid green'; // Pro users
            }
            if (userData.isBanned) {
                userCard.style.borderLeft = '5px solid red'; // Banned users
            }

            // Create card content (e.g., name, email)
            const userCardBody = `
                <div class="card-body">
                    <h5 class="card-title text-primary">${userData.name}</h5>
                    <p><strong>ID:</strong> ${userId}</p>
                    <p><strong>Created At:</strong> ${new Date(userData.createdAt).toLocaleDateString()}</p>
                    <p><strong>Expiry Date:</strong> ${new Date(userData.expiredAt).toLocaleDateString()}</p>
                    <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch"   id="flexSwitchCheckDefault" ${userData.isPro ? 'checked' : ''}>
                    <label class="form-check-label" for="flexSwitchCheckDefault" >Pro user</label>
                    </div>
                    <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch"   id="flexSwitchCheckDefault" ${userData.isBanned ? 'checked' : ''}>
                    <label class="form-check-label" for="flexSwitchCheckDefault" >Banned User</label>
                    </div>
             
                </div>
            `;

            // Insert the content into the card
            userCard.innerHTML = userCardBody;

            // Append the card to the row
            userRow.appendChild(userCard);
        });

        // Append the row to the userList
        userList.appendChild(userRow);
    });
}

  fetchUsers();

  // Function to ban a user
  function banUser(userId) {
    if (confirm(`Are you sure you want to ban user ${userId}?`)) {
      database.ref('users/' + userId).update({
        isBanned: true
      }).then(() => {
        alert(`User ${userId} has been banned.`);
        fetchUsers(); // Refresh the user list after banning
      }).catch((error) => {
        console.error("Error banning user: ", error);
      });
    }
  }