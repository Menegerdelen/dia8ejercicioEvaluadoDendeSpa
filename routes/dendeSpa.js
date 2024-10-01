const { Router } = require("express");
const { generarConsulta, separarGenero, pacientesLista, viewIndex, rutaError, generoMasculino, generoFemenino } = require("../controller/pacientesCtrlr");

const router = Router();

router.get('/', viewIndex);

router.post('/', generarConsulta);

router.get('/pacientes', pacientesLista);

router.get('/genero', separarGenero);

router.get('/genero/masculino', generoMasculino);

router.get('/genero/Femenino', generoFemenino);




router.get('*', rutaError)





module.exports = router;