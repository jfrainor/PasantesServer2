const db = require("../models");

const Usuario = db.usuarios;
const Pasante = db.pasantes;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Obtener un usuario
const getUsuario = async (req, res) => {
  let id = req.params.id;
  let usuario = await Usuario.findOne({ where: { iduser: id } });
    usuario
      ? res.status(200).send(usuario)
      : res.status(404).json({ error: "No existe ese usuario" });
};


// Obtener todos los usuarios
const getAll = async (req, res) => {
    let usuarios = await Usuario.findAll({});
    res.status(200).send(usuarios);
};

//Agregar un nuevo usuario
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
      apellido_user: req.body.apellido_user,
      correo_user: req.body.correo_user,
      telefono_user: req.body.telefono_user,
      genero_user: req.body.genero_user,
      contra_user: HashedPasswordUser,
    };
    const usuario = await Usuario.create(infoUsuario);
    res.status(200).send(usuario);
  } catch (error) {
    console.log(err);
    res.status(500).send({ message: "Error al añadir el usuario" });
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

    const hashedPasswordUser = await bcrypt.hash(req.body.contra_user, 10);

    let infoUsuario = {
      nombre_user: req.body.nombre_user,
      apellido_user: req.body.apellido_user,
      correo_user: req.body.correo_user,
      telefono_user: req.body.telefono_user,
      genero_user: req.body.genero_user,
      contra_user: hashedPasswordUser,
    };

    const usuario = await Usuario.create(infoUsuario);
    let infoPasante = {
      pasante_cedula: req.body.pasante_cedula,
      experiencia_acad: req.body.experiencia_acad,
      estatus: req.body.estatus,
      usuario_id: req.body.usuario_id,
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

/* // Agregar un nuevo usuario y tutor
const addUserTutor = async (req, res) => {
  try {
    //Verificar si el usuario ya existe
    const existingUser = await Usuario.findOne({
      where: { nombre_user: req.body.nombre_user },
    });

    if (existingUser) {
      return res.status(409).json({ error: "El nombre de usuario ya está en uso" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(req.body.contra_user, 10);

    // Crear usuario
    const usuario = await Usuario.create({
      nombre_user: req.body.nombre_user,
      apellido_user: req.body.apellido_user,
      correo_user: req.body.correo_user,
      telefono_user: req.body.telefono_user,
      genero_user: req.body.genero_user,
      contra_user: hashedPassword,
    });

    // Verificar si el tutor ya existe por cédula
    const existingTutor = await Tutor.findOne({
      where: { tutor_cedula: req.body.tutor_cedula },
    });

    if (existingTutor) {
      // Si ya existe, eliminar usuario creado y enviar error
      await usuario.destroy();
      return res.status(409).json({ error: "El tutor ya existe" });
    }

    // Crear tutor
    const tutor = await Tutor.create({
      tutor_cedula: req.body.tutor_cedula,
      estatus: req.body.estatus,
      usuario_id: usuario.iduser,
      institucion_id: req.body.institucion_id,
      carrera_id: req.body.carrera_id,
    });

    res.status(200).send({ usuario, tutor });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error al añadir el tutor" });
  }
};
 */

module.exports = {
  addUser,
  addUserPasante,
  //addUserTutor,
  getAll,
  getUsuario,
};
