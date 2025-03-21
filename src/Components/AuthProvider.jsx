import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "./Firebase/firebase.init";

export const AuthContext = createContext(null);
const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create user 
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // sign in user 
    const signInUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google login
    const signInWIthGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth, GoogleProvider)
    }

    // sign Out user 
    const singOutUser = () =>{
        setLoading(true);
        return signOut(auth);
        

    }



    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentSuer =>{
            setUser(currentSuer);
            console.log("current user",currentSuer)
            setLoading(false)
        })
        return () =>{
            unsubscribe()
        }
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        singOutUser,
        signInWIthGoogle
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
