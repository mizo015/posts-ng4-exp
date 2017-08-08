import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PostsService {

  	constructor(private http:Http) {
  		console.log("Posts service connected!!");
	}

	getPosts(){
		this.http.get('https://jsonplaceholder.typicode.com/posts');
	}

}
