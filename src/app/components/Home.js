"use client";

import firebaseApp from "@/firebase";
import { signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const db = getFirestore(firebaseApp);

const initialProduct = {
  nombre: "",
  precio: "",
  cantidad: "",
};

export default function Home({ productos, user, auth }) {
  const [lista, setLista] = useState([]);
  const [recargar, setRecargar] = useState(false);
  const [subId, setSubId] = useState("");
  const [actualProduct, setActualProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLista(docs);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
    setRecargar(false);
  }, [recargar]);

  // console.log(lista);

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "productos", id));
    setRecargar(true);
  };

  const obtenerInputs = (e) => {
    const { name, value } = e.target;
    setActualProduct({ ...actualProduct, [name]: value });
  };

  // Función para cargar los datos del producto en el formulario.
  const cargarDatosParaEditar = (product) => {
    setSubId(product.id); // Establece el ID del producto que se está editando
    setActualProduct({
      nombre: product.nombre,
      precio: product.precio,
      cantidad: product.cantidad,
    });
  };
  const actualizarProducto = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "productos", subId); // subId contiene el ID del documento que deseas actualizar
      await setDoc(docRef, actualProduct); // actualProduct contiene los nuevos valores a actualizar
      setRecargar(true); // Esto puede ayudar a recargar la lista de productos después de la actualización.
      // También puedes limpiar el estado actualProduct si es necesario.
      setActualProduct(null);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Realiza el cierre de sesión
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <h3>Usuario logeado: {user.email}</h3>
      <h5 style={{ cursor: "pointer" }} onClick={handleLogout}>
        Log Out
      </h5>
      {error && <p className="text-danger">{error}</p>}
      <h2>Lista de productos</h2>
      {actualProduct && (
        <div className="m-0 row justify-content-center mt-3">
          <form
            onSubmit={actualizarProducto}
            className="w-50 row justify-content-center gap-1"
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="nombre"
                value={actualProduct.nombre}
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
                value={actualProduct.precio}
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
                value={actualProduct.cantidad}
                onChange={obtenerInputs}
                required
              />
            </div>
            <button className="btn btn-primary w-50">Guardar</button>
          </form>
        </div>
      )}
      <div className="d-flex flex-wrap">
        {isLoading ? (
          <Loader />
        ) : (
          lista.map((product) => {
            return (
              <div
                className="card card-body"
                style={{ width: "20rem" }}
                key={product.id}
              >
                <h5 className="card-header">{product.nombre}</h5>
                <p>${product.precio}</p>
                <p>{product.cantidad}und.</p>
                <div>
                  <button
                    className="btn btn-primary w-50"
                    onClick={() => cargarDatosParaEditar(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger w-50"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
