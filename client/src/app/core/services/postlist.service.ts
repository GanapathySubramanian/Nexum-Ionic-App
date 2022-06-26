import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Comments } from '../interfaces/comments';
import {  Post } from '../interfaces/post';
enum Visibility{
  private,
  public
};
@Injectable({
  providedIn: 'root'
})

export class PostlistService {
  baseURL='http://localhost:5000/api/';
  constructor( private http: HttpClient) {
  }
  generatePosts(id: any){
    //console.log('In genertae post..'+this.post.length);
    return this.http.get(`${this.baseURL}home/${id}`);
  }
}
