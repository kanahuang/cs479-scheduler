import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect} from 'react';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyATHC6qhmL7yiPcmcWLs5SEQShfBRdE3TY",
  authDomain: "scheduler-479.firebaseapp.com",
  databaseURL: "https://scheduler-479-default-rtdb.firebaseio.com",
  projectId: "scheduler-479",
  storageBucket: "scheduler-479.appspot.com",
  messagingSenderId: "840740918394",
  appId: "1:840740918394:web:95c257a1f5fb70414fd7c3",
  measurementId: "G-HDL74FM6JP"
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const setData = (path, value) => {
  console.log(path)
  set(ref(database, path), value)
  console.log(database)
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));
export { firebaseSignOut as signOut };

export const useUserState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onIdTokenChanged(getAuth(firebase), setUser);
  }, []);

  return [user];
};

//export const useUserState = () => useAuthState(firebase.auth());

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
      
    useEffect(() => {
        const dbRef = ref(database, path);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (devMode) { console.log(`loading ${path}`); }
            return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
        if (devMode) { console.log(val); }
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
          }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
          });
        }, [path, transform]);
      
        return [data, loading, error];
    };