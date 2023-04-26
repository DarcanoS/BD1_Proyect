# BD1_Proyect
## Requerimineto
Se puede ver el requerimiento en el [Documento de requerimiento](https://udistritaleduco-my.sharepoint.com/:b:/r/personal/sordonez_udistrital_edu_co/Documents/Estudiantes/EStu2023-1/BDI81-2023-1/MaterialBDI81-2023-1/Material/Modulo/RequerimientoInicialBDI-2023-1.pdf?csf=1&web=1&e=locyI2)
- [x] Interfaz resgitro estudiantes (Sin Conexión DB).
- [x] Interfaz de vizualicación estudiantes (Sin Conexión DB).
- [ ] Conexión API DB.

### Intalación de Node NPM, y YARN
Entrar en [Pagina Principal Node](https://nodejs.org/es/download/) y descargar e instalar Node.js en el sistema operativo deseado.
Utilizar los comandos:
```node
node -v
```
y
```node
npm -v
```
Para validar la correcta intalación de NODE y NPM.

Para la instalación de YARN ejecutar el siguiente comando:
```node
npm install --global yarn
```
Validar la correcta instalación de YARN con el comando:
```node
yarn -v
```
### Intalación de Python
Entrar en [Pagina Principal Python](https://www.python.org/downloads/) y descargar e instalar Python en el sistema operativo deseado.
## Clonación de repositorio
Instalar Git.
Clonar el repositorio:
```node
git clone https://github.com/DarcanoS/BD1_Proyect.git
```
Dirigirse a la carpeta del ropositorio:
```node
cd BD1_Proyect/
```
### Ejecución de la aplicación (BackEnd)
Dirigise a la carpeta del proyecto:
```node
cd modulo-ofud-backend/
```
Ejecutar el entorno virtual. Para Windows:
```node
.\env\Scripts\activate-bat
```
Instalar las dependencias del proyecto:
```node
pip install -r requirements.txt
```
Cambiar en el archivo _app.py_ la siguiente linea. Por la ruta que tengamos. ([Explicación de intalación de Oracle EX](https://cx-oracle.readthedocs.io/en/latest/user_guide/installation.html)):
```node
cx_Oracle.init_oracle_client(lib_dir=r"C:\Oracle\instantclient_11_2")
```
Para ejecutar la aplicación debemos establecer unas variables de entorno. Para Windows (Ejemplo):
```node
set PYTHON_CONNECTSTRING=localhost/xe
set PYTHON_PASSWORD=BD22023
set PYTHON_USERNAME=BD22023
```
Corremos el aplicativo. En Windows:
```node
python app.py
```
Desactivar el entorno virtual. Para Windows:
```node
deactivate
```
### Ejecución de la aplicación (FrontEnd)
Dirigise a la carpeta del proyecto:
```node
cd modulo-ofud/
```
Instale las dependencias del proyecto utilizando el comando:
```node
yarn install
```
Para iniciar la aplicación, ejecuta el comando:
```node
yarn start
```