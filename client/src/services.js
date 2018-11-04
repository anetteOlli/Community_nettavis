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

class ArtikkelService {
  getArticles(): Promise<Article[]> {
    return axios.get('/api/artikler');
  }

  getArticle(id: number): Promise<Article> {
    console.log("searching for article with id: " + id);
    return axios.get('/api/artikler/' + id);
  }

  updateArticle(article: Article): Promise<void> {
    return axios.put('/api/artikler/', article);
  }
}
export let artikkelService = new ArtikkelService();
