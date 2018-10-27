DROP TABLE IF EXISTS rating_artikler, Artikler, Kategori;
DROP TRIGGER IF EXISTS tidspunkOpprettet_trigger;
DROP TRIGGER IF EXISTS tidspunkEndret_trigger;

CREATE TABLE Kategori(
	kategori VARCHAR(30) PRIMARY KEY
);

CREATE TABLE Artikler(
	tittel VARCHAR(120),
	id INTEGER AUTO_INCREMENT,
	kategori VARCHAR(30) NOT NULL,
	innhold TEXT NOT NULL,
	bildeLink VARCHAR(50),
	bildeTekst TEXT,
	isViktig BOOLEAN NOT NULL,
	tidspunktOpprettet DATETIME,
	tidspunktEndret DATETIME,
	PRIMARY KEY (id),
	FOREIGN KEY (kategori) REFERENCES Kategori (kategori)
);
CREATE TABLE rating_artikler(
	id INTEGER,
	rating INTEGER,
	PRIMARY KEY (id, rating),
	FOREIGN KEY (id) REFERENCES Artikler (id)
);

CREATE TRIGGER tidspunktOpprettet_trigger
BEFORE INSERT ON Artikler FOR EACH ROW SET NEW.tidspunktOpprettet = NOW(), NEW.tidspunktEndret = NOW();

CREATE TRIGGER tidspunktEndret_trigger
BEFORE UPDATE ON Artikler FOR EACH ROW SET NEW.tidspunktEndret = NOW();
