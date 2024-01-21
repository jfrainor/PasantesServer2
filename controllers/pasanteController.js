const db = require("../models");

const Pasante = db.pasantes;

const getAll = async (req, res) => {
  let pasante = await Pasante.findAll({});
  res.status(200).send(pasante);
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
      pasante_name: req.body.pasante_name,
      pasante_apellido: req.body.pasante_apellido,
      pasante_cedula: req.body.pasante_cedula,
      pasante_empresa: req.body.pasante_empresa,
      pasante_correo: req.body.pasante_correo,
      pasante_tlf: req.body.pasante_tlf,
      experiencia_acad: req.body.experiencia_acad,
      estatus: req.body.estatus,
      usuario_id: req.body.usuario_id,
      cedula: req.body.cedula,
      institucion_id: req.body.institucion_id,
      carrera_id: req.body.carrera_id,
      tutor_id: req.body.tutor_id,
    };

    const pasante = await Pasante.create(info);
    res.status(200).send(pasante);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addPasante,
  getAll,
};
