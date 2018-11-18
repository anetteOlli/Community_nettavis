// @flow

var mysql = require("mysql");

const ArtikkelDao = require("../../src/dao/ArtikkelDAO.js");
const runsqlfile = require("./runsqlfile.js");
var config = require("./testConfig.js");

var pool = mysql.createPool(config);

let artikkelDao = new ArtikkelDao(pool);

beforeAll(done => {
  runsqlfile("test/dao/create_tables.sql", pool, () => {
    runsqlfile("test/dao/create_testdata.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});

test("get one article from db", done => {
  function callback(status, data) {
    console.log(
      "test get one, callback: status= " +
        status +
        ", data=" +
        JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    expect(data[0].tittel).toBe("hest er best");
    console.log("done " + data[0].tittel);
    done();
  }

  artikkelDao.getOne(1, callback);
});

test("add article to db", done => {
  function callback(status, data) {
    console.log(
      "test createOne, callback: status=" +
        status +
        ", data=" +
        JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }
  artikkelDao.createOne(
    {
      tittel: "mumitrollet",
      kategori: "java",
      innhold: "kjsgljgksfkjljbkj",
      bildeLink: "wwww.mumitrollet.com",
      bildeTekst: "mumitrollet i båt",
      isViktig: 1
    },
    callback
  );
});

test("get all articles from db", done => {
  function callback(status, data) {
    console.log(
      "test get all, callback: status=" +
        status +
        ", data.length=" +
        data.length
    );
    expect(data.length).toBeGreaterThanOrEqual(2);
    done();
  }
  artikkelDao.getAll(callback);
});

test("get all articles from db with category javascript", done => {
  function callback(status, data) {
    console.log(
      "test get all from specific category: status=" +
        status +
        ", data.lenght=" +
        data.length
    );
    expect(data.length).toBeGreaterThanOrEqual(1);
    done();
  }
  artikkelDao.getAllByCategory("javascript", callback);
});

test("delete one article", done => {
  function callback(status, data) {
    console.log(
      "Test deleteOne callback: status=" +
        status +
        ", data.lenght: " +
        data.length +
        ", data=" +
        JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }

  artikkelDao.deleteOne(1, callback);
});

test("update one article", done => {
  function callback(status, data) {
    console.log(
      "Test updateOne, callback: status=" +
        status +
        ", data=" +
        JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    expect(data[0].tittel).toBe("gaute");
    expect(data[0].kategori).toBe("javascript");
    expect(data[0].innhold).toBe("jdakgøjgkaølkfgjø");
    expect(data[0].bildeLink).toBe("veadfadfien");
    expect(data[0].bildeTekst).toBe('adcd');
    expect(data[0].isViktig).toBe(0);
    done();
  }
  artikkelDao.putOne(
    {
      id: 2,
      tittel: "gaute",
      kategori: "javascript",
      innhold: "jdakgøjgkaølkfgjø",
      bildeLink: "veadfadfien",
      bildeTekst: "adcd",
      isViktig: 0
    },
    (status, data) => {
      artikkelDao.getOne(2, callback);
    }
  );
});
