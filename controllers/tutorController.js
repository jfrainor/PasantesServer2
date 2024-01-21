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
      tutor_name: req.body.tutor_name,
      tutor_apellido: req.body.tutor_apellido,
      tutor_cedula: req.body.tutor_cedula,
      tutor_correo: req.body.tutor_correo,
      tutor_tlf: req.body.tutor_tlf,
      estatus: req.body.estatus,
      usuario_id: req.body.usuario_id,
    };

    const tutor = await Tutor.create(info);
    res.status(200).send(pasante);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addTutor,
  getAll,
};
