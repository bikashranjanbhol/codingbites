import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-material-drawer',
  templateUrl: './material-drawer.component.html',
  styleUrls: ['./material-drawer.component.scss']
})
export class MaterialDrawerComponent {

  @ViewChild(MatDrawer) drawer!: MatDrawer;

}
