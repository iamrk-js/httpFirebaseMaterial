import { Component, OnInit, inject } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Ipost } from '../../models/posts-interface';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
  postArray : Array<Ipost> = [];

  private _postService = inject(PostsService);
  private _loaderService = inject(LoaderService);
  constructor() { }

  ngOnInit(): void {
    this._postService.fetchAllPosts()
      .subscribe(res => {
       this.postArray = res;
       // hide loader
      //  this._loaderService.loadingState$.next(false);
      })
  }

}
