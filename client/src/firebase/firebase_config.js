
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5JglPLPwDXO0IAkpeneryQqmrknw5I2E",
  authDomain: "otp-auth-21235.firebaseapp.com",
  projectId: "otp-auth-21235",
  storageBucket: "otp-auth-21235.appspot.com",
  messagingSenderId: "1369006001",
  appId: "1:1369006001:web:0720c79a3da825e458e790",
  measurementId: "G-CK37XYXR2K"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
