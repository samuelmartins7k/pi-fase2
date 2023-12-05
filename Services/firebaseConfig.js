
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDB5RfBQWTV-StAUnuEc2mNFqMbJvNozH4",
  authDomain: "my-tasks-40a7b.firebaseapp.com",
  projectId: "my-tasks-40a7b",
  storageBucket: "my-tasks-40a7b.appspot.com",
  messagingSenderId: "556150481485",
  appId: "1:556150481485:web:513594302fe57a02097204",
  measurementId: "G-427N6WXKB6"
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth };

