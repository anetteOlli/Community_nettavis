// @flow

import express from "express";
var mysql = require("mysql");
import path from 'path';
var bodyParser = require("body-parser");
import Joi from "joi";
let app = express();
import fs from "fs";
const ArtikkelDao = require("./dao/ArtikkelDAO.js");
import config from "./pool.js";

type Request = express$Request;
type Response = express$Response;

const public_path = path.join(__dirname, '/../../client/public');
app.use(express.static(public_path));

app.use(bodyParser.json()); // for å tolke JSON i body


console.log(config);

var pool = mysql.createPool(config);

let artikkelDao = new ArtikkelDao(pool);

//poenget med dette er for å validere at json objekter som sendes inn er gyldige
//hvis de ikke er bra nok, sender Joi 400-feil med beskrivelse av hva som manglet.
const artikkel_skjema = {
  tittel: Joi.string()
    .min(3)
    .required(),
  kategori: Joi.string()
    .min(3)
    .required(),
  innhold: Joi.string()
    .min(10)
    .required(),
  isViktig: Joi.number()
    .min(0)
    .max(1)
    .required(),
  bildeLink: Joi.string().allow(''),
  bildeTekst: Joi.string().allow(''),
  id: Joi.number()
};

app.use(express.static("public"));

app.get("/api/artikler", (req: Request, res: Response) => {
  /*
  Henter ut alle artikler sortert etter dato, og rating?!
  */
  artikkelDao.getAll((status, data) => {
    res.status(status);
    res.json(data);
  });
});

app.get("/api/artikler/:id/", (req: Request, res: Response) => {
  /*
  Henter ut artikkelen med matchende artikkel nr
  Returnerer resource not found error hvis artikkel ikke finnes
  */
  artikkelDao.getOne(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

app.get("/api/artikler/:kategori", (req: Request, res: Response) => {
  /*
  Henter ut alle artikler med denne kategorien, sortert på dato
  Returnerer resource not found error hvis artikkel ikke finnes
  */
  artikkelDao.getAllByCategory(req.params.kategori, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

app.post("/api/artikler", (req: Request, res: Response) => {
  /*
  Henter JSON objekt og lagrer inn i mysql
  Viser siden med artikkelen som svar på requesten.
  (res.status(400) hvis brukeren mangler diverse felt (bruk joi))
  */
  const result = Joi.validate(req.body, artikkel_skjema); //sjekker at req.body inneholder
  //de tingene vi forlanger at de skal inneholde

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }else{
    artikkelDao.createOne(req.body, (status, data) => {
      res.status(status);
      res.json(data);
    });
  }
});

app.put("/api/artikler/:id", (req: Request, res: Response) => {
  /*
  Denne skal endre artikkelen
  404 feil: finner ikke artikkelen vi skal endre
  400 feil: validering av input ikke godkjent.

  Returnerer den oppdaterte artikkelen.
  */

  const result = Joi.validate(req.body, artikkel_skjema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }else{
    artikkelDao.putOne(req.body, (status, data) => {
      res.status(status);
      res.json(data);
    });
  }

});

app.delete("/api/artikler/:id", (req: Request, res: Response) => {
  console.log("fikk request på delete");
  /*
  404 feil: artikkelen vi ønsker å slette finnes ikke
  Hvis ok -> sletter i MySQL og sender den sletta artikkelen tilbake
  */
  artikkelDao.deleteOne(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

const port = process.env.PORT || 3000;
export let listen = new Promise<void>((resolve, reject) => {
  app.listen(3000, error => {
    if (error) reject(error.message);
    console.log('Server started');
    resolve();
  });
});
