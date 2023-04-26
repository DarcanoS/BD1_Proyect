"""
demo.py
Antes de ejecutar el programa establece unas variables de entorno:
    PYTHON_USERNAME       - El ususario de la base de datos
    PYTHON_PASSWORD       - La contraseña del usuario
    PYTHON_CONNECTSTRING  - El nombre o dirección del host donde se encuentra y el nombre de la sesión. "example.com/XEPDB1"
    PORT                  - El puerto por el que se va a servir la app web, por defecto es el 8080 
"""
# Importamos las funciones del sistema, el módulo que conecta python con oracle y flask para la aplicación en cuestión.
import os
import sys
import cx_Oracle
from flask import Flask, render_template, abort, request
from flask import Flask, request
from http import HTTPStatus
import copy
from flask_cors import CORS
from flask_mail import Mail, Message
from datetime import datetime

################################################################################
# Esta parte del código es por si se inicia en otro sistema operativo.

if sys.platform.startswith("darwin"):
    cx_Oracle.init_oracle_client(lib_dir=os.environ.get("HOME") +
                                 "/instantclient_19_3")
elif sys.platform.startswith("win32"):
    cx_Oracle.init_oracle_client(lib_dir=r"C:\Oracle\instantclient_11_2")

# Init_session es una función para una llamada de sesión eficiente.


def init_session(connection, requestedTag_ignored):
    cursor = connection.cursor()
    cursor.execute("""
        ALTER SESSION SET
          TIME_ZONE = 'UTC'
          NLS_DATE_FORMAT = 'YYYY-MM-DD HH24:MI'""")


# Función para establecer la conexión con la base de datos
def start_pool():

    # Creamos las conexión con la base de datos usando variables de entorno.
    # Las variables de entorno en este caso son
    #[oracle@bd ~]$ export PYTHON_CONNECTSTRING=localhost/xe
    #[oracle@bd ~]$ export PYTHON_PASSWORD=empleado
    #[oracle@bd ~]$ export PYTHON_USERNAME=empleado

    pool_min = 15
    pool_max = 15
    pool_inc = 0
    pool_gmd = cx_Oracle.SPOOL_ATTRVAL_WAIT

    print("Connecting to", os.environ.get("PYTHON_CONNECTSTRING"))

    pool = cx_Oracle.SessionPool(user=os.environ.get("PYTHON_USERNAME"),
                                 password=os.environ.get("PYTHON_PASSWORD"),
                                 dsn=os.environ.get("PYTHON_CONNECTSTRING"),
                                 min=pool_min,
                                 max=pool_max,
                                 increment=pool_inc,
                                 threaded=True,
                                 getmode=pool_gmd,
                                 sessionCallback=init_session)

    return pool


def insertar(conexion, nombre, apellido, fechaNacimiento, proyectoCurricular,
             codigo, documento, tipoDocumento, correoPersonal,
             correoInstitucional, celular):
    cursor = conexion.cursor()
    datos = "insert into estudiante values('{}','{}','{}','{}','{}','{}','{}','{}','{}','{}',SYSDATE)".format(
        nombre, apellido, fechaNacimiento, proyectoCurricular, codigo,
        documento, tipoDocumento, correoPersonal, correoInstitucional, celular)
    print(datos)
    cursor.execute(datos)
    cursor.execute(
        "select * from estudiante where codigo = '{}'".format(codigo))
    cursor.rowfactory = lambda *args: dict(
        zip([d[0] for d in cursor.description], args))
    row = cursor.fetchone()
    conexion.commit()
    cursor.close()
    conexion.close()
    return row


def actualizar(conexion, nombre, apellido, fechaNacimiento, proyectoCurricular,
               codigo, documento, tipoDocumento, correoPersonal,
               correoInstitucional, celular):
    cursor = conexion.cursor()
    datos = "update estudiante set nombre='{}',apellidos='{}',fecha_nacimiento='{}',proyecto_curricular='{}',documento='{}',tipo_documento='{}',correo_personal='{}',correo_institucional='{}',celular='{}' where codigo='{}'".format(
        nombre, apellido, fechaNacimiento, proyectoCurricular, documento,
        tipoDocumento, correoPersonal, correoInstitucional, celular, codigo)
    print(datos)
    cursor.execute(datos)
    cursor.execute(
        "select * from estudiante where codigo = '{}'".format(codigo))
    cursor.rowfactory = lambda *args: dict(
        zip([d[0] for d in cursor.description], args))
    row = cursor.fetchone()
    conexion.commit()
    cursor.close()
    conexion.close()
    return row


def eliminar(conexion, codigo):
    cursor = conexion.cursor()
    cursor.execute(
        "select * from estudiante where codigo = '{}'".format(codigo))
    cursor.rowfactory = lambda *args: dict(
        zip([d[0] for d in cursor.description], args))
    row = cursor.fetchone()
    datos = "delete from estudiante WHERE codigo='{}'".format(codigo)
    print(datos)
    cursor.execute(datos)
    conexion.commit()
    cursor.close()
    conexion.close()
    return row


################################################################################

# Definimos el nombre de la aplicación para flask
app = Flask(__name__)
RESPONSE_BODY_DEFAULT = {"message": "", "data": [], "errors": []}


# Muestra la página principal con su correspondiente plantilla
@app.route('/', methods=["GET", "POST"])
def inicio():
    response_body = copy.deepcopy(RESPONSE_BODY_DEFAULT)
    status_code = HTTPStatus.OK
    connection = pool.acquire()
    cursor = connection.cursor()
    cursor.execute("select * from estudiante")
    cursor.rowfactory = lambda *args: dict(
        zip([d[0] for d in cursor.description], args))
    res = cursor.fetchall()
    response_body["data"] = res
    response_body["message"] = "Estudiantes consultados correctamente."
    return response_body, status_code


@app.route('/crear', methods=["GET", "POST"])
def crear():
    response_body = copy.deepcopy(RESPONSE_BODY_DEFAULT)
    status_code = HTTPStatus.OK
    if request.method == "POST":
        campos = [
            'nombre', 'apellido', 'fechaNacimiento', 'proyectoCurricular',
            'codigo', 'documento', 'tipoDocumento', 'correoPersonal',
            'correoInstitucional', 'celular'
        ]
        for campo in campos:
            if not campo in request.json:
                response_body["errors"].append("Campo " + campo +
                                               " es requerido")
                status_code = HTTPStatus.BAD_REQUEST
                return response_body, status_code

            campo_actual = request.json[campo]

            if campo_actual == "":
                response_body["errors"].append("Campo " + campo +
                                               " es requerido")
                status_code = HTTPStatus.BAD_REQUEST
                return response_body, status_code

        connection = pool.acquire()
        res = insertar(
            connection, request.json['nombre'], request.json['apellido'],
            request.json['fechaNacimiento'],
            request.json['proyectoCurricular'], request.json['codigo'],
            request.json['documento'], request.json['tipoDocumento'],
            request.json['correoPersonal'],
            request.json['correoInstitucional'], request.json['celular'])
        response_body["data"] = res
        response_body["message"] = "Estudiante creado correctamente"
        msg = Message('!Registro exitoso!',
                      sender='stivelpinilla288@gmail.com',
                      recipients=[
                          request.json['correoPersonal'],
                          request.json['correoInstitucional']
                      ])
        msg.body = "Gracias por tu registro " + request.json[
            'nombre'] + ' ' + request.json[
                'apellido'] + '. Fecha de envio: ' + str(datetime.now())
        mail.send(msg)
        return response_body, status_code


@app.route('/actualizar', methods=["GET", "POST"])
def modificar():
    response_body = copy.deepcopy(RESPONSE_BODY_DEFAULT)
    status_code = HTTPStatus.OK
    if request.method == "POST":
        campos = [
            'nombre', 'apellido', 'fechaNacimiento', 'proyectoCurricular',
            'codigo', 'documento', 'tipoDocumento', 'correoPersonal',
            'correoInstitucional', 'celular'
        ]
        for campo in campos:
            if not campo in request.json:
                response_body["errors"].append("Campo " + campo +
                                               " es requerido")
                status_code = HTTPStatus.BAD_REQUEST
                return response_body, status_code

            campo_actual = request.json[campo]

            if campo_actual == "":
                response_body["errors"].append("Campo " + campo +
                                               " es requerido")
                status_code = HTTPStatus.BAD_REQUEST
                return response_body, status_code
            else:
                connection = pool.acquire()
                res = actualizar(
                    connection, request.json['nombre'],
                    request.json['apellido'], request.json['fechaNacimiento'],
                    request.json['proyectoCurricular'], request.json['codigo'],
                    request.json['documento'], request.json['tipoDocumento'],
                    request.json['correoPersonal'],
                    request.json['correoInstitucional'],
                    request.json['celular'])
                response_body["data"] = res
                response_body[
                    "message"] = "Estudiante actualizado correctamente."
            return response_body, status_code


@app.route('/eliminar', methods=["GET", "POST"])
def borrar():
    response_body = copy.deepcopy(RESPONSE_BODY_DEFAULT)
    status_code = HTTPStatus.OK
    if request.method == "POST":
        campos = ['codigo']
        for campo in campos:
            if not campo in request.json:
                response_body["errors"].append("Campo " + campo +
                                               " es requerido")
                status_code = HTTPStatus.BAD_REQUEST
                return response_body, status_code

            campo_actual = request.json[campo]

            if campo_actual == "":
                response_body["errors"].append("Campo " + campo +
                                               " es requerido")
                status_code = HTTPStatus.BAD_REQUEST
                return response_body, status_code
            else:
                connection = pool.acquire()
                res = eliminar(connection, request.json['codigo'])
                response_body["data"] = res
                response_body[
                    "message"] = "Estudiante eliminado correctamente."
            return response_body, status_code


## Ver los registros de las tablas

#@app.route('/tabla/<str:nombre>', methods=["GET","POST"])
#def detallejuego(nombre):
#	registros=[]
#
#    connection = pool.acquire()
#    cursor = connection.cursor()
#    cursor.execute("select * from cat")
#    res = cursor.fetchall()
#
#	for tabla in res:
#        if tabla == str()
#	return render_template("registros.html",registros=registros)

################################################################################

### -Programa principal:

# Este código funciona si se ha ejecutado previamente como usuario startup en la base de datos.
#
if __name__ == '__main__':

    # Iniciar la conexión a la base de datos
    pool = start_pool()
    # Iniciar la aplicación web
    CORS(app)
    # app.config['MAIL_SERVER'] = 'sandbox.smtp.mailtrap.io'
    # app.config['MAIL_PORT'] = 2525
    # app.config['MAIL_USERNAME'] = 'b3aa0191bc490f'
    # app.config['MAIL_PASSWORD'] = '59a1b0783969fa'
    # app.config['MAIL_USE_TLS'] = True
    # app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USERNAME'] = 'stivelpinilla288@gmail.com'
    app.config['MAIL_PASSWORD'] = 'mhdskvdjwexvmpkd'
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False

    mail = Mail(app)
    app.run(port=int(os.environ.get('PORT', '8085')), debug=True)
