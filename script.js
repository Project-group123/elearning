// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABLVwJH3mYZO55eHmHmZyQsThENFUjJwc",
  authDomain: "super-52191.firebaseapp.com",
  projectId: "super-52191",
  storageBucket: "super-52191.appspot.com",
  messagingSenderId: "259209449149",
  appId: "1:2592094491 49:web:d6bcacd2dba3405446f1d4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const gitHUB = new();

const signInF = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    
      window.location.href = "dash.html";
    })
    .catch((error) => {
    
      console.log(error);
    });
};
window.signInF = signInF;

const signinEmail = () => {
  let email = maily.value;
  let password = Passpap.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert("Login sucessfully")
      window.location.href = "dash.html";
    })
    .catch((error) => {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/email-already-in-use" ||
        error.code === "auth/wrong-password"
      ) {
        alert("Check your password")
        rec.innerHTML = "Invalid email or password.";
      } else if (error.code === "auth/internal-error") {
        err.innerHTML = "Internal error occurred. Please try again later.";
      } else if (error.code === "auth/network-request-failed") {
        err.innerHTML = "Network error. Please check your internet connection.";
      } else {
        alert("Check your password or network Error")
        console.error("Unhandled error:", error);
      }

      console.log(error);

      // Hide error message after 3 seconds
      setTimeout(() => {
        err.style.display = "none";
      }, 3000);
    });
};

window.signinEmail = signinEmail;

const out = () => {
  window.location.href = "createAccount.html";
};
window.out = out;

const creaty = () => {
  let nam = yourName.value;
  let email = yourEmail.value;
  let password = yourPass.value;

  createUserWithEmailAndPassword(auth, email, password, nam)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert("Account has been sucessfully created")
      window.location.href = "Login.html";
    })
    .catch((error) => {
      let errorCode = error;
      console.log(errorCode);
      console.log(error);
      alert("Try again network Error")
      if (error == "auth/email-already-in-use") {
        rec.innerHTML = "";
      } else if (error == "")
        rec.innerHTML = "An account already exist with this email address";

      setTimeout(() => {
        rec.style.display = "none";
      }, 3000);
    });
};

window.creaty = creaty;

// document.addEventListener("DOMContentLoaded", function() {
//   let username = localStorage.getItem("username");
//   if (username) {
//     document.getElementById("usernameDisplay").textContent =  username;
//   } else {
//     document.getElementById("usernameDisplay").textContent = "Username not found";
//   }
// });
