// child.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-child',
  template: `
    <p>Child ID: {{ childId }}</p>
  `,
})
export class ChildComponent implements OnInit {
  childId: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.childId = this.route.snapshot.paramMap.get('childId');
  }
}
