import { Component } from '@angular/core';
import { InputComponent } from "../../shared/inputComponent/inputComponent";
import { Creditur } from '../../../model/creditur.interface';
import { PaymentScheduleService } from '../../services/payment-schedule-service';
import { ApiService } from '../../services/api/api-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-creditur',
  imports: [InputComponent],
  templateUrl: './add-creditur.html',
  styleUrl: './add-creditur.scss'
})
export class AddCreditur {
  constructor(
    private scheduleService: PaymentScheduleService,
    private apiService: ApiService,
    private router: Router
  ){}
  onFormSubmit(newKreditur: Omit<Creditur, 'dueDate'>): void {
    const dataToSend = {
      ...newKreditur,
      dueDate: this.scheduleService.calculateDueDate(newKreditur.tanggalPengajuan)
    };
    this.apiService.addData(dataToSend).subscribe({
      next: () => {
        this.router.navigate(['/home']); // redirect ke home setelah tambah
      },
      error: (err) => {
        // handle error jika perlu
        console.error(err);
      }
    });
  }
}