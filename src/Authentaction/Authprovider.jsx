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

  

  const singinwithemail = (email, password) => {
    const singinwihtemailandpassword = createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return singinwihtemailandpassword;
  };



  const loginwithemail = (email, password) => {
    const loginwithemailandpassword = signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return loginwithemailandpassword;
  };

  const logout = () => {
    return signOut(auth);
  };


  const authinfo = {
    singinwithemail,
    loginwithemail,
    logout,
    user,
    loading,
  };

  return <Authcontext value={authinfo}>{children}</Authcontext>;
};

export default Authprovider;
