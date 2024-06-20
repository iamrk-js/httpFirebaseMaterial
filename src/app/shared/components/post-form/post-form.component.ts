import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ipost } from '../../models/posts-interface';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  isInEditMode: boolean = false;
  postForm !: FormGroup;
  postId !: string;
  editPostObj !: Ipost;
  private _postService = inject(PostsService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _loaderService = inject(LoaderService);
  constructor() { }

  ngOnInit(): void {
    this.createPostForm();
    this._route.params
      .subscribe((params: Params) => {
        console.log(params);
        this.postId = params['postId'];
        if (this.postId) {
          this.isInEditMode = true;
          this._postService.fetchPost(this.postId)
            .subscribe(data => {
              this.editPostObj = data!;
              this.postForm.patchValue(this.editPostObj);
              this._loaderService.loadingState$.next(false)
            })
        }
      })
  }

  createPostForm() {
    this.postForm = new FormGroup({
      userId: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
    })
  }

  onPostCreate() {
    if (this.postForm.valid) {
      let newPost = this.postForm.value;
      this._postService.creatPost(newPost)
        .subscribe(res => {
          console.log(res);
          this.postForm.reset();
          this._router.navigate(['/posts'])
        })
    }
  }

  onPostUpdate() {
    if (this.postForm.valid) {
      let updatedObj: Ipost = { ...this.postForm.value, id: this.postId };
      this._postService.updatePost(updatedObj)
        .subscribe(res => {
          // this._loaderService.loadingState$.next(false)
          this.isInEditMode = false;
          this.postForm.reset();
          this._router.navigate(['/posts'])
        })
    }
  }
}
