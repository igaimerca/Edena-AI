import { initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD-oTiKfew40pT0KN0emI0_8yNcgpGAirM",
  authDomain: "edena-ai.firebaseapp.com",
  projectId: "edena-ai",
  storageBucket: "edena-ai.firebasestorage.app",
  messagingSenderId: "25613857136",
  appId: "1:25613857136:web:8b2288d9d7c8def06b5fb5",
  measurementId: "G-5VFJDH5S03"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);

export { auth };
