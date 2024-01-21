const db = require("../models");

const Institucion = db.institucion;

const getInstitucion = async (req, res) => {
  let id = req.params.id;
  let instituto = await Institucion.findOne({ where: { idinstitucion: id } });
  instituto
    ? res.status(200).send(instituto)
    : res.status(404).json({ error: "No existe esa institución" });
};

const getAll = async (req, res) => {
  let institutos = await Institucion.findAll({});
  res.status(200).send(institutos);
};

const addInstitucion = async (req, res) => {
  try {
    const existingInstitucion = await Institucion.findOne({
      where: { nombre: req.body.nombre },
    });

    if (existingInstitucion) {
      return res.status(409).json({ error: "La institución ya existe" });
    }

    let infoInstitucion = {
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      nro_contacto: req.body.nro_contacto,
      verificada: req.body.verificada,
    };
    const institucion = await Institucion.create(infoInstitucion);
    res.status(200).send(institucion);
  } catch (error) {
    console.log(err);
  }
};

module.exports = {
  addInstitucion,
  getAll,
  getInstitucion,
};
