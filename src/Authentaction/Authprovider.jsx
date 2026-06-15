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
import { setupInterceptors } from "../Hooks/setupInterceptors";

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
          const firebaseToken = await currentUser.getIdToken();
          setupInterceptors(firebaseToken);
          
          const userdata = await loginuser(currentUser.email);

          if (isMounted) {
            setDbUser(userdata);
          }
        } catch (err) {
          console.log(err);
          if (isMounted) setDbUser(null);
        }
      } else {
        setupInterceptors(null);
        if (isMounted) setDbUser(null);
      }

      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const signup = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    setupInterceptors(token);
    return result;
  };

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    setupInterceptors(token);
    return result;
  };

  const logout = async () => {
    await signOut(auth);
    setupInterceptors(null);
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