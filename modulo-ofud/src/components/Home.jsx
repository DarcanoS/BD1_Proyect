import React from 'react';

//Milena_Encinales_20191020047-Jhony_Caro_20191020055-Stivel_Pinilla_20191020024

const Home = () => {
  const teamMembers = [
    {
      nombre: 'Milena Encinales',
      codigo: '20191020047',
    },
    {
      nombre: 'Jhony Caro',
      codigo: '20191020055',
    },
    {
      nombre: 'Stivel Pinilla',
      codigo: '20191020024',
    }
  ];

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-8 mx-auto bg-white rounded-md shadow-md">
        <h1 className="mb-4 text-3xl font-semibold text-gray-800">Equipo de Proyecto</h1>
        <div className="grid gap-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{member.nombre}</h2>
                <p className="text-gray-600">{member.codigo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
