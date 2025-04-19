import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rdvp',
  templateUrl: './rdvp.component.html',
  styleUrls: ['./rdvp.component.css']
})
export class RdvpComponent implements OnInit {

  rdv: any[] = [];
  rdvWithDevisRec: any[] = [];
  showModal: boolean = false;
  vehicules: any[] = [];
  email: string = '';
  addrdvForm: FormGroup;

  private apiUrl1 = 'http://localhost:4000/vehicules';
  private apiUrl = 'http://localhost:4000/rdv';

  constructor(private http: HttpClient, private toastr: ToastrService, private fb: FormBuilder) {
    this.addrdvForm = this.fb.group({
      vehicule: ['', Validators.required],
      numdevis: ['', Validators.required],
      datesouhaite: ['', Validators.required],
      heuresouhaite: ['', Validators.required],
      titrepres: ['', Validators.required],
      devisrec: [false],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.fetchRendezVous();
  }

  fetchRendezVous(): void {
    this.http.get<any[]>(`${this.apiUrl}/getall`)
      .subscribe(
        (response) => {
          this.rdv = response || [];
          this.separateRendezVous();
        },
        (error) => {
          console.error('Erreur lors de la récupération des rendez-vous:', error);
          this.toastr.error('Erreur lors de la récupération des rendez-vous');
        }
      );
  }

  separateRendezVous(): void {
    this.rdvWithDevisRec = this.rdv.filter(rdv => rdv.devisrec);
  }

  fetchVehicules(): void {
    const email = this.addrdvForm.get('email')?.value;
    if (!email) {
      return;
    }

    this.http.get<any[]>(`${this.apiUrl1}/user/${email}`)
      .subscribe(
        (response) => {
          this.vehicules = response || [];
          if (this.vehicules.length === 0) {
            this.toastr.info('Aucun véhicule trouvé pour cet email');
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des véhicules:', error);
          this.toastr.error('Erreur lors de la récupération des véhicules');
        }
      );
  }

  getEmails(): string[] {
    const emails = this.rdvWithDevisRec.map(rdv => rdv.email);
    return [...new Set(emails)];
  }

  getRdvForEmail(email: string): any[] {
    return this.rdvWithDevisRec.filter(rdv => rdv.email === email);
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.addrdvForm.reset();
  }

  submitRdv(): void {
    if (this.addrdvForm.invalid) {
      return;
    }

    const formData = { ...this.addrdvForm.value };
    formData.vehicule = this.vehicules.find(v => v._id === formData.vehicule)?._id;

    this.http.post<any>(`${this.apiUrl}/addrdv`, formData)
      .subscribe(
        (response) => {
          console.log('Rendez-vous ajouté avec succès:', response);
          this.toastr.success('Rendez-vous ajouté avec succès');
          this.fetchRendezVous();
          this.closeModal();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du rendez-vous:', error);
          this.toastr.error('Erreur lors de l\'ajout du rendez-vous');
        }
      );
  }
}
