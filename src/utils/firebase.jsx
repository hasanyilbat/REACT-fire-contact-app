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
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
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
        return setInfo((info) => [...info, personalData]);
      });
    }
  });
};

export const deleteElement = (row) => {
  const db = getDatabase();
  remove(ref(db, `/${row.id}`));
};

export const updateElement = (tempId, editUsername, editNumber, editGender) => {
  update(ref(db, `/${tempId}`), {
    username: editUsername,
    phoneNumber: editNumber,
    gender: editGender,
    id: tempId,
  });
};
