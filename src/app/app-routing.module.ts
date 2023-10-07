import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ChapterComponent } from './chapter/chapter.component';

const routes: Routes = [
  // {
  //   path: 'tutorial/:subject',
  //   component: LayoutComponent,
  //   children: [
  //     {
  //       path: 'chapter/:chapter',
  //       component: ChapterComponent
  //     }
  //   ]
  // }
  // {
  //   path: 'tutorial/:tutorial/chapter/:chapter',
  //   component: ChapterComponent
  // }
  {
    path: 'tutorial/:subject',
    component: LayoutComponent,
  },
  {
    path: 'tutorial/:subject/:chapter',
    component: LayoutComponent,
    // children: [
    //   {
    //     path: 'chapter/:chapter',
    //     component: ChapterComponent
    //   },
      // {
      //   path: '',
      //   redirectTo: 'chapter/1',
      //   pathMatch: 'full'
      // }
    // ]
  },
  // {
  //   path: 'parent/:parentId',
  //   component: ParentComponent,
  //   children: [
  //     {
  //       path: 'child/:childId',
  //       component: ChildComponent
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
