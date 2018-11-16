// @flow
import axios from 'axios';
import { Article, SQLResult } from './datastructures';
axios.interceptors.response.use(response => response.data);

class ArtikkelService {
  getArticles(): Promise<Article[]> {
    return axios.get('/artikler');
  }

  getArticle(id: number): Promise<Article[]> {
    console.log('searching for article with id: ' + id);
    return axios.get('/artikler/' + id);
  }

  updateArticle(article: Article): Promise<SQLResult> {
    console.log('updating article');
    return axios.put('/artikler/' + article.id.toString(), article);
  }
  addArticle(article: Article): Promise<SQLResult> {
    return axios.post('/artikler', article);
  }
  deleteArticle(id: number): Promise<SQLResult> {
    return axios.delete('/artikler/' + id);
  }
  getArticlesByCategory(kategori: string): Promise<Article[]> {
    return axios.get('/artikler/kategori/' + kategori);
  }
}
export let artikkelService = new ArtikkelService();
