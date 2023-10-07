import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/services/content.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit, OnChanges {

  @Input('id') id: string | number | null = null;

  title = '';
  pageContent = '';

  constructor(private route: ActivatedRoute, private contentService: ContentService) {}

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   let wp_page = params.get('chapter');
    //   // Now do something with the userId...
    //   console.log("wp_page", params.get('chapter'));
    //   if(!wp_page) return;
    //   this.contentService.getPost(wp_page).subscribe(
    //     page => {
    //       console.log('Page', page);
    //       this.pageContent = page.content.rendered;
    //     },
    //     error => {
    //       console.error('Error fetching page:', error);
    //     }
    //   );
    // });
    // console.log('subject', this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('subject', this.id);
    if(!this.id) return;
    this.contentService.getPost(this.id).subscribe(
        page => {
          console.log('Page', page);
          this.title = page.title.rendered;
          this.pageContent = page.content.rendered;
        },
        error => {
          console.error('Error fetching page:', error);
        }
      );
  }
}

