const con = require("../database/conn");
const Paciente = require("../models/Paciente");

const createPaciente = (req, res) => {
  con.query(new Paciente(req.body).create(), (err, result) => {
    if (err == null) {
      res.status(201).json(result);
    } else {
      res.send("Erro:" + err).end();
    }
  });
};

const readPaciente = (req, res) => {
  con.query(new Paciente(req.body).read(), (err, result) => {
    if (err == null) {
      res.status(200).json(result);
    } else {
      res
        .status(404)
        .send("Erro:" + err)
        .end();
    }
  });
};

const getByName = (req, res) => {
  const { nomeCompleto } = req.query;

  const q = `SELECT * FROM paciente WHERE nome_completo = '${nomeCompleto}'`;
  con.query(q, (err, result) => {
    if (err == null) {
      res.status(200).json(result);
    } else {
      res
        .status(404)
        .send("Erro:" + err)
        .end();
    }
  });
};

const updatePaciente = (req, res) => {
  con.query(new Paciente(req.body).update(), (err, result) => {
    if (result.affectedRows > 0) {
      res.status(202).json(result);
    } else {
      res
        .status(404)
        .send("Erro:" + err)
        .end();
    }
  });
};

const delPaciente = (req, res) => {
  con.query(new Paciente(req.params).del(), (err, result) => {
    if (result.affectedRows > 0) {
      res.status(202).json(result);
    } else {
      res
        .status(404)
        .send("Erro:" + err)
        .end();
    }
  });
};

module.exports = {
  readPaciente,
  getByName,
  delPaciente,
  createPaciente,
  updatePaciente,
};
