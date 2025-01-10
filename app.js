
// Your web app's Firebase configuration
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyCNeTKsDXzBKaX0yHyuD24776zwlBPgfhQ",
    authDomain: "mobile-8eb49.firebaseapp.com",
    projectId: "mobile-8eb49",
    storageBucket: "mobile-8eb49.firebasestorage.app",
    messagingSenderId: "718428952944",
    appId: "1:718428952944:web:6c46ae7649d1702a3357b5",
    measurementId: "G-NDD1PB9L48"
};

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // Setup reCAPTCHA
  const setupReCAPTCHA = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" }
    );
    recaptchaVerifier.render();
  };
  
  // Send OTP
  const sendOTP = (phoneNumber) => {
    setupReCAPTCHA();
    const appVerifier = window.recaptchaVerifier;
  
    auth.signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP sent!");
        document.getElementById("otp-section").style.display = "block";
      })
      .catch((error) => {
        console.error("Error sending OTP:", error.message);
      });
  };
  
  // Verify OTP
  const verifyOTP = (otp) => {
    window.confirmationResult.confirm(otp)
      .then((result) => {
        const user = result.user;
        console.log("User authenticated:", user);
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error.message);
      });
  };
  
  // Event Listeners
  document.getElementById("send-otp").addEventListener("click", () => {
    const phoneNumber = document.getElementById("phone-number").value;
    sendOTP(phoneNumber);
  });
  
  document.getElementById("verify-otp").addEventListener("click", () => {
    const otp = document.getElementById("otp").value;
    verifyOTP(otp);
  });
  