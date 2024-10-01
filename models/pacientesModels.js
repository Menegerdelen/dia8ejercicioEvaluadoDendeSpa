const { v4: uuidv4 } = require('uuid');
const moment = require('moment');


class Paciente {
    constructor(nombre, apellido, genero) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.genero = genero;
        this.id = this.generarId();
        this.fecha =  this.fechaAleatoria();
    }

    generarId() {
        return uuidv4().substring(0, 6);
    }
    
    fechaAleatoria() {
        const start = moment('2000-01-01');
        const end = moment('2024-12-31');
        const randomDate = moment(start + Math.random() * (end - start));
        return randomDate.format('DD/MM/YYYY - HH:mm:ss');
    }
}



module.exports = Paciente;