import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-stuff',
  template: `
    <mat-form-field (mouseenter)="peekaboo = true" (mouseleave)="peekaboo = false">
      <mat-label>Categories</mat-label>
      <mat-select color="primary" multiple [(value)]="selectedCategories">
        <mat-option *ngFor="let cat of categories" [value]="cat">
          {{ cat }}
        </mat-option>
      </mat-select>
      <mat-hint *ngIf="peekaboo">Peek-a-boo!</mat-hint>
    </mat-form-field>

    <app-product-list [categories]="selectedCategories"></app-product-list>

    <br><br><br><br><br>
  `,
  styles: [
    'mat-form-field { margin: auto; display: block; width: 400px; max-width: 90%; transition: fade-in 500ms all; }'
  ]
})
export class StuffComponent implements OnInit, OnDestroy {
  screenTrace: firebase.performance.Trace;
  categories: string[];
  selectedCategories: any[];
  peekaboo: boolean = false;

  constructor() { }

  ngOnInit() {
    this.getCategories();

    try {
      const perf = firebase.performance();
      this.screenTrace = perf.trace('stuffScreen');
      this.screenTrace.start();
    } catch (e) {
      console.log('No performance tracking', e);
    }
  }

  getCategories() {
    this.categories = [
      '4K Smart TVs',
      'Tablets',
      'Smart Watches',
      'Earbuds & Headphones',
      'Consoles'
    ];
  }

  ngOnDestroy() {
    try {
      this.screenTrace.stop();
    } catch (e) {
    }
  }
}
