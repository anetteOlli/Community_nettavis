var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json()); // for å tolke JSON i body

let tableMockTest = [{tittel : "hest er best"}, {body : "masseTekst"}, {bunnTekst: "endaMerTekst"}];
let tabletMockTest2 =["tittel2", "massteTekst2", "endaMerTekst2"];
let kategori = ["film", "sport", "natur"];
let kategori2 = ["donald", "mikke", "langbein"];
let test1 = {tittel : "doffen"};
let test2 = {titel: "agurk"};
let samlet = [test1, test2];

app.use(express.static("public"));

app.get("/api/artikler", (req, res) =>{
  /*
  Henter ut alle artikler sortert etter dato
  */
  res.json(samlet);
});

app.get("/api/artikler/:id", (req, res) =>{
  /*
  Henter ut artikkelen med matchende artikkel nr
  Returnerer resource not found error hvis artikkel ikke finnes
  */
  if(req.params.id == "tableMockTest"){
    res.json(tableMockTest);
  }else{
    res.json(tabletMockTest2);
  }
  res.send();
});
app.get("/api/artikler/:kategori", (req, res) =>{
  /*
  Henter ut alle artikler med denne kategorien, sortert på dato
  Returnerer resource not found error hvis artikkel ikke finnes
  */
  if(req.params.kategori == "test"){
    res.json(kategori);
  }else{
    res.json(test1);
  }
  res.send();
});

app.post("/api/artikler", (req, res) =>{
  /*
  Henter JSON objekt og lagrer inn i mysql
  Viser siden med artikkelen som svar på requesten.
  (res.status(400) hvis brukeren mangler diverse felt (bruk joi))
  */
});

app.put("/api/artikler/:id", (req, res) =>{
  /*
  Denne skal endre artikkelen
  404 feil: finner ikke artikkelen vi skal endre
  400 feil: validering av input ikke godkjent.

  Returnerer den oppdaterte artikkelen.
  */
});
app.delete("api/artikler/:id"(req, res) => {
  /*
  404 feil: artikkelen vi ønsker å slette finnes ikke
  Hvis ok -> sletter i MySQL og sender den sletta artikkelen tilbake
  */
})

const port = process.env.PORT || 8080;
var server = app.listen(port);
