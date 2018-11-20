class Article {
  id: number;
  tittel: string;
  innhold: string;
  kategori: string;
  isViktig: number;
  bildeLink: string;
  opprettet: string;
  bildeTekst: string;
  endret: string;
}

export const artiklerTest: Article[] = [
  {
    id: 1,
    tittel: 'nyhet1',
    innhold: 'innhold1',
    kategori: 'matlaging',
    isViktig: 1,
    bildeLink: 'https:bilde1',
    bildeTekst: 'bildetekst1',
    opprettet: '20186+5616',
    endret: '13564894'
  },
  {
    id: 2,
    tittel: 'nyhet2',
    innhold: 'innhold2',
    kategori: 'matlaging',
    isViktig: 1,
    bildeLink: 'bilde2',
    bildeTekst: 'bildetekst2',
    opprettet: '20186+5616',
    endret: '13564894'
  },
  {
    id: 3,
    tittel: 'nyhet1',
    innhold: 'nyhetnyhetnyhet',
    kategori: 'matlaging',
    isViktig: 1,
    bildeLink:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Komkommer_Cucumis_sativus_%27Melita%27.jpg/375px-Komkommer_Cucumis_sativus_%27Melita%27.jpg',
    bildeTekst: 'adfjalsdkfjf',
    opprettet: '20186+5616',
    endret: '13564894'
  },
  {
    id: 4,
    tittel: 'nyhet1',
    innhold: 'nyhetnyhetnyhet',
    kategori: 'matlaging',
    isViktig: 1,
    bildeLink:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Komkommer_Cucumis_sativus_%27Melita%27.jpg/375px-Komkommer_Cucumis_sativus_%27Melita%27.jpg',
    bildeTekst: 'adfjalsdkfjf',
    opprettet: '20186+5616',
    endret: '13564894'
  }
];
