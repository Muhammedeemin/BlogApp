import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost, PaginatedResponse } from '../../models/blog-post';

@Component({
  selector: 'app-post-list',
  template: `
    <div class="card">
      <h2>Blog Yazıları</h2>
      
      <div class="form-group" style="margin-bottom: 20px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
        <input 
          type="text" 
          placeholder="Blog yazılarında ara..." 
          [(ngModel)]="searchTerm"
          (keyup.enter)="search()"
          style="flex: 1; min-width: 250px;">
        <button class="btn" (click)="search()">Ara</button>
        <button class="btn btn-secondary" (click)="clearSearch()">Temizle</button>
      </div>

      <div *ngIf="loading" class="loading">Yükleniyor...</div>
      <div *ngIf="error" class="error">{{ error }}</div>

      <ul class="post-list" *ngIf="!loading && !error">
        <li *ngFor="let post of posts" class="post-item">
          <h3>
            <a [routerLink]="['/posts', post.id]">{{ post.title }}</a>
          </h3>
          <div class="meta">
            <span>Yazar: {{ post.author }}</span> | 
            <span>Oluşturulma: {{ formatDate(post.createdDate) }}</span> | 
            <span [class]="post.isPublished ? 'badge badge-published' : 'badge badge-draft'">
              {{ post.isPublished ? 'Yayında' : 'Taslak' }}
            </span>
          </div>
          <div class="content">{{ post.content.substring(0, 150) }}...</div>
          <div class="actions">
            <a [routerLink]="['/posts', post.id]" class="btn">Detay</a>
            <a [routerLink]="['/posts', post.id, 'edit']" class="btn btn-success">Düzenle</a>
            <button class="btn btn-danger" (click)="deletePost(post.id)">Sil</button>
          </div>
        </li>
      </ul>

      <div *ngIf="!loading && !error && posts.length === 0" class="loading">
        Henüz blog yazısı bulunmamaktadır.
      </div>

      <div *ngIf="pagination && pagination.totalPages > 1" class="pagination">
        <button class="btn" [disabled]="currentPage === 1" (click)="goToPage(currentPage - 1)">Önceki</button>
        <span>
          Sayfa {{ currentPage }} / {{ pagination.totalPages }} (Toplam: {{ pagination.totalCount }})
        </span>
        <button class="btn" [disabled]="currentPage === pagination.totalPages" (click)="goToPage(currentPage + 1)">Sonraki</button>
      </div>
    </div>
  `,
  styles: []
})
export class PostListComponent implements OnInit {
  posts: BlogPost[] = [];
  loading = false;
  error: string | null = null;
  searchTerm = '';
  currentPage = 1;
  pageSize = 10;
  pagination: PaginatedResponse<BlogPost> | null = null;

  constructor(
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.error = null;

    this.blogService.getAllPosts(this.currentPage, this.pageSize, this.searchTerm || undefined)
      .subscribe({
        next: (response) => {
          this.posts = response.items;
          this.pagination = response;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Blog yazıları yüklenirken bir hata oluştu.';
          this.loading = false;
          console.error(err);
        }
      });
  }

  search(): void {
    this.currentPage = 1;
    this.loadPosts();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 1;
    this.loadPosts();
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadPosts();
    window.scrollTo(0, 0);
  }

  deletePost(id: number): void {
    if (confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      this.blogService.deletePost(id).subscribe({
        next: () => {
          this.loadPosts();
        },
        error: (err) => {
          alert('Blog yazısı silinirken bir hata oluştu.');
          console.error(err);
        }
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

