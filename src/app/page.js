"use client";
import Login from "./components/Login";
import Home from "./components/Home";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseApp from "@/firebase";
import Loader from "./components/Loader";

const App = () => {
  const auth = getAuth(firebaseApp);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, [auth]);

  return (
    <div>
      {isLoading ? (
        <Loader /> // Muestra una pantalla de carga mientras se verifica la autenticación
      ) : user ? (
        <Home user={user} auth={auth} />
      ) : (
        <Login auth={auth} />
      )}
    </div>
  );
};

export default App;
