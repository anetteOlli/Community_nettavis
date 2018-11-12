// @flow


//filen er til ære til flow slik at den skal slutte å klage...
export class Article {
  id: number;
  tittel: string;
  innhold: string;
  kategori: string;
  isViktig:  number;
  bildeLink: string;
  opprettet : string;
  bildeTekst: string;
  endret: string;
}

export class SQLResult {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}
