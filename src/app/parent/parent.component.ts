// parent.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parent',
  template: `
    <p>Parent ID: {{ parentId }}</p>
    <router-outlet></router-outlet>
  `,
})
export class ParentComponent implements OnInit {
  parentId: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.parentId = this.route.snapshot.paramMap.get('parentId');
  }
}
