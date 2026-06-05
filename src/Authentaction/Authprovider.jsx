import { useEffect, useState } from "react";
import { Authcontext } from "./Authcontext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
import { loginuser } from "../API/Users/Loginuser";

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const userdata = await loginuser(currentUser.email);

          if (isMounted) {
            setDbUser(userdata);
          }
        } catch (err) {
          console.log(err);
          if (isMounted) setDbUser(null);
        }
      } else {
        if (isMounted) setDbUser(null);
      }

      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setDbUser(null);
  };

  const authinfo = {
    signup,
    login,
    logout,
    user,
    dbUser,
    loading,
  };

  return (
    <Authcontext.Provider value={authinfo}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authprovider;