import {MediaMatcher} from '@angular/cdk/layout';
import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/services/content.service';

/** @title Responsive sidenav */
@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('snav') snav!: MatSidenav;

  mobileQuery: MediaQueryList;

  fillerNav: any[] = [];

  fillerContent = Array.from(
    {length: 50},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  chapterId: string | number | null = null;
  subject: string = '';

  private _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private route: ActivatedRoute, private contentService: ContentService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(params => {
    //   let tutorial = params.get('chapter');
    //   // Now do something with the userId...
    //   console.log("tutorial", tutorial);
    //   if(!tutorial) return;
    //   this.contentService.getPostsByCategorySlug(tutorial).subscribe(
    //     tutorials => {
    //       console.log('tutorials', tutorials);
    //       // this.pageContent = page.content.rendered;
    //     },
    //     error => {
    //       console.error('Error fetching page:', error);
    //     }
    //   );
    // });
    const subject = this.route.snapshot.paramMap.get('subject');
    const chapter = this.route.snapshot.paramMap.get('chapter');
    if(subject){
      this.subject = subject;
      this.contentService.getCategoryID(subject).subscribe(response => {
        const category = response[0];  // Assume the slug is unique and response[0] exists
        if (category) {
          // this.contentService.getPostsByCategoryID(category.id).subscribe(postsResponse => {
          //   console.log('postsResponse', postsResponse);
          //   this.fillerNav = postsResponse;
          //   const isCategoryAvailable = postsResponse.find(category => category.id.toString() === chapter);
          //   if(isCategoryAvailable){
          //     this.chapterId = chapter;
          //   }else{
          //     this.router.navigate(['/tutorial', subject, postsResponse[0]?.id]);
          //     this.chapterId = postsResponse[0]?.id;
          //   }
          // });

          this.contentService.getCombinedData(category.id).subscribe(
            combinedData => {
              console.log("combinedData", combinedData);
              this.fillerNav = combinedData;
              if(!chapter) {
                const firstChapter = combinedData[0]?.children ? combinedData[0]?.children[0] : combinedData[0];
                const __chapterId = firstChapter ? firstChapter.id : null;
                this.router.navigate(['/tutorial', subject, __chapterId]);
              }else{
                this.chapterId = chapter
              }
            },
            error => {
              console.error('There was an error fetching the data:', error);
            }
          );
        }else{
          console.log("Nothing found !!!!");
        }
      });
    }
  }

  ngAfterViewInit() {
    console.log(this.snav);
    if(!this.mobileQuery.matches){
      this.snav.toggle();
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  navigateToChapter(chapterId: string | number) {
    console.log('Navigate', this.subject, this.chapterId);
    this.chapterId = chapterId;
    this.router.navigate(['/tutorial', this.subject, this.chapterId]);
  }
}


/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */