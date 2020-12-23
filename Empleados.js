const { response } = require('express');
const express = require('express');
const app = express();
const request = require('request');

// ============
// Primer Punto
// ============

app.get('/Empleados', (req, res) => {

    request('http://dummy.restapiexample.com/api/v1/employees', function(error, arreglo, body) {

        console.log(`El error es: ${error}`);
        console.log('El arreglo es : ' + JSON.stringify(arreglo));
        console.log(`body: ${body}`);
        var obj = JSON.parse(body);

        res.json({
            obj
        });

    })

});

// ==============
// Segundo Punto
// ==============

app.get('/Empleados/obtenerInformacionEmpleados', (req, res) => {

    request('http://dummy.restapiexample.com/api/v1/employees', function(error, arreglo, body) {

        var obj = JSON.parse(body);
        var arreglo = obj.data;

        for (let index = 0; index < arreglo.length; index++) {

            var key = "profile_image";
            delete arreglo[index][key];


            if (arreglo[index].employee_salary > 200000) {

                arreglo[index].info_salario = 'El empleado tiene un buen salario';
            } else {
                arreglo[index].info_salario = 'El empleado tiene un salario muy bajo';
            }

            if (arreglo[index].employee_age > 62) {
                arreglo[index].status_edad = 'El empleado tiene edad para pensionarse';
            } else {
                arreglo[index].status_edad = 'El empleado aun es muy joven';
            }
        }

        res.json({
            ok: arreglo
        })

    });

});


// ============
// Tercer Punto
// ============


app.get('/Empleados/obtenerFoto/:name', (req, res) => {

    var url = 'http://dummy.restapiexample.com/api/v1/employees/'

    res.json({ data: url + req.params.name.replace(' ', '_') });

});


// ============
// cuarto Punto
// ============
app.get('/Empleados/Conteo', (req, res) => {

    request('http://dummy.restapiexample.com/api/v1/employees', function(error, arreglo, body) {


        var obj = JSON.parse(body);
        var arreglo = obj.data;
        var conteo = arreglo.length;

        console.log(`En el arreglo hay: ${conteo} registros`);

        res.json({
            conteo
        });
    })
});

// ============
// Quinto Punto
// https://stackoverflow.com/questions/34593296/nodejs-request-multiple-api-endpoints
// ============

app.get('/Empleados/obtenerInformacionEmpleadosconFoto', (req, res) => {

    request('http://dummy.restapiexample.com/api/v1/employees', function(error, arreglo, body) {

        var obj = JSON.parse(body);
        var arreglo = obj.data;

        for (let index = 0; index < arreglo.length; index++) {

            if (arreglo[index].employee_salary > 200000) {

                arreglo[index].info_salario = 'El empleado tiene un buen salario';
            } else {
                arreglo[index].info_salario = 'El empleado tiene un salario muy bajo';
            }

            if (arreglo[index].employee_age > 62) {
                arreglo[index].status_edad = 'El empleado tiene edad para pensionarse';
            } else {
                arreglo[index].status_edad = 'El empleado aun es muy joven';
            }
        }

        var newarray = [];
        var obj = {};

        for (let index = 0; index < arreglo.length; index++) {

            newarray.push(obj_id = arreglo[index].id)
            newarray.push(obj.nombre = arreglo[index].employee_name)
            newarray.push(obj.salario = arreglo[index].employee_salary)
            newarray.push(obj.edad = arreglo[index].employee_age)

            var url = 'http://dummy.restapiexample.com/api/v1/employees/'
            data = url + arreglo[index].employee_name.replace(' ', '_');
            newarray.push(obj.pi = data)

            newarray.push(obj.stedad = arreglo[index].status_edad)
            newarray.push(obj.stsalario = arreglo[index].info_salario)
        }

        res.json({
            ok: newarray
        })

    });

});

// ============
// Port 3000
// ============

app.listen(3000, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ 3000 } `);

});