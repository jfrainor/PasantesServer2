const db = require("../models");

//////Import de JWT y Bcrypt
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//////

require("dotenv").config(); /////Variables de entorno cargadas

const User = db.usuarios;
const Session = db.sesiones;

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //Busca al usuario en la base de datos por nombre de usuario
    const user = await User.findOne({ where: { nombre_user: username } });
    //Si el usuario no existe, devuelve un error de autenticación
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    //Compara la contraseña proporcionada con la contraseña almacenada
    console.log(password);
    console.log(user.contra_user);
    if (bcrypt.compareSync(password, user.contra_user)) {
      //Genera un token de sesión utilizando jsonwebtoken
      const token = jwt.sign({ userId: user.iduser }, process.env.SecretKey, {
        // El SecretKey cargado en las variables de entorno
        expiresIn: "3d", // Establece la duración máxima del token a 3 días
      });

      //Crea una nueva sesión en la base de datos
      const session = await Session.create({ userId: user.iduser, token });

      //Devuelve el token de sesión en la respuesta
      return res.json({ token });
    } else {
      //Si la contraseña no coincide, devuelve un error de autenticación
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

const isTokenExpired = (token) => {
  const decodedToken = jwt.decode(token);

  if (!decodedToken || !decodedToken.exp) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
};

const checkToken = async (req, res) => {
  const token = req.body.token;

  try {
    // Verifica si el token está presente en la tabla de sesiones
    const session = await Session.findOne({ where: { token: token } });

    // Si no se encuentra la sesión, o el token ha expirado, redirige al inicio de sesión
    if (!session || isTokenExpired(session.token)) {
      return res.status(401).json({ error: "Sesión expirada" });
    }

    // Si el token es válido y no ha expirado, devuelve el token y un status 200
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(500).json({ error: "Error al verificar el token" });
  }
};

// Función auxiliar para verificar si el token ha expirado

module.exports = {
  login,
  checkToken,
};
