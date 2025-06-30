import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api-service';
import { Creditur } from '../../../model/creditur.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-creditur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-creditur.html',
  styleUrl: './detail-creditur.scss'
})
export class DetailCreditur {
  id: string | null = null;
  kreditur: Creditur | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef
  ) {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.apiService.getData().subscribe({
        next: (data) => {
          const found = data.find((item: any) => String(item.id) == String(this.id)) ?? null;
          if (found) {
            // Pastikan tanggal bertipe Date
            found.tanggalPengajuan = new Date(found.tanggalPengajuan);
            found.dueDate = new Date(found.dueDate);
            this.kreditur = found;
          } else {
            console.warn('Data tidak ditemukan untuk id:', this.id);
            this.kreditur = null;
          }
          this.loading = false;
          this.cdRef.detectChanges();
        },
        error: (err) => {
          console.error('API error:', err);
          this.loading = false;
          this.cdRef.detectChanges();
        }
      });
    } else {
      this.loading = false;
      this.cdRef.detectChanges();
    }
  }
}
