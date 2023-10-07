import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ContentService } from 'src/services/content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.v2.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'codingbites_client';
  pageContent = '';

  constructor(private contentService: ContentService){}

  ngOnInit(): void {

    // this.contentService.getPage(1).subscribe(
    //   page => {
    //     console.log('Page', page);
    //     this.pageContent = page.content.rendered;
    //   },
    //   error => {
    //     console.error('Error fetching page:', error);
    //   }
    // );
  }

}
