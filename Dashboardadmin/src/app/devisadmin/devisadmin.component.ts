import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-devisadmin',
  templateUrl: './devisadmin.component.html',
  styleUrls: ['./devisadmin.component.css']
})
export class DevisadminComponent implements OnInit {
  devisList: any[] = [];
  selectedDevis: any = null;
  isOverlayVisible: boolean = false;
  showModal: boolean = false;
  addrdvForm: FormGroup;
  vehicules: any[] = []; // Assume you have a list of vehicles
  garagisteEmails: string[] = [];

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.addrdvForm = this.fb.group({
      numdevis: [{ value: '' }, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      datesouhaite: ['', Validators.required],
      heuresouhaite: ['', Validators.required],
      titrepres: ['', Validators.required],
      vehicule: ['', Validators.required],
      devisrec: [false],
      emailperso: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchDevis();
    this.fetchGaragisteEmails();
  }

  fetchDevis(): void {
    this.http.get<any[]>('http://localhost:4000/devis/getall')
      .subscribe(
        (response) => {
          this.devisList = response;
        },
        (error) => {
          console.error('Erreur lors de la récupération des devis:', error);
        }
      );
  }

  fetchGaragisteEmails(): void {
    this.http.get<any[]>('http://localhost:4000/user/getall?role=garagiste')
      .subscribe(
        (response) => {
          this.garagisteEmails = response.map(user => user.email);
        },
        (error) => {
          console.error('Erreur lors de la récupération des emails des garagistes:', error);
        }
      );
  }

  getEmails(): string[] {
    // Extract unique emails from devisList
    const emails = this.devisList.map(devis => devis.utilisateur.email);
    return [...new Set(emails)];
  }

  getDevisForEmail(email: string): any[] {
    // Filter devisList for a specific email
    return this.devisList.filter(devis => devis.utilisateur.email === email);
  }

  fetchVehiculeById(id: string): void {
    this.http.get<any>(`http://localhost:4000/vehicules/getv/${id}`)
      .subscribe(
        (response) => {
          console.log('Véhicule récupéré:', response);
        },
        (error) => {
          console.error('Erreur lors de la récupération du véhicule:', error);
        }
      );
  }

  openUpdateOverlay(devis: any): void {
    this.selectedDevis = { ...devis };
    this.isOverlayVisible = true;
  }

  closeUpdateOverlay(): void {
    this.isOverlayVisible = false;
    this.selectedDevis = null;
  }

  planifierRdv(devis: any): void {
    this.selectedDevis = devis;
    this.showModal = true;
  
    const vehiculeDetails = `${devis.vehicule.make || 'non renseigné'} - ${devis.vehicule.model || 'non renseigné'} - ${devis.vehicule.immatriculation || 'non renseignée'} - ${devis.vehicule.kilo || 'non renseigné'} km`;
  
    this.addrdvForm.patchValue({
      numdevis: devis.numdevis,
      email: devis.utilisateur.email,
      titrepres: devis.prestation.titre,
      vehicule: vehiculeDetails,
      devisrec: devis.devisrec,
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.addrdvForm.reset();
  }

  submitRdv(): void {
    if (this.addrdvForm.valid) {
      const rdvData = {
        ...this.addrdvForm.getRawValue(),
        devisrec: !!this.addrdvForm.value.devisrec,  // Ensure devisrec is a boolean
        vehicule: this.selectedDevis.vehicule  // Include the vehicle details
      };

      console.log('Submitting RDV data:', rdvData);

      this.http.post<any>('http://localhost:4000/rdv/addrdv', rdvData)
        .subscribe(
          (response) => {
            this.toastr.success('Rendez-vous ajouté avec succès.');
            this.closeModal();
          },
          (error) => {
            this.toastr.error('Erreur lors de l\'ajout du rendez-vous.');
            console.error('Erreur lors de l\'ajout du rendez-vous:', error);
          }
        );
    }
  }

  updateDevis(): void {
    this.http.put<any>(`http://localhost:4000/devis/update/${this.selectedDevis._id}`, this.selectedDevis)
      .subscribe(
        (response) => {
          this.toastr.success('Demande de devis mise à jour avec succès.');
          this.fetchDevis();
          this.closeUpdateOverlay();
        },
        (error) => {
          this.toastr.error('Erreur lors de la mise à jour de la demande de devis.');
          console.error('Erreur lors de la mise à jour de la demande de devis:', error);
        }
      );
  }

  afficherDetails(devis: any): void {
    console.log('Détails du devis:', devis);
  }
}
