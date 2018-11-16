INSERT INTO Kategori VALUE('agurknytt');
INSERT INTO Kategori VALUE ('internet-of-shit');
INSERT INTO Kategori VALUE ('matlaging');
INSERT INTO Kategori VALUE ('sjdkfl');
INSERT INTO Artikler (tittel, kategori, innhold, bildeLink, bildeTekst, isViktig) VALUE ('hest er best', 'matlaging', 'lage hestepolse i dag', 'www.hest.no', 'bilde av en hest', 0);
INSERT INTO Artikler (tittel, kategori, innhold, bildeLink, bildeTekst, isViktig) VALUE ('javascript programmering', 'javascript', 'blakjadkljgagjkalkgj', 'www.akdgja.com', 'akdfjkjagd', 1 );

INSERT INTO rating_artikler VALUE (1, 4), (2, 3), (1, 5);


SELECT Artikler.tittel, Artikler.innhold, Artikler.bildeLink, Artikler.bildeTekst, Artikler.isViktig, AVG(rating_artikler.rating) AS avgRating, DATE_FORMAT(Artikler.tidspunktOpprettet, '%Y-%m-%d %H:%i') AS opprettet, DATE_FORMAT(Artikler.tidspunktEndret, '%Y-%m-%d %H:%i') AS endret  FROM Artikler LEFT JOIN rating_artikler ON(Artikler.id = rating_artikler.id) GROUP BY Artikler.id ORDER BY avgRating DESC;
