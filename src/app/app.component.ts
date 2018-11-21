import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stuff-it';
  
  navPath: string[] = ['Marine & Lionel', 'Collections', 'Jeux de société'];
}
