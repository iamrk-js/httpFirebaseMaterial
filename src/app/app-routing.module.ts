import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDashboardComponent } from './shared/components/post-dashboard/post-dashboard.component';
import { PostFormComponent } from './shared/components/post-form/post-form.component';
import { PostCardComponent } from './shared/components/post-card/post-card.component';
import { PostComponent } from './shared/components/post/post.component';

const routes: Routes = [
  {
    path : '', component : PostDashboardComponent
  },
  {
    path : 'posts', component : PostDashboardComponent
  },
  {
    path : 'addpost', component : PostFormComponent
  },
  {
    path : 'posts/:postId', component : PostComponent
  },
  {
    path : 'posts/:postId/edit', component : PostFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
