import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post';

@Component({
  selector: 'app-post-edit',
  template: `
    <div *ngIf="loading" class="loading">Yükleniyor...</div>
    <div *ngIf="error" class="error">{{ error }}</div>

    <div *ngIf="postForm && !loading" class="card">
      <h2>Blog Yazısını Düzenle</h2>

      <form [formGroup]="postForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="title">Başlık *</label>
          <input 
            type="text" 
            id="title" 
            formControlName="title"
            [class.ng-invalid]="postForm.get('title')?.invalid && postForm.get('title')?.touched">
          <div *ngIf="postForm.get('title')?.invalid && postForm.get('title')?.touched" class="error-message">
            Başlık gereklidir.
          </div>
        </div>

        <div class="form-group">
          <label for="content">İçerik</label>
          <textarea 
            id="content" 
            formControlName="content"
            rows="10"></textarea>
        </div>

        <div class="form-group">
          <label for="author">Yazar</label>
          <input 
            type="text" 
            id="author" 
            formControlName="author">
        </div>

        <div class="form-group">
          <label>
            <input 
              type="checkbox" 
              formControlName="isPublished">
            Yayınla
          </label>
        </div>

        <div class="actions">
          <button type="submit" class="btn btn-success" [disabled]="postForm.invalid || submitting">
            {{ submitting ? 'Güncelleniyor...' : 'Güncelle' }}
          </button>
          <button type="button" class="btn btn-secondary" (click)="goBack()">İptal</button>
        </div>
      </form>

      <div *ngIf="submitError" class="error" style="margin-top: 15px;">{{ submitError }}</div>
    </div>
  `,
  styles: []
})
export class PostEditComponent implements OnInit {
  postForm!: FormGroup;
  post: BlogPost | null = null;
  loading = false;
  submitting = false;
  error: string | null = null;
  submitError: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
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
        this.postForm = this.fb.group({
          title: [post.title, Validators.required],
          content: [post.content],
          author: [post.author],
          isPublished: [post.isPublished]
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Blog yazısı yüklenirken bir hata oluştu.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.postForm.valid && this.post) {
      this.submitting = true;
      this.submitError = null;

      this.blogService.updatePost(this.post.id, this.postForm.value).subscribe({
        next: (post) => {
          this.router.navigate(['/posts', post.id]);
        },
        error: (err) => {
          this.submitError = 'Blog yazısı güncellenirken bir hata oluştu.';
          this.submitting = false;
          console.error(err);
        }
      });
    }
  }

  goBack(): void {
    if (this.post) {
      this.router.navigate(['/posts', this.post.id]);
    } else {
      this.router.navigate(['/posts']);
    }
  }
}

