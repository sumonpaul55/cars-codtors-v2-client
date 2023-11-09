import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";
import Swal from "sweetalert2";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            // console.log(currentUser)
            setUser(currentUser);
            setLoading(false);
            // if exist current user then issue a token
            if (currentUser) {
                axios.post("http://localhost:5000/jwt", { email: userEmail }, { withCredentials: true })
                    .then()
            }
            else {
                axios.post("http://localhost:5000/logout", { email: userEmail }, { withCredentials: true })
                    .then(res => {
                        res.success && Swal.fire({ title: "Logged Out", icon: "success" })
                    })
                    .catch(err => {
                        Swal.fire({ title: err, icon: "error" })
                    })
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [user])
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;