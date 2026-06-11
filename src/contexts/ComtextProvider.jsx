import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "./AuthComtext";

const providergoogle = new GoogleAuthProvider();

const ComtextProvider = ({ children }) => {
  const [loding, setLoding] = useState(true);
  const [user, setUser] = useState(null);

  const rigersterNow = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updetUserInfo = (userInfoUpdet) => {
    return updateProfile(auth.currentUser, userInfoUpdet);
  };

  const signUpUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userLogOut = () => {
    return signOut(auth);
  };
  const googleLogin = () => {
    return signInWithPopup(auth, providergoogle);
  };

  useEffect(() => {
    const unsubccripet = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoding(false);
    });

    return () => {
      unsubccripet();
    };
  }, []);

  const userInfo = {
    rigersterNow,
    signUpUser,
    updetUserInfo,
    loding,
    user,
    userLogOut,
    googleLogin,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default ComtextProvider;
