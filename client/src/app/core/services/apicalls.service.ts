import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApicallsService {
  baseURL='http://localhost:5000/api/';
  constructor(private http: HttpClient) { }
  getUserDetails(data: any): any{
    return this.http.get(`${this.baseURL}profile/${data}`);
  }
  getUserById(id: any): any{
    return this.http.get(`${this.baseURL}profile/${id}`);
  }
  getPost(id: any): any{

    return this.http.get(`${this.baseURL}selfposts/${id}`);
  }
  findColleague(name: string): any{
    return this.http.get(`${this.baseURL}get/user/${name}`);
  }
  followUser(user: any): any{
    return this.http.post(`${this.baseURL}follow/user`,user);
  }
  unfollowUser(user: any): any{
    return this.http.post(`${this.baseURL}unfollow/user`,user);
  }
  getSuggestionUser(id: any): any{
    return this.http.get(`${this.baseURL}myfollowers/${id}`);
  }
  updateProfilePic(data: any): any{
      return this.http.post(`${this.baseURL}add-profile-pic/`,data);
  }
  updateProfileDetails(data: any): any{
  return this.http.put(`${this.baseURL}updateprofile/`,data);
  }
  addStory(data: any): any{
   return this.http.post(`${this.baseURL}addstory/`,data);

  }
}
