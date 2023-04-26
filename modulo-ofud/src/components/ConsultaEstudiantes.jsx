import React, { useState, useEffect } from "react";
import axios from "axios";

function parseDB(data) {
    let estudiantes = [];
    let lista = data.data;
    console.log("LISTA>>>",lista);
    for (let index = 0; index < lista.length; index++) {
        estudiantes.push({
            documento: lista[index].DOCUMENTO,
            nombre: lista[index].NOMBRE,
            apellido: lista[index].APELLIDOS,
            fechaNacimiento: lista[index].FECHA_NACIMIENTO,
            proyectoCurricular: lista[index].PROYECTO_CURRICULAR,
            codigo: lista[index].CODIGO,
            tipoDocumento: lista[index].TIPO_DOCUMENTO,
            correoPersonal: lista[index].CORREO_PERSONAL,
            correoInstitucional: lista[index].CORREO_INSTUTUCIONAL,
            celular: lista[index].CELULAR,
            fechaRegistro: lista[index].FECHA_REGISTRO
        })        
    }
    console.log("estudiantes>>>",estudiantes);
    return estudiantes;


}


function ConsultaEstudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:8085/',
        headers: {}
    };
    useEffect(() => {
        // setEstudiantes([{
        //     documento: 10000000000000,
        //     nombre: "Stivel",
        //     apellido: "Pinilla",
        //     fechaNacimiento: "27/02/2001",
        //     proyectoCurricular: "Ingeniería de Sistemas",
        //     codigo: 20191020024,
        //     tipoDocumento: "CC",
        //     correoPersonal: "yo@mi.com",
        //     correoInstitucional: "yo@mi.com",
        //     celular: 30000000000000000001
        // }, {
        //     documento: 10000000000001,
        //     nombre: "Stivel",
        //     apellido: "Pinilla",
        //     fechaNacimiento: "27/02/2001",
        //     proyectoCurricular: "Ingeniería de Sistemas",
        //     codigo: 20191020024,
        //     tipoDocumento: "CC",
        //     correoPersonal: "yo@mi.com",
        //     correoInstitucional: "yo@mi.com",
        //     celular: 30000000000000000001
        // }])
        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setEstudiantes(parseDB(JSON.parse(JSON.stringify(response.data))));
            })
            .catch((error) => {
                console.log(error);
            });
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
                        <th className="px-4 py-2">Fecha Registro</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantes.map((estudiante) => (<tr key={estudiante.codigo}>
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
                        <td className="px-4 py-2 border">{estudiante.fechaRegistro}</td>
                    </tr>)
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ConsultaEstudiantes;
