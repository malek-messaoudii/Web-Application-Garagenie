import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from '../utilisateur.service';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const backendURL = 'http://localhost:4000/user';

@Component({
  selector: 'app-utilisateursadmin',
  templateUrl: './utilisateursadmin.component.html',
  styleUrls: ['./utilisateursadmin.component.css']
})
export class UtilisateursadminComponent implements OnInit {
  @Input() user!: User;
  @Output() update = new EventEmitter<User>();
  formData1: User = {} as User;
  utilisateurs: User[] = [];
  selectedUser?: User;
  searchTerm: string = '';
  users: User[] = [];
  filteredUsers: User[] = [];
  userRoles = [
    { key: 'garagiste', label: 'Garagistes' },
    { key: 'clientpro', label: 'Clients Pro' },
    { key: 'clientprivate', label: 'Clients Private' },
  ];
  showForm = false; 
  selectedPersonType: string = 'client';
  selectedPersonCategory: string = 'physique';
  formData: any = {};
  errorMessage: string = '';

  constructor(
    private toastr: ToastrService,
    private utilisateurService: UtilisateurService,
    private http: HttpClient, private router: Router, 
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.utilisateurService.getAllUsers().subscribe(data => {
      let deletedUsers = JSON.parse(sessionStorage.getItem('deletedUsers') || '[]');
      this.users = data.filter(user => !deletedUsers.includes(user._id));
      this.filteredUsers = this.users;
    });
  }

  filterUsersByRole(role: string): User[] {
    return this.users.filter(user => user.role === role);
  }

  removeUser(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.filteredUsers = this.filteredUsers.filter(u => u !== user);

    let deletedUsers = JSON.parse(sessionStorage.getItem('deletedUsers') || '[]');
    deletedUsers.push(user._id);
    sessionStorage.setItem('deletedUsers', JSON.stringify(deletedUsers));
  }

  filterUsers(): void {
    if (this.searchTerm) {
      this.filteredUsers = this.users.filter(user =>
        user.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.prenom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users;
    }
  }

  getAllUsers() {
    this.utilisateurService.getAllUsers().subscribe(
      (res: User[]) => {
        let deletedUsers = JSON.parse(sessionStorage.getItem('deletedUsers') || '[]');
        this.utilisateurs = res.filter(user => !deletedUsers.includes(user._id));
      },
      (err: any) => {
        console.error('Error fetching users:', err);
        this.toastr.error('Error fetching users', 'Error');
      }
    );
  }

  delete(userId: string) {
    this.utilisateurService.deleteUser(userId).subscribe(
      (res) => {
        this.getAllUsers(); // Pour rafraîchir la liste des utilisateurs
      },
      (err) => {
        console.error('Error deleting user', err);
      }
    );
  }
  editUser(user: User): void {
    this.selectedUser = { ...user }; // Sélectionne l'utilisateur à modifier
  }
  
  updateUser(user: User): void {
    this.utilisateurService.updateUser(user).subscribe(
      () => {
        this.toastr.success('User updated successfully');
        this.update.emit(user); // Emit updated user
      },
      (error) => {
        console.error('Error updating user:', error);
        this.toastr.error('Failed to update user. Please try again later.');
      }
    );
  }
  
  
  

  toggleForm() {
    this.showForm = !this.showForm;
  }

  handlePersonTypeChange(event: any) {
    this.selectedPersonType = event.target.value;
    if (this.selectedPersonType === 'garagiste') {
      this.selectedPersonCategory = '';
    } else if (this.selectedPersonType === 'client') {
      this.selectedPersonCategory = 'physique';
    }
  }

  handlePersonCategoryChange(event: any) {
    this.selectedPersonCategory = event.target.value;
  }

  isClientPhysiqueSelected(): boolean {
    return this.selectedPersonType === 'client' && this.selectedPersonCategory === 'physique';
  }

  isClientMoraleSelected(): boolean {
    return this.selectedPersonType === 'client' && this.selectedPersonCategory === 'morale';
  }

  isGaragisteSelected(): boolean {
    return this.selectedPersonType === 'garagiste';
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && changes['user'].currentValue) {
      this.formData1 = { ...this.user };
    }
  }

  onSubmit(): void {
    this.update.emit(this.formData1);
  }

  
  async register(event: any) {
    event.preventDefault();

    try {
      const response: any = await this.http.post(`${backendURL}/register`, this.formData).toPromise();

      if (response && response.user) {
        this.toastr.success('Compte ajouté avec succès!');

        this.formData = {};
      } else {
        this.errorMessage = 'Email ou mot de passe invalide';
      }
    } catch (error) {
      console.error('Error creating user:', error);
      this.errorMessage = 'Une erreur s\'est produite lors de la création du compte.';
    }
  }

}
