import { Component, OnInit } from '@angular/core';

import { PostsService } from '../../services/posts.service';

import 'rxjs/add/operator/add'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
	loading:boolean; 
	
	constructor(private postsService:PostsService) { }

	ngOnInit() {
		this.loading = true;
		
		this.postsService.getPosts()
			.then((res) => {
				console.log(res)
			})

	}

}
