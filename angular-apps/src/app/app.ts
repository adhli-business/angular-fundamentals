import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { Animal } from '../model/animal.interface';
import { Table } from "./shared/table/table";
import { Creditur } from '../model/creditur.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from './shared/inputComponent/inputComponent';
import { CrediturData } from './services/creditur-data';
import { PaymentScheduleService } from './services/payment-schedule-service';
import { NotificationService } from './services/notification-service';
import { ApiService } from './services/api/api-service';
import { RouterOutlet } from '@angular/router';
import { Home } from './pages/home/home';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
],
  providers: [CrediturData,
    PaymentScheduleService,
    NotificationService
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  parentData: Creditur[] = [];
  wordingMessage: string = '';
  constructor(
    private getCrediturDataService: CrediturData,
    private scheduleService: PaymentScheduleService,
    private notifier: NotificationService,
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getData();
    // this.parentData = this.getCrediturDataService.getData()
    // console.log('Data dari DI: ', this.parentData)
  }

  getData() {
    this.apiService.getData().subscribe((data: any) => {
      console.log('Data dari API: ', data);
      this.parentData = data;
      this.cdRef.detectChanges();
      this.wordingMessage = 'sukses mengambil data dari API';
    }, error => {
      console.error('Error fetching data from API:', error);
      this.wordingMessage = 'gagal mengambil data dari API';
    })
  }

  // onFormSubmit(newKreditur: Omit<Creditur, 'dueDate'>): void {
  //   this.getCrediturDataService.addData(newKreditur);
  //   this.parentData = this.getCrediturDataService.getData();
  // }

    onFormSubmit(newKreditur: Omit<Creditur, 'dueDate'>): void {
  const dataToSend = {
    ...newKreditur,
    dueDate: this.scheduleService.calculateDueDate(newKreditur.tanggalPengajuan)
  };

  this.apiService.addData(dataToSend).subscribe({
    next: (addedData) => {
      this.wordingMessage = '✅ Data berhasil ditambahkan';
      this.getData(); // ambil ulang data agar sinkron
    },
    error: (err) => {
      console.error(err);
      this.wordingMessage = '❌ Gagal menambahkan data';
    }
  });
}

  // onHapus(index: number) {
  //   this.getCrediturDataService.deleteData(index)
  //   this.parentData = this.getCrediturDataService.getData();
  // }

  onHapus(id: string) {
    console.log(id)
  this.apiService.deleteData(id).subscribe({
    next: () => {
      this.wordingMessage = '🗑️ Data berhasil dihapus';
      this.getData();
    },
    error: (err) => {
      console.error(err);
      this.wordingMessage = '❌ Gagal menghapus data';
    }
  });
}

  onDueClicked(item: Creditur): void {
    this.notifier.showDueDateInfo(item.name, item.tanggalPengajuan, item.dueDate);
  }
  //   onDueClicked(item: Creditur): void {
  //     alert(`🔔 Tagihan untuk ${item.name}
  // Tanggal Pengajuan: ${item.tanggalPengajuan.toDateString()}
  // Jatuh Tempo: ${item.dueDate.toDateString()}`);
  //   }

}



// pesanDariAnak: string = '';

// tanganiData(pesan: string){
//   this.pesanDariAnak = pesan;
// }

// protected title = 'angular-apps';
// testVariable: string = 'something';
// anotherVariable: string = 'value pertama';
// isApproved: boolean = true;
// dp: number = 0;
// fruit: string[] = [] // ini adalah cara mendeklarasikan variabel fruit yang bertipe data array of string dan lanjut diassign dengan array kosong
// animal: Array<Animal> = [] // ini adalah cara lain untuk membuat variabel array dengan tipe data object
// animals: Animal[] = [
//   {
//     name: 'badak',
//     age:10
//   },
//   {
//     name :'harimau'
//   }
// ]