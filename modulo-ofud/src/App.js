import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom/dist";

import RegistroEstudiantes from "./components/RegistroEstudiantes";
import ConsultaEstudiantes from "./components/ConsultaEstudiantes";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <nav className="py-4 bg-gray-800">
        <ul className="container flex items-center justify-between mx-auto">
          <li>
            <Link to="/" className="text-xl font-bold text-white">Home</Link>
          </li>
          <div>
            <li>
              <Link to="/registro" className="mx-4 text-gray-300 hover:text-white">Registro</Link>
            </li>
            <li>
              <Link to="/consulta" className="mx-4 text-gray-300 hover:text-white">Consulta</Link>
            </li>
          </div>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/registro" element={<RegistroEstudiantes Tipo="INSERT" />} />
        <Route path="/registro" element={<RegistroEstudiantes Tipo="UPDATE" />} />
        <Route path="/consulta" element={<ConsultaEstudiantes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
