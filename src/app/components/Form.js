"use client"
import { useState } from "react";
import firebaseApp from "@/firebase";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDocs,
  getDoc,
  setDoc,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

const Form = () => {
  const valorInicial = {
    nombre: "",
    cantidad: "",
    precio: "",
  };

  const [dato, setDato] = useState(valorInicial);

  const obtenerInputs = (e) => {
    const { name, value } = e.target;
    setDato({ ...dato, [name]: value });
  };

  const enviarInfo = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "productos"), {
        ...dato,
      });
      console.log('Producto creado con éxito')
      setDato(valorInicial)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-0 row justify-content-center mt-3">
      <form onSubmit={enviarInfo} className="w-50 row justify-content-center gap-1">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            name="nombre"
            value={dato.nombre}
            onChange={obtenerInputs}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Precio"
            name="precio"
            value={dato.precio}
            onChange={obtenerInputs}
            required
          />
        </div>

        <div className="form-group">    
          <input
            type="text"
            className="form-control"
            placeholder="Cantidad"
            name="cantidad"
            value={dato.cantidad}
            onChange={obtenerInputs}
            required
          />
        </div>
        <button className="btn btn-primary w-50">Enviar</button>
      </form>
    </div>
  );
};

export default Form;
