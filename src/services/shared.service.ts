// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private routeData = new BehaviorSubject<any>(null);
  currentRouteData = this.routeData.asObservable();

  constructor() { }

  updateRouteData(data: any) {
    this.routeData.next(data);
  }
}