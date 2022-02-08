import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
    providedIn: 'root'
})
export class PostService{

    error = new Subject<string>();

    constructor(private http: HttpClient){}

    createAndStorePost(title: string, content: string){
        const postData = {title: title, content: content};
        this.http.post<{ name: string }>('https://ng-complete-guide-374cb-default-rtdb.firebaseio.com/posts.json', 
        postData,
        {
            observe: 'response'
        })
        .subscribe(responseData => {
            console.log(responseData);   //to get only the body - responseData.body
        }, error => {
            this.error.next(error.message);
        });
    }

    fetchPosts(){
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');             //returns prettier output
        searchParams.append('custom', 'key');                      //does nothing, simply added to show how to add more than 1 params

        return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-374cb-default-rtdb.firebaseio.com/posts.json',
            {
                headers: new HttpHeaders({ 'Custom-Header': 'hello'}),
                params: searchParams,                                         //queryParams
                responseType: 'json'
            }
        ).pipe(
            map(responseData => {
              const postArray: Post[] = [];
              for(const key in responseData){
                if(responseData.hasOwnProperty(key)){
                  postArray.push({...responseData[key], id:key});
                }
              }
              return postArray;
            }),
            catchError(errorRes => {
                //send to analytics
                return throwError(errorRes);
            })
        );
    }

    deletePosts(){
        return this.http.delete('https://ng-complete-guide-374cb-default-rtdb.firebaseio.com/posts.json',
        {
            observe: 'events'                                    //other observe values are body, response, etc..
        }).pipe(
            tap(event => {
                console.log(event);
                if(event.type === HttpEventType.Sent){
                    //...
                }
                if(event.type === HttpEventType.Response){
                    console.log(event.body);
                }
            })
        );
    }
}