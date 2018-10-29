// @flow

const Dao = require("./dao.js");


module.exports = class ArtikkelDao extends Dao {
  getAll(callback) {
    super.query(
      "SELECT Artikler.tittel, Artikler.innhold, Artikler.bildeLink, Artikler.bildeTekst, Artikler.isViktig, AVG(rating_artikler.rating) AS avgRating, DATE_FORMAT(Artikler.tidspunktOpprettet, '%Y-%m-%d %H:%i') AS opprettet, DATE_FORMAT(Artikler.tidspunktEndret, '%Y-%m-%d %H:%i') AS endret  FROM Artikler LEFT JOIN rating_artikler ON(Artikler.id = rating_artikler.id) GROUP BY Artikler.id ORDER BY avgRating DESC",
      [],
      callback
    );
  }

  getOne(id : number, callback) {
    super.query("select * from Artikler where id=?", [id], callback);
  }
  getAllByCategory(kategori : string, callback) {
    super.query(
      "SELECT * FROM Artikler WHERE kategori=?",
      [kategori],
      callback
    );
  }

  createOne(json : JSON, callback) {
    var val = [
      json.tittel,
      json.kategori,
      json.innhold,
      json.bildeLink,
      json.bildeTekst,
      json.isViktig
    ];
    super.query(
      "insert into Artikler (tittel, kategori, innhold, bildeLink, bildeTekst, isViktig) value (?,?,?,?,?,?)",
      val,
      callback
    );
  }

  deleteOne(id : number, callback) {
    super.query("DELETE FROM rating_artikler WHERE id=?", [id], () =>
      super.query("DELETE FROM Artikler WHERE id=?", [id], callback)
    );
  }
  putOne(json : JSON, callback) {
    var val = [
      json.tittel,
      json.kategori,
      json.innhold,
      json.bildeLink,
      json.isViktig,
      json.id
    ];
    super.query(
      "UPDATE Artikler SET tittel=?, kategori=?, innhold=?, bildeLink=?, isViktig=? WHERE id=?",
      val,
      callback
    );
  }
};
