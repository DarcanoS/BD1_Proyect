import React, { useState } from "react";
import axios from "axios";


function RegistroEstudiantes() {
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
            alert("Por favor completa todos los campos del formulario");
            return;
        }

        //AGREGAR LA PETICION POST
        // axios
        //     .post("https://example.com/api/estudiantes", estudiante)
        //     .then((response) => {
        //         alert("Estudiante registrado correctamente");
        //         // Agrega la lógica para enviar el correo de confirmación aquí
        //         setEstudiante({
        //             nombre: "",
        //             apellido: "",
        //             fechaNacimiento: "",
        //             proyectoCurricular: "",
        //             codigo: "",
        //             documento: "",
        //             tipoDocumento: "",
        //             correoPersonal: "",
        //             correoInstitucional: "",
        //             celular: "",
        //         });
        //     })
        //     .catch((error) => {
        //         alert("Ocurrió un error al registrar al estudiante");
        //     });
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
                    <select id="tipoDocumento" className="px-3 py-2 mx-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" data-te-select-init name="tipoDocumento" onChange={(e) =>
                        setEstudiante({ ...estudiante, tipoDocumento: e.target.value })
                    }>
                        <option value="1">CC</option>
                        <option value="2">NIT</option>
                        <option value="3">Tarjeta de Identidad</option>
                        <option value="4">CE</option>
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