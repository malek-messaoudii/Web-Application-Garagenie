import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'app-modifadmin',
  templateUrl: './modifadmin.component.html',
  styleUrls: ['./modifadmin.component.css']
})
export class ModifadminComponent implements OnChanges {
  @Input() user!: User;
  @Output() update = new EventEmitter<User>();
  formData: User = {} as User;
  showPopup = false;

  constructor(private utilisateurService: UtilisateurService, private toastr: ToastrService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && changes['user'].currentValue) {
      this.formData = { ...this.user };
    }
  }

  onSubmit(): void {
    this.updateUser(this.formData); // Call updateUser method from service
  }

  updateUser(user: User): void {
    this.utilisateurService.updateUser(user).subscribe(
      () => {
        this.toastr.success('User updated successfully');
        this.update.emit(user); // Emit updated user
        this.showPopup = false; // Close popup after update
      },
      (error) => {
        console.error('Error updating user:', error);
        this.toastr.error('Failed to update user. Please try again later.');
      }
    );
  }

  closePopup(): void {
    this.showPopup = false;
  }

  openPopup(): void {
    this.showPopup = true;
  }
}
