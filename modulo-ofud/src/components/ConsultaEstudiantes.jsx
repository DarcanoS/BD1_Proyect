import React, { useState, useEffect } from "react";
import axios from "axios";

function ConsultaEstudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);

    useEffect(() => {
        setEstudiantes([{
            documento: 10000000000000,
            nombre: "Stivel",
            apellido: "Pinilla",
            fechaNacimiento: "27/02/2001",
            proyectoCurricular: "Ingeniería de Sistemas",
            codigo: 20191020024,
            tipoDocumento: "CC",
            correoPersonal: "yo@mi.com",
            correoInstitucional: "yo@mi.com",
            celular: 30000000000000000001
        }, {
            documento: 10000000000000,
            nombre: "Stivel",
            apellido: "Pinilla",
            fechaNacimiento: "27/02/2001",
            proyectoCurricular: "Ingeniería de Sistemas",
            codigo: 20191020024,
            tipoDocumento: "CC",
            correoPersonal: "yo@mi.com",
            correoInstitucional: "yo@mi.com",
            celular: 30000000000000000001
        }])
        /*axios.get("https://example.com/api/estudiantes").then((response) => {
          setEstudiantes(response.data);
        });*/
    }, []);

    return (
        <div className="flex flex-col">
            <h1 className="self-center my-10 mb-4 text-2xl font-bold">Consulta de Estudiantes</h1>
            <table className="w-full mx-2 table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Apellido</th>
                        <th className="px-4 py-2">Fecha de Nacimiento</th>
                        <th className="px-4 py-2">Proyecto Curricular</th>
                        <th className="px-4 py-2">Código</th>
                        <th className="px-4 py-2">Documento</th>
                        <th className="px-4 py-2">Tipo de Documento</th>
                        <th className="px-4 py-2">Correo Personal</th>
                        <th className="px-4 py-2">Correo Institucional</th>
                        <th className="px-4 py-2">Celular</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantes.map((estudiante) => (<tr key={estudiante.documento}>
                        <td className="px-4 py-2 border">{estudiante.nombre}</td>
                        <td className="px-4 py-2 border">{estudiante.apellido}</td>
                        <td className="px-4 py-2 border">
                            {estudiante.fechaNacimiento}
                        </td>
                        <td className="px-4 py-2 border">
                            {estudiante.proyectoCurricular}
                        </td>
                        <td className="px-4 py-2 border">{estudiante.codigo}</td>
                        <td className="px-4 py-2 border">{estudiante.documento}</td>
                        <td className="px-4 py-2 border">{estudiante.tipoDocumento}</td>
                        <td className="px-4 py-2 border">{estudiante.correoPersonal}</td>
                        <td className="px-4 py-2 border">
                            {estudiante.correoInstitucional}
                        </td>
                        <td className="px-4 py-2 border">{estudiante.celular}</td>
                    </tr>)
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ConsultaEstudiantes;
