import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="header">
      <div class="container">
        <h1>Blog Uygulaması</h1>
        <nav class="nav">
          <a routerLink="/posts" class="btn btn-secondary">Blog Listesi</a>
          <a routerLink="/posts/new" class="btn btn-success">Yeni Blog Ekle</a>
        </nav>
      </div>
    </div>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'Blog Uygulaması';
}

