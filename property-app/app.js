// app.js
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc
} from "./firebase.js";

/* ----------------------------
   USER REGISTRATION
------------------------------*/
async function registerUser() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      name,
      email,
      userType: "user",
      createdAt: new Date()
    });

    alert("Registration successful! Verify your email before login.");
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
}

/* ----------------------------
   EMAIL LOGIN
------------------------------*/
async function loginUser() {
  let email = document.getElementById("login_email").value;
  let password = document.getElementById("login_password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(error.message);
  }
}

/* ----------------------------
   OTP LOGIN (Phone Auth)
------------------------------*/
window.setupRecaptcha = function () {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    size: "invisible"
  });
};

window.sendOTP = async function () {
  let phone = document.getElementById("phone").value;

  setupRecaptcha();

  const appVerifier = window.recaptchaVerifier;

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
    window.confirmOTP = confirmationResult;
    alert("OTP sent!");
  } catch (error) {
    alert(error.message);
  }
};

window.verifyOTP = async function () {
  let otp = document.getElementById("otp").value;
  try {
    await window.confirmOTP.confirm(otp);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Incorrect OTP!");
  }
};

/* ----------------------------
   ADD PROPERTY
------------------------------*/
window.addProperty = async function () {
  let name = document.getElementById("property_name").value;
  let destination = document.getElementById("destination").value;
  let imageURL = document.getElementById("image").value;
  let lat = document.getElementById("lat").value;
  let lng = document.getElementById("lng").value;

  try {
    await addDoc(collection(db, "properties"), {
      name,
      destination,
      image: imageURL,
      lat,
      lng,
      createdAt: new Date()
    });

    alert("Property added successfully!");
  } catch (error) {
    alert(error.message);
  }
};

/* ----------------------------
   LOAD PROPERTIES IN DASHBOARD
------------------------------*/
window.loadProperties = async function () {
  let container = document.getElementById("propertyList");
  container.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "properties"));

  querySnapshot.forEach((doc) => {
    let item = doc.data();
    container.innerHTML += `
      <div class="p-4 bg-gray-800 text-white rounded-xl shadow mb-3">
        <h2 class="font-bold text-lg">${item.name}</h2>
        <p>Destination: ${item.destination}</p>
        <p>Lat: ${item.lat} | Lng: ${item.lng}</p>
      </div>
    `;
  });
};

/* ----------------------------
   LOGOUT
------------------------------*/
window.logoutUser = async function () {
  await signOut(auth);
  window.location.href = "index.html";
};
