import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() items: any[];
  @ViewChild('navMenu', { static: true}) navMenu;

  constructor() { }

  ngOnInit(): void {
  }

}
