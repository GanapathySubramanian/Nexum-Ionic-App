import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Comments } from '../interfaces/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {
  baseURL='http://localhost:5000/api/';
  constructor(private httpclient: HttpClient) { }

  uploadComment(data: any){
    console.log(data);
    return this.httpclient.post(`${this.baseURL}add/comment`,data);
  }
  getComments(id: any){
    return this.httpclient.get(`${this.baseURL}getcomments/${id}`);
  }
  //single post
  getpost(id: any){
    return this.httpclient.get(`${this.baseURL}getpost/${id}`);
  }
  addLike(data: any){
    console.log(data);
    return this.httpclient.post(`${this.baseURL}like/`,data);
  }
  getStories(id){
    return this.httpclient.get('http://localhost:5000/api/getstory/'+id);
  }

}
