import { useEffect, useState } from "react";
import { Authcontext } from "./Authcontext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.init";

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const authinfo = {
    signup,
    login,
    logout,
    user,
    loading,
  };

  return (
    <Authcontext.Provider value={authinfo}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authprovider;