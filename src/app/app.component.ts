import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent /*implements OnInit*/ {

  /*public ngOnInit(): void {
    this.addUsers();
  }

  private addUsers(): void {
    const users: any[] = [
      {
        name: 'user',
        lastname: '123',
        email: 'juanalberto@gmail.com'
      }
    ]
    localStorage.setItem('users', JSON.stringify(users));
  }*/
}
