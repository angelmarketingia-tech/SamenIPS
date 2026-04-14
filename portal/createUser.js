import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAh06JxdZtUSVZgqupnX4K3YZ3M8070xrY",
  authDomain: "samen-ips-portal-2026.firebaseapp.com",
  projectId: "samen-ips-portal-2026"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

createUserWithEmailAndPassword(auth, "admin@samenips.com", "Samen2026Admin")
  .then((userCredential) => {
    console.log("User created successfully:", userCredential.user.uid);
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error creating user:", error.message);
    process.exit(1);
  });
