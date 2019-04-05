import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

import { PostsService } from '../../services/posts/posts.service';
import { IPost } from '../../models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public posts : IPost[] = [];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.get_posts().subscribe(
      (res: IPost[]) => {
        this.posts = res["posts"];
      }
    )
  }

  public deletePost(id): void {
    this.posts.forEach(element => {
      if(element.id == id) {
        this.postsService.deletePostByPostId(element.id).subscribe(res => {
          if(res.status == 200) {
            this.posts.splice(this.posts.indexOf(element), 1);
          } else {
            console.log(res.status);
          }
        });
      }
    });
  }

}
