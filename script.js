
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
  console.log(database);
  
  // Add User
  document.getElementById('addUserBtn').addEventListener('click', function() {
    const userId = document.getElementById('userId').value;
    const username = document.getElementById('username').value || "Anonymous"; // Default to "Anonymous" if empty
    const expiryDate = document.getElementById('expiryDate').value;
    const createdAt = Date.now();
  
    if (userId && expiryDate) {
      const userData = {
        id: userId,
        name: username,
        createdAt: createdAt,
        expiredAt: new Date(expiryDate).getTime(),
        isBanned: false
      };
  
      // Store user data using userId as the key
      firebase.database().ref('users/' + userId).set(userData)
        .then(() => {
          showOutput("User added successfully!");
        })
        .catch((error) => {
          showOutput("Error adding user: " + error.message);
        });
    } else {
      showOutput("Please fill in the User ID and Expiry Date.");
    }
  });
  
  // Ban User
  document.getElementById('banUserBtn').addEventListener('click', function() {
    const banUserId = document.getElementById('banUserId').value;
  
    if (banUserId) {
      firebase.database().ref('users/' + banUserId).update({ isBanned: true })
        .then(() => {
          showOutput("User banned successfully!");
        })
        .catch((error) => {
          showOutput("Error banning user: " + error.message);
        });
    } else {
      showOutput("Please enter a User ID.");
    }
  });
  
  // Adjust Expiry Date
  document.getElementById('adjustExpiryBtn').addEventListener('click', function() {
    const adjustUserId = document.getElementById('adjustUserId').value;
    const newExpiryDate = document.getElementById('newExpiryDate').value;
  
    if (adjustUserId && newExpiryDate) {
      firebase.database().ref('users/' + adjustUserId).update({
        expiredAt: new Date(newExpiryDate).getTime()
      })
      .then(() => {
        showOutput("User expiry date adjusted successfully!");
      })
      .catch((error) => {
        showOutput("Error adjusting expiry date: " + error.message);
      });
    } else {
      showOutput("Please fill in all fields.");
    }
  });
  
  // Fetch users from Firebase and display them as cards
function fetchUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear the user list before fetching
  
    // Get users from the database
    database.ref('users').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const userId = childSnapshot.key;
        const userData = childSnapshot.val();
  
        // Create a card element
        const card = document.createElement('div');
        card.classList.add('card');
  
        // Create card content
        card.innerHTML = `
          <div class="card-title">ID: ${userId}</div>
          <div class="card-body">
            <p>Name: ${userData.username}</p>
            <p>Created At: ${new Date(userData.createdAt).toLocaleDateString()}</p>
            <p>Expiry Date: ${new Date(userData.expiredAt).toLocaleDateString()}</p>
            <p>Banned: ${userData.isBanned ? 'Yes' : 'No'}</p>
          </div>
          <div class="card-footer">
            <button class="btn-ban" onclick="banUser('${userId}')">Ban User</button>
          </div>
        `;
  
        // Append the card to the user list
        userList.appendChild(card);
      });
    });
  }
  
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
  
  // Fetch the users on page load
  fetchUsers();
  
  
  // Show output messages
  function showOutput(message) {
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = message;
  }
  