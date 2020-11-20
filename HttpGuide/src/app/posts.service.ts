import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './post/post.model';
import {map , catchError} from 'rxjs/operators';
import { Subject ,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  eror=new Subject<string>();
  constructor(private http:HttpClient) { }
  createAndStorePost(projectId:number,title:string,content:string)
  {
    const postData:Post={projectId:<number><unknown>projectId,title:title,content:content};
    this.http
      .post<{name:any}>(
      'http://localhost:8080/project/createProject',
        postData,
       {
         observe:'response'
       }
      )
      .subscribe(responseData => {
        console.log(responseData);
      },
      error=>{
        this.eror.next(error.message);
      });
  }

  fetchPosts()
  {
    let searchParams=new HttpParams();
    searchParams=searchParams.append('print','pretty');
    searchParams=searchParams.append('custom','key');
    return this.http.get<{[key:string]:Post}>('http://localhost:8080/project/projectList',
    {
      headers:new HttpHeaders({'Custom-header':'hello'}),
      params:searchParams
    })
    .pipe(
      map(responseData=>
        {
          const   postArray:Post[]=[];
          for(const key in responseData)
          {
            if(responseData.hasOwnProperty(key))
            {
              postArray.push({...responseData[key],projectId:<number><unknown>key})
            }
          }
          return postArray;
        }),
    catchError(
      errorRes=>{
        return throwError(errorRes);
      }
    )
    )
    ;
  }

  deletePosts(loadedPost:Post[])
  {
    this.http.delete('http://localhost:8080/project/deleteProjects').subscribe(()=>
    {
     loadedPost=[];
    });
  }
}
