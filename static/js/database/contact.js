// Import the Firebase modules
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
  import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDyurkD5mkFM_TAi3TmLOE3boehVNtNJFY",
    authDomain: "capstone-92833.firebaseapp.com",
    databaseURL: "https://capstone-92833-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "capstone-92833",
    storageBucket: "capstone-92833.appspot.com",
    messagingSenderId: "824130896942",
    appId: "1:824130896942:web:f2cc74327abd0e9c304bbf",
    measurementId: "G-L57NFDXD3B"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  // Initialize Realtime Database
  const database = getDatabase(app);

  // Add form submission handler for contact form
  document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Reference to 'contactMessages' in your Firebase Realtime Database
    const contactRef = ref(database, "contactMessages/");

    // Create a new entry with a unique key using push()
    const newContactRef = push(contactRef);

    // Set the data to the new reference
    set(newContactRef, {
      fullName: name,
      email: email,
      message: message,
      timestamp: Date.now(), // Add timestamp for the message
    })
      .then(() => {
        alert("Message sent successfully!");
        document.getElementById("contactForm").reset(); // Reset form after submission
      })
      .catch((error) => {
        console.error("Error sending message:", error.message);
        alert(`Error: ${error.message}. Please try again.`);
      });
  });
