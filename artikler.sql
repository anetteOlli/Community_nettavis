DROP TABLE IF EXISTS rating_artikler, Artikler, Kategori;

CREATE TABLE Kategori(
	kategori VARCHAR(30) PRIMARY KEY
);

CREATE TABLE Artikler(
	tittel VARCHAR(120),
	kategori VARCHAR(30) NOT NULL,
	innhold TEXT NOT NULL,
	bildeLink VARCHAR(50),
	isViktig BOOLEAN NOT NULL,
	tidspunktOpprettet DATETIME,
	tidspunktEndret DATETIME,
	PRIMARY KEY (tittel, tidspunktOpprettet),
	FOREIGN KEY (kategori) REFERENCES Kategori(kategori)

);

CREATE TABLE rating_artikler(
	tittel VARCHAR(120),
	tidspunktOpprettet DATETIME,
	rating INTEGER,
	PRIMARY KEY (tittel, tidspunktOpprettet, rating),
	FOREIGN KEY (tittel, tidspunktOpprettet) REFERENCES Artikler(tittel, tidspunktOpprettet)
);
