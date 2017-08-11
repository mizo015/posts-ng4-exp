import { Component, OnInit } from '@angular/core';

import { PostsService } from '../../services/posts.service';

import { Post } from '../../interface';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
	loading:boolean; 
	posts:Post[];

	constructor(private postsService:PostsService) { }

	ngOnInit() {
		this.loading = true;
		
		this.postsService.getPosts()
			.subscribe(posts => {
				console.log(posts);
				this.posts = posts
			})
	}

}
