import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contact.service';
import { ToastrService } from 'ngx-toastr';
import { ContactForm } from '../models/contact.model';

@Component({
  selector: 'app-messagesadmin',
  templateUrl: './messagesadmin.component.html',
  styleUrls: ['./messagesadmin.component.css']
})
export class MessagesadminComponent implements OnInit {

  messages: ContactForm[] = [];
  searchTerm: string = '';
  forms: any[] = [];
  filteredforms: any[] = [];
  constructor(private toastr: ToastrService, private contactService: ContactService) { }

  ngOnInit(): void {
    this.getAllMessages();
    this.contactService.getAllMessages().subscribe((data: any[]) => {
      this.forms = data;
      this.filteredforms = data;
    });
  }
  filterForms() {
    console.log('Search Term:', this.searchTerm); // Ajoutez cette ligne
    if (this.searchTerm) {
      this.filteredforms = this.forms.filter(user =>
        user.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.prenom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredforms = this.forms;
    }
    console.log('Filtered Users:', this.filteredforms); // Ajoutez cette ligne
  }
  
  getAllMessages() {
    this.contactService.getAllMessages().subscribe(
      (res: ContactForm[]) => {
        this.messages = res;
      },
      (err: any) => {
        console.error('Error fetching users:', err);
      }
    );
  }

  delete(userId: string) {
    this.contactService.deleteMessage(userId).subscribe(
      (res) => {
        console.log('msg deleted successfully');
        this.toastr.success('Message supprimé avec succés.');
        this.getAllMessages(); 
      },
      (err) => {
        console.error('Error deleting msg', err);
      }
    );
  }

}