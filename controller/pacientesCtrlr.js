
const axios = require('axios');
const _ = require('lodash');
const chalk = require('chalk');


const Paciente = require('../models/pacientesModels');

const viewIndex = (req, res) => {
    res.render('index');
}


const generarConsulta = async (req, res) => {
    const numeroConsulta = req.body.numeroConsulta;

    if (!numeroConsulta || numeroConsulta <= 0) {
        return res.status(400).send('Por favor, ingresa un número válido para la consulta.');
    }

    try {
        // Llamada a la API
        const response = await axios.get(`https://randomuser.me/api/?results=${numeroConsulta}`);
        
        // Mapear los resultados a la clase Paciente
        const pacientes = response.data.results.map(user => {
            return new Paciente(user.name.first, user.name.last, user.gender);
        });

        pacientesGenerados = pacientes;
        
        // Imprimir cada paciente en la consola
        pacientes.forEach(paciente => {
            console.log(chalk.bgWhite.blue(`Paciente: ${paciente.nombre} ${paciente.apellido} - Género: ${paciente.genero} - ID: ${paciente.id} - Fecha: ${paciente.fecha}`));
        });
        // Redirigir a la ruta /pacientes
        res.redirect('/pacientes');
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).send('Error al obtener los pacientes');
    }
}

const pacientesLista = (req, res) => {
    res.render('pacientes', { pacientes: pacientesGenerados });
}

const separarGenero = (req, res) => {
    res.render('genero');
}

const generoMasculino = (req, res) => {
    const pacientesPorGenero = _.groupBy(pacientesGenerados, 'genero');
    res.render('generoMasculino', {
        masculinos: pacientesPorGenero.male || []
    });
}

const generoFemenino = (req, res) => {
    const pacientesPorGenero = _.groupBy(pacientesGenerados, 'genero');
    res.render('generoFemenino', {
        femeninos: pacientesPorGenero.female || []
    });
}



const rutaError = (req, res) => {
    res.render('error');
};


module.exports = {
    generarConsulta, separarGenero, generoMasculino, generoFemenino, pacientesLista, viewIndex, rutaError
};