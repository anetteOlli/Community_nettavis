// @flow

const Dao = require("./dao.js");

class Article {
  tittel: string;
  innhold: string;
  id: number;
  kategori: string;
  bildeLink: string;
  bildeTekst: string;
  isViktig: boolean;
  avgRating: number;
  opprettet: string;
  endret: string;
}

class sqlResult {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}

module.exports = class ArtikkelDao extends Dao {
  getAll(callback: (Article[]) => mixed) {
    super.query(
      "SELECT Artikler.id, Artikler.tittel, Artikler.innhold, Artikler.bildeLink, Artikler.bildeTekst, Artikler.isViktig, AVG(rating_artikler.rating) AS avgRating, DATE_FORMAT(Artikler.tidspunktOpprettet, '%Y-%m-%d %H:%i') AS opprettet, DATE_FORMAT(Artikler.tidspunktEndret, '%Y-%m-%d %H:%i') AS endret  FROM Artikler LEFT JOIN rating_artikler ON(Artikler.id = rating_artikler.id) GROUP BY Artikler.id ORDER BY avgRating DESC",
      [],
      callback
    );
  }

  getOne(id: string, callback: Article => mixed) {
    super.query("select id, tittel, innhold, bildeLink, bildeTekst, isViktig from Artikler where id=?", [id], callback);
  }
  getAllByCategory(kategori: string, callback: Article => mixed) {
    super.query(
      "SELECT * FROM Artikler WHERE kategori=?",
      [kategori],
      callback
    );
  }

  createOne(json: Article, callback: sqlResult => mixed) {
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

  deleteOne(id: string, callback: sqlResult => mixed) {
    super.query("DELETE FROM rating_artikler WHERE id=?", [id], () =>
      super.query("DELETE FROM Artikler WHERE id=?", [id], callback)
    );
  }
  putOne(json: Article, callback: sqlResult => mixed) {
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
