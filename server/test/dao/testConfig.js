module.exports = {
  connectionLimit: 10,
  host: process.env.CI ? 'mysql' :"localhost",
  dialect: 'mysql',
  user: "root",
  password: process.env.CI ? 'secret' : "Agurk12,",
  database: process.env.CI ? 'supertestdb' : "systemutvikling",
  debug: false,
  multipleStatements: true
};
