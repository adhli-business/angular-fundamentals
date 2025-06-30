import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api-service';
import { Creditur } from '../../../model/creditur.interface';
import { Table } from "../../shared/table/table";
import { Auth } from '../../shared/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [Table]
})
export class Home implements OnInit {
  parentData: Creditur[] = [];

  constructor(
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef,
    private authService: Auth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiService.getData().subscribe((data) => {
      this.parentData = data;
      this.cdRef.detectChanges();
    });
  }

  onHapus(id: string) {
    this.apiService.deleteData(id).subscribe({
      next: () => {
        // Refresh data setelah hapus
        this.apiService.getData().subscribe((data) => {
          this.parentData = data;
          this.cdRef.detectChanges();
        });
      },
      error: (err) => {
        console.error('Gagal hapus data:', err);
      }
    });
  }

  onDueClicked(item: Creditur) {
    // buat notifikasi due date jika perlu
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
