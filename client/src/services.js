// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);

class Article {
  id: number;
  tittel: string;
  innhold: string;
  kategori: string;
  isViktig:  number;
  bildeLink: string;
  bildeTekst: String;
}

class SQLResult {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}

class ArtikkelService {
  getArticles(): Promise<Article[]> {
    return axios.get('/api/artikler');
  }

  getArticle(id: number): Promise<Article> {
    console.log("searching for article with id: " + id);
    return axios.get('/api/artikler/' + id);
  }

  updateArticle(article: Article): Promise<SQLResult> {
    return axios.put('/api/artikler/', article);
  }
  addArticle(article : Article) : Promise<SQLResult>{
    return axios.post('/api/artikler', article);
  }
}
export let artikkelService = new ArtikkelService();
