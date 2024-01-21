module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DATABASE: "rnappserver",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
  
  /* module.exports = {
    HOST: process.env.MYSQLHOST || "localhost",
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_URL: process.env.MYSQL_URL,
    PORT: process.env.MYSQLPORT || 8081,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }; */