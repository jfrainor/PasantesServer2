const db = require("../models");

const Tutor = db.tutor;

const getAll = async (req, res) => {
  let tutor = await Tutor.findAll({});
  res.status(200).send(tutor);
};

const addTutor = async (req, res) => {
  try {
    const existingTutor = await Tutor.findOne({
      where: { tutor_cedula: req.body.tutor_cedula },
    });

    if (existingTutor) {
      return res.status(400).json({ error: "El tutor ya existe" });
    }

    let info = {
      tutor_cedula: req.body.tutor_cedula,
      estatus: req.body.estatus,
      usuario_id: req.body.usuario_id,
      institucion_id: req.body.institucion_id,
      carrera_id: req.body.carrera_id,
    };

    const tutor = await Tutor.create(info);
    res.status(200).send(tutor);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error al añadir el tutor" });
  }
};

module.exports = {
  addTutor,
  getAll,
};
