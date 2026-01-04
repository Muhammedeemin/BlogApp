import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-post-create',
  template: `
    <div class="card">
      <h2>Yeni Blog Yazısı Ekle</h2>

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
            {{ submitting ? 'Kaydediliyor...' : 'Kaydet' }}
          </button>
          <button type="button" class="btn btn-secondary" (click)="goBack()">İptal</button>
        </div>
      </form>

      <div *ngIf="error" class="error" style="margin-top: 15px;">{{ error }}</div>
    </div>
  `,
  styles: []
})
export class PostCreateComponent implements OnInit {
  postForm!: FormGroup;
  submitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: [''],
      author: [''],
      isPublished: [false]
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.submitting = true;
      this.error = null;

      this.blogService.createPost(this.postForm.value).subscribe({
        next: (post) => {
          this.router.navigate(['/posts', post.id]);
        },
        error: (err) => {
          this.error = 'Blog yazısı oluşturulurken bir hata oluştu.';
          this.submitting = false;
          console.error(err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }
}

