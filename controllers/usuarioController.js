const db = require("../models");

const Usuario = db.usuarios;
const Pasante = db.pasantes;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsuario = async (req, res) => {
  let id = req.params.id;
  let usuario = await Usuario.findOne({ where: { iduser: id } });
  usuario
    ? res.status(200).send(usuario)
    : res.status(404).json({ error: "No existe ese usuario" });
};

const getAll = async (req, res) => {
  let usuarios = await Usuario.findAll({});
  res.status(200).send(usuarios);
};

const addUser = async (req, res) => {
  try {
    const existingUser = await Usuario.findOne({
      where: { nombre_user: req.body.nombre_user },
    });

    if (existingUser) {
      return res.status(409).json({ error: "El usuario ya existe" });
    }
    const HashedPasswordUser = await bcrypt.hash(req.body.contra_user, 10);

    let infoUsuario = {
      nombre_user: req.body.nombre_user,
      contra_user: HashedPasswordUser,
    };
    const usuario = await Usuario.create(infoUsuario);
    res.status(200).send(usuario);
  } catch (error) {
    console.log(err);
  }
};

const addUserPasante = async (req, res) => {
  try {
    const existingUser = await Usuario.findOne({
      where: { nombre_user: req.body.nombre_user },
    });

    if (existingUser) {
      return res.status(409).json({ error: "El usuario ya existe" });
    }

    const HashedPasswordUser = await bcrypt.hash(req.body.contra_user, 10);
    let infoUsuario = {
      nombre_user: req.body.nombre_user,
      contra_user: HashedPasswordUser,
    };

    const usuario = await Usuario.create(infoUsuario);
    let infoPasante = {
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
    usuario
      ? (infoPasante.usuario_id = usuario.iduser)
      : res
          .status(400)
          .json({ Error: "Error asignando ID de Usuario a Pasante" });

    const pasante = await Pasante.create(infoPasante);
    res.status(200).send(pasante);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addUser,
  addUserPasante,
  getAll,
  getUsuario,
};
