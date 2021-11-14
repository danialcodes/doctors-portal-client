import { useEffect, useState } from "react";
import initializeFirebase from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, updateProfile, signOut } from "firebase/auth";
import axios from "axios";

// Initialize Firebase app
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState("");
    const auth = getAuth();

    // Providers
    const googleProvider = new GoogleAuthProvider();

    // Check User State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({});
            }
            setLoading(false);
        });
        return () => unsubscribe;
    }, []);


    // Redirect After Login 
    const redirect = (location, history) => {
        const destination = location?.state?.from || "/";
        history.replace(destination);
    }


    // User Update
    const updateUser = (updatedData) => {
        updateProfile(auth.currentUser, updatedData).then(() => {
            // 
        }).catch((error) => {
            // An error occurred
            // ...
        });
    }

    // User Registration
    const registerUser = (name, email, password, history) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const updatedData = {
                    displayName: name
                }
                // Save New user to Database
                saveUser(email, name);

                // Update User Name
                updateUser(updatedData);
                redirect("/", history);
                setAuthError("");
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setLoading(false));
    }

    // User Login
    const loginUser = (email, password, location, history) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                redirect(location, history);
                setAuthError("");
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setLoading(false));
    }

    // User Login Using Google
    const loginUserUsingGoogle = (location, history) => {
        setLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                saveUser(user.email, user.displayName);
                setAuthError("");
                redirect(location, history);

            }).catch((error) => {
                setAuthError(error.message);

            }).finally(() => setLoading(false));
    }

    // User SignOut
    const signOutUser = () => {
        signOut(auth).then(() => {
            setAuthError("");
        }).catch((error) => {
            setAuthError(error.message);
        })
            .finally(() => setLoading(false));
    }

    // Save User To MongoDB Database
    const saveUser = (email, displayName) => {
        const user = { email, displayName };
        const url = "http://localhost:5000/users";
        axios.put(url, user)
            .then(res => console.log(res.data));
    }


    return {
        loading,
        user,
        authError,
        registerUser,
        loginUser,
        loginUserUsingGoogle,
        signOutUser
    }
}

export default useFirebase;