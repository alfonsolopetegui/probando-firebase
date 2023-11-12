"use client"
import React, { useEffect } from "react";

const Navbar = () => {


    useEffect(() => {
        if(typeof document !== undefined) {
            require('bootstrap/dist/js/bootstrap')
        }
    }, [])

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="/">
              Home
            </a>
            <a className="nav-link" href="/Form">
              Features
            </a>
            <a className="nav-link" href="#">
              Pricing
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
