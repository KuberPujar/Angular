import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Post } from './post/post.model';
import { PostsService } from './posts.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HttpGuide';
 error=null;
  loadedPosts:Post[]= [];
  isFetching=false;

  constructor(private http: HttpClient,private postService:PostsService) {}

  ngOnInit()
  {
    this.isFetching=true;
    this.postService.fetchPosts().subscribe(
      posts=>{
        this.isFetching=false;
        this.loadedPosts=posts;
      },error=>{
        this.isFetching=false;
        this.error=error.message;
      }
    );
  }
  onCreatePost(postData:Post) {
    // Send Http request
this.postService.createAndStorePost(<any>postData.projectId,postData.title,postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching=true;
    this.postService.fetchPosts().subscribe(
      posts=>{
        this.isFetching=false;
        this.loadedPosts=posts;
      },
      error=>{
        this.isFetching=false;
        this.error=error.message;
        console.log(error);
          }
    );
  }

  onClearPosts() {
    // Send Http request
    this.http.delete('http://localhost:8080/project/deleteProjects',
    {
      observe:'events',
      responseType:'json'
    })
    .pipe(
       tap(event=>{
         console.log(event);
         if(event.type===HttpEventType.Sent)
         {
           //...
         }
         if(event.type===HttpEventType.Response)
         {
           console.log(event.body);
         }
       })
    ).subscribe(()=>
    {
     this.loadedPosts=[];
    });
  }

  onHandleError()
  {
    this.error=null;
  }
}
