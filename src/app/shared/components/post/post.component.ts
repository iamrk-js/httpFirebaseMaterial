import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ipost } from '../../models/posts-interface';
import { PostsService } from '../../services/posts.service';
import { LoaderService } from '../../services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDalogComponent } from '../mat-dalog/mat-dalog.component';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postId !: string;
  postObj !: Ipost | null;
  constructor(
    private _routes : ActivatedRoute,
    private _router : Router,
    private _postsService : PostsService,
    private _loaderService : LoaderService,
    private _matDialog : MatDialog,
    private _snackBarService : SnackbarService,
  ) { }

  ngOnInit(): void {
    this._routes.params
      .subscribe(res => {
        this.postId = res['postId'];

        if(this.postId){
          this._postsService.fetchPost(this.postId)
            .subscribe(
              res => {  
                this.postObj = res;
                // hide loader
                // this._loaderService.loadingState$.next(false);
              }

          )
        }

      })
  }
  
  onRemove(){
    const dialogConf = this._matDialog.open(MatDalogComponent)

    dialogConf.afterClosed()
      .subscribe(flag => {
       if(flag && this.postObj){
        this._postsService.removePost({...this.postObj, id : this.postId})
          .subscribe(res => {
            console.log(res);
            this._snackBarService.openSnackBar(`The post ${this.postObj?.title} is removed successfully !!!`)
            this.postObj = null
            // this._router.navigate(['/posts'])

          })
       }

      })
  }
}
