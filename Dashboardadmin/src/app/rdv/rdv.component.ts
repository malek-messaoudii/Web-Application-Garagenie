import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.css']
})
export class RdvComponent implements OnInit {
  rdv: any[] = [];
  rdvWithoutDevisRec: any[] = [];
  showModal: boolean = false;
  formData: any = {};
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
      devisrec :[false],
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
          this.rdv = response || []; // Ensure response is not null
          this.separateRendezVous();
        },
        (error) => {
          console.error('Erreur lors de la récupération des rendez-vous:', error);
          this.toastr.error('Erreur lors de la récupération des rendez-vous');
        }
      );
  }

  separateRendezVous(): void {
    this.rdvWithoutDevisRec = this.rdv.filter(r => !r?.devisrec); // Safe navigation operator
  }

  getEmails(): string[] {
    const emails = this.rdvWithoutDevisRec.map(r => r.email);
    return [...new Set(emails)]; // Return unique emails
  }

  getRdvForEmail(email: string): any[] {
    return this.rdvWithoutDevisRec.filter(r => r.email === email);
  }

  fetchVehicules(): void {
    if (!this.addrdvForm.get('email')?.value) { // Safe navigation operator
      return;
    }

    this.http.get<any[]>(`${this.apiUrl1}/user/${this.addrdvForm.get('email')?.value}`)
      .subscribe(
        (response) => {
          this.vehicules = response || []; // Ensure response is not null
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
  
    // Lors de la soumission, assurez-vous que 'devisrec' est inclus dans les données envoyées
    const formData = { ...this.addrdvForm.value, devisrec: this.addrdvForm.get('devisrec')?.value };
  
    this.formData.vehicule = this.formData.vehicule?._id; // Assurez-vous que cette partie est correctement gérée
  
    this.http.post<any>(`${this.apiUrl}/addrdv`, formData)
      .subscribe(
        (response) => {
          console.log('Rendez-vous ajouté avec succès:', response);
          this.toastr.success('Rendez-vous ajouté avec succès');
          this.fetchRendezVous(); // Rafraîchir la liste des rendez-vous
          this.closeModal(); // Fermer le modal après soumission réussie
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du rendez-vous:', error);
          this.toastr.error('Erreur lors de l\'ajout du rendez-vous');
        }
      );
  }
}
