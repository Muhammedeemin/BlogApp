import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post';

@Component({
  selector: 'app-post-detail',
  template: `
    <div *ngIf="loading" class="loading">Yükleniyor...</div>
    <div *ngIf="error" class="error">{{ error }}</div>

    <div *ngIf="post && !loading" class="card">
      <div class="actions" style="margin-bottom: 20px;">
        <button class="btn btn-secondary" (click)="goBack()">Geri</button>
        <a [routerLink]="['/posts', post.id, 'edit']" class="btn btn-success">Düzenle</a>
        <button class="btn btn-danger" (click)="deletePost()">Sil</button>
      </div>

      <h2>{{ post.title }}</h2>
      <div class="meta">
        <span>Yazar: {{ post.author }}</span> | 
        <span>Oluşturulma: {{ formatDate(post.createdDate) }}</span> | 
        <span [class]="post.isPublished ? 'badge badge-published' : 'badge badge-draft'">
          {{ post.isPublished ? 'Yayında' : 'Taslak' }}
        </span>
      </div>
      <div class="content">{{ post.content }}</div>
    </div>
  `,
  styles: []
})
export class PostDetailComponent implements OnInit {
  post: BlogPost | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPost(+id);
    }
  }

  loadPost(id: number): void {
    this.loading = true;
    this.error = null;

    this.blogService.getPostById(id).subscribe({
      next: (post) => {
        this.post = post;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Blog yazısı yüklenirken bir hata oluştu.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deletePost(): void {
    if (this.post && confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      this.blogService.deletePost(this.post.id).subscribe({
        next: () => {
          this.router.navigate(['/posts']);
        },
        error: (err) => {
          alert('Blog yazısı silinirken bir hata oluştu.');
          console.error(err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/posts']);
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

