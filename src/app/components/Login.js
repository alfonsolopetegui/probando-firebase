import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Importa la función de inicio de sesión de Firebase

const Login = ({ auth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      await signInWithEmailAndPassword(auth, email, password); // Realiza el inicio de sesión
      console.log('inicio de sesión exitosa')
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="m-0 row justify-content-center mt-3">
      <form onSubmit={handleLogin} className="w-50 row justify-content-center gap-1">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-50" type="submit">Log in</button>
      </form>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default Login;
