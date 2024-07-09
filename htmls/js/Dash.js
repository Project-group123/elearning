import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABLVwJH3mYZO55eHmHmZyQsThENFUjJwc",
  authDomain: "super-52191.firebaseapp.com",
  projectId: "super-52191",
  storageBucket: "super-52191.appspot.com",
  messagingSenderId: "259209449149",
  appId: "1:259209449149:web:d6bcacd2dba3405446f1d4",
  databaseURL: "https://super-52191-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    let maily = user.email;
    let displayName = user.displayName;
    let imago = user.photoURL;

    if (displayName) {
      dip.innerHTML = `
        <div class="flex-us" style="display: flex; justify-content: center; align-items: center; font-size:14px; color:black; gap:20px;">
          <h2 class="disall">${displayName}</h2>
          <img src="${imago}" class="pain">
        </div>`;
    } else {
      dip.innerHTML = `
        <div class="flex-us" style="display: flex; justify-content: center; align-items: center; font-size:14px; color:black; gap:20px;">
          <h2 class="disall" style="font-size: 11px;">${maily}</h2>
        </div>`;
    }
  } else {
    window.location.href = 'Login.html';
  }
});

const signO = () => {
  signOut(auth)
    .then(() => {
      dip.innerHTML = "Sign-out successful";
      window.location.href = "Login.html";
    })
    .catch((error) => {
      console.error("Sign out error:", error);
    });
};
window.signO = signO;

const displayChat = document.getElementById('displayChat');
const scrollToBottom = () => {
  displayChat.scrollBottom = displayChat.scrollHeight;
};

const submitData = () => {
  let date = new Date().toLocaleDateString();
  let time = new Date().toLocaleTimeString();
  let chatHr = chatH.value;
  onAuthStateChanged(auth, (user) => {
    let userName = user.displayName;
    let photo = user.photoURL;
    let email = user.email;
    if (chatHr.trim() !== "") {
      if (userName != null && photo != null) {
        chatH.value = "";
        let chatObj = {
          photo,
          userName,
          chatHr,
          date,
          time,
        };
        let dbRef = ref(database, `chatMessages`);
        set(dbRef, chatObj);
      } else {
        chatH.value = "";
        let chatObj = {
          email,
          chatHr,
          date,
          time,
        };
        let dbRef = ref(database, `chatMessages`);
        set(dbRef, chatObj);
      }
    }
  });
  scrollToBottom();
};
window.submitData = submitData;

const chatRef = ref(database, 'chatMessages');
onValue(chatRef, (snapshot) => {
  const chatMessages = snapshot.val();
  console.log(chatMessages);
  onAuthStateChanged(auth, (user) => {
    console.log(user.displayName);
    const currentUser = user.displayName;
    const currentEmail = user.email;
    if (chatMessages.userName === currentUser) {
      // Display current user's message on the right
      displayChat.innerHTML += `
        <div class="left">
          <div class="box">
            <p class="">${chatMessages.userName}</p>
            <p>${chatMessages.chatHr}</p>
            <small class="float-end fw-bold time">${chatMessages.time}</small>
            <img src=${chatMessages.photo} style="border-radius: 100%;"  class="minus1" title="profile picture"/>  
          </div>
        </div>
      `;
    } else if (chatMessages.email == currentEmail) {
      displayChat.innerHTML += `
        <div class="w75 w-100 float-end">
          <div class="bgprimary text-white w-75 float-end p-2 mb-2 rounded-3 bubble">
            <p class="text-white fw-bold w-100 nameing">${chatMessages.email}</p>
            <p>${chatMessages.chatHr}</p>
            <small class="float-end fw-bold">${chatMessages.time}</small>
          </div>
        </div>
      `;
    } else if (chatMessages.userName == undefined) {
      // Display other users' messages on the left
      displayChat.innerHTML += `
        <div class="w75 w-100 float-start">
          <div class="bg-light text-black w-75 float-start p-2 mb-2 rounded-3 bubble bgprimary1">
            <p class="text-danger fw-bold w-100">${chatMessages.email}</p>
            <p>${chatMessages.chatHr}</p>
            <small class="float-start fw-bold text-black">${chatMessages.time}</small>
            <img src=${chatMessages.photo} style="border-radius: 100%;"  class="minus2" title="profile picture"/>  
          </div>
        </div>
      `;
    } else {
      // Display other users' messages on the left
      displayChat.innerHTML += `
        <div class="w75 w-75 float-start">
          <div class="bg-light text-black w-75 float-start p-2 mb-2 rounded-3 bubble bgprimary1">
            <p class="text-danger fw-bold w-100">${chatMessages.userName}</p>
            <p>${chatMessages.chatHr}</p>
            <small class="float-start fw-bold text-black">${chatMessages.time}</small>
            <img src=${chatMessages.photo} style="border-radius: 100%;"  class="minus2" title="profile picture"/>  
          </div>
        </div>
      `;
    }
  });
});
