import React, { useState } from "react";
import axios from "axios";


function RegistroEstudiantes(props) {
    console.log("TIPO FORM>>" + props.Tipo);


    const [estudiante, setEstudiante] = useState({
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        proyectoCurricular: "",
        codigo: "",
        documento: "",
        tipoDocumento: "",
        correoPersonal: "",
        correoInstitucional: "",
        celular: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !estudiante.nombre ||
            !estudiante.apellido ||
            !estudiante.fechaNacimiento ||
            !estudiante.proyectoCurricular ||
            !estudiante.codigo ||
            !estudiante.documento ||
            !estudiante.tipoDocumento ||
            !estudiante.correoPersonal ||
            !estudiante.correoInstitucional ||
            !estudiante.celular
        ) {
            let campoNulo = "NINGUNO";
            if (!estudiante.nombre) {
                campoNulo = "NOMBRE";
            }
            if (!estudiante.apellido) {
                campoNulo = "APELLIDO";
            }
            if (!estudiante.fechaNacimiento) {
                campoNulo = "FECHA NACIMIENTO";
            }
            if (!estudiante.proyectoCurricular) {
                campoNulo = "PROYECTO CURRICULAR";
            }
            if (!estudiante.codigo) {
                campoNulo = "CODIGO";
            }
            if (!estudiante.documento) {
                campoNulo = "DOCUMENTO";
            }
            if (!estudiante.tipoDocumento) {
                campoNulo = "TIPO DOCUMENTO";
            }
            if (!estudiante.correoPersonal) {
                campoNulo = "CORREO PERSONAL";
            }
            if (!estudiante.correoInstitucional) {
                campoNulo = "CORREO INSTITUCIONAL";
            }
            if (!estudiante.celular) {
                campoNulo = "CELILAR";
            }

            alert(`Por favor completa el campo:${campoNulo}  del formulario`);
            return;
        }


        let data = JSON.stringify({
            "nombre": estudiante.nombre,
            "apellido": estudiante.apellido,
            "fechaNacimiento": estudiante.fechaNacimiento,
            "proyectoCurricular": estudiante.proyectoCurricular,
            "codigo": estudiante.codigo,
            "documento": estudiante.documento,
            "tipoDocumento": estudiante.tipoDocumento,
            "correoPersonal": estudiante.correoPersonal,
            "correoInstitucional": estudiante.correoInstitucional,
            "celular": estudiante.celular
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8085/crear',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    };




    return (
        <div className="flex flex-col">
            <h1 className="self-center my-10 mb-8 text-3xl font-bold">Registro de Estudiantes</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mx-96 mb-14">
                <div>
                    <label htmlFor="nombre" className="block mb-2">Nombre:</label>
                    <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        value={estudiante.nombre}
                        onChange={(e) =>
                            setEstudiante({ ...estudiante, nombre: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="apellido" className="block mb-2">Apellidos:</label>
                    <input
                        id="apellido"
                        type="text"
                        name="apellido"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        value={estudiante.apellido}
                        onChange={(e) =>
                            setEstudiante({ ...estudiante, apellido: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="fechaNacimiento" className="block mb-2">Fecha Nacimiento:</label>
                    <input
                        id="fechaNacimiento"
                        type="text"
                        name="fechaNacimiento"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        value={estudiante.fechaNacimiento}
                        onChange={(e) =>
                            setEstudiante({ ...estudiante, fechaNacimiento: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="proyectoCurricular" className="block mb-2">Proyecto Curricular:</label>
                    <input
                        id="proyectoCurricular"
                        type="text"
                        name="proyectoCurricular"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        value={estudiante.proyectoCurricular}
                        onChange={(e) =>
                            setEstudiante({ ...estudiante, proyectoCurricular: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="codigo" className="block mb-2">Codigo:</label>
                    <input
                        id="codigo"
                        type="text"
                        name="codigo"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        value={estudiante.codigo}
                        onChange={(e) =>
                            setEstudiante({ ...estudiante, codigo: e.target.value })
                        }
                    />
                </div>
                <div className="flex flex-row">
                    <label htmlFor="tipoDocumento" className="flex-initial block mb-2 w-36">Tipo Documento:</label>
                    <select id="tipoDocumento" className="px-3 py-2 mx-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" data-te-select-init name="tipoDocumento" onChange={(e) => {
                        console.log("VALUE SELECT>>"+e.target.value)
                        setEstudiante({ ...estudiante, tipoDocumento: e.target.value })
                    }
                    }>
                        <option value="CC">CC</option>
                        <option value="NIT">NIT</option>
                        <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                        <option value="CE">CE</option>
                    </select>
                    <label htmlFor="documento" className="block w-32 mb-2">Documento:</label>
                    <input
                        id="documento"
                        type="text"
                        name="documento"
                        className="w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        value={estudiante.documento}
                        onChange={(e) =>
                            setEstudiante({ ...estudiante, documento: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="correoPersonal" className="block mb-2">Correo Personal:</label>
                    <input
                        id="correoPersonal"
                        type="text"
                        name="correoPersonal"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        value={estudiante.correoPersonal}
                        onChange={(e) =>
                            setEstudiante({ ...estudiante, correoPersonal: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="correoInstitucional" className="block mb-2">Correo Institucional:</label>
                    <input
                        id="correoInstitucional"
                        type="text"
                        name="correoInstitucional"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        value={estudiante.correoInstitucional}
                        onChange={(e) =>
                            setEstudiante({ ...estudiante, correoInstitucional: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="celular" className="block mb-2">Celular:</label>
                    <input
                        id="celular"
                        type="text"
                        name="celular"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        value={estudiante.celular}
                        onChange={(e) =>
                            setEstudiante({ ...estudiante, celular: e.target.value })
                        }
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                    Registrar
                </button>
            </form>
        </div>
    );
}

export default RegistroEstudiantes;