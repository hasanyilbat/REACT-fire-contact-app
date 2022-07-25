import { initializeApp } from "firebase/app";

import {
  getDatabase,
  onValue,
  ref,
  remove,
  set,
  update,
} from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAINRBsEVIF2N1qougwA_VhINvZWGb7vDI",
  authDomain: "firecontactapp-35c1e.firebaseapp.com",
  databaseURL:
    "https://firecontactapp-35c1e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "firecontactapp-35c1e",
  storageBucket: "firecontactapp-35c1e.appspot.com",
  messagingSenderId: "228566323517",
  appId: "1:228566323517:web:7a076d8f7ce2d564a5b554",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// Initialize Realtime Database and get a reference to the service

export const writeUserData = (uuid, userName, phoneNumber, gender) => {
  set(ref(db, `/${uuid}`), {
    username: userName,
    phoneNumber: phoneNumber,
    gender: gender,
    id: uuid,
  });
};

export const getData = (setInfo) => {
  onValue(ref(db), (snapshot) => {
    setInfo([]);
    const data = snapshot.val();
    if (data !== null) {
      Object.values(data).map((personalData) => {
        setInfo((info) => [...info, personalData]);
      });
    }
  });
};

export const deleteElement = (row) => {
  const db = getDatabase();
  remove(ref(db, `/${row.id}`));
  console.log(row.id);
};

export const updateElement = (tempId, editUsername, editNumber, editGender) => {
  update(ref(db, `/${tempId}`), {
    username: editUsername,
    phoneNumber: editNumber,
    gender: editGender,
    id: tempId,
  });
};
