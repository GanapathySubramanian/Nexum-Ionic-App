import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseURL='http://localhost:5000/api/';
  constructor(private httpclient: HttpClient) { }

  uploadPost(data: any){
    console.log(data);
    return this.httpclient.post(`${this.baseURL}addpost/`,data);
  }

  getPublicPost(){
    return this.httpclient.get(`${this.baseURL}publicposts`);
  }

}
