import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-pattern';


  tiles = [
    {text: 'A'},
    {text: 'B'},
    {text: 'C'},
    {text: 'D'},
    {text: 'E'},
    {text: 'F'},
    {text: 'G'},
    {text: 'H'},
    {text: 'I'}
  ];
}
