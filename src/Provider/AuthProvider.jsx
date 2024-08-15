/* eslint-disable no-useless-catch */
/* eslint-disable react/prop-types */
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);

    const googleProvider = new GoogleAuthProvider();

    const createUser = async (email, password) => {
        setLoading(true);
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const upDateProfile = (user, profile) => {
        return updateProfile(user, {
            displayName: profile.displayName,
            photoURL: profile.photoURL,
        });
    };


    const signIn = async (email, password) => {
        setLoading(true);
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const logOut = async () => {
        try {
            return await signOut(auth);
        } catch (error) {
            throw error;
        }
    };

    const googleSignIn = async () => {
        setLoading(true);
        try {
            return await signInWithPopup(auth, googleProvider);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const resetPassword = async (email) => {
        try {
            return await sendPasswordResetEmail(auth, email);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }, []);

    const authInfo = { user,setUser, createUser, signIn, logOut, googleSignIn, resetPassword, loading, upDateProfile, setReload }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
