const db = require("../models");

const Pasante = db.pasantes;

// Obtener todos los pasantes
const getAll = async (req, res) => {
  try {
    let pasantes = await Pasante.findAll({});
    res.status(200).send(pasantes);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error al obtener los pasantes" });
  }
};

const addPasante = async (req, res) => {
  try {
    const existingPasante = await Pasante.findOne({
      where: { pasante_cedula: req.body.pasante_cedula },
    });

    if (existingPasante) {
      return res.status(409).json({ error: "El pasante ya existe" });
    }

    let info = {
      pasante_cedula: req.body.pasante_cedula,
      experiencia_acad: req.body.experiencia_acad,
      estatus: req.body.estatus,
      usuario_id: req.body.usuario_id,
      institucion_id: req.body.institucion_id,
      carrera_id: req.body.carrera_id,
      tutor_id: req.body.tutor_id,
    };

    const pasante = await Pasante.create(info);
    res.status(200).send(pasante);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error al añadir el pasante" });
  }
};

module.exports = {
  addPasante,
  getAll,
};
