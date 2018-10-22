const Dao = require("./dao.js");

module.exports = class ArtikkelDao extends Dao {
  getAll(callback) {
    super.query("SELECT * FROM Artikler", [], callback);
  }

  getOne(id, callback) {
    super.query("select * from Artikler where id=?", [id], callback);
  }
  getAllByCategory(id, callback) {
    super.query(
      "SELECT * FROM Artikler WHERE kategori=?",
      [kategori],
      callback
    );
  }

  createOne(json, callback) {
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

  deleteOne(id, callback) {
    super.query("DELETE FROM rating_artikler WHERE id=?", [id], () =>
      super.query("DELETE FROM Artikler WHERE id=?", [id], callback)
    );
  }
  putOne(json, callback) {
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
