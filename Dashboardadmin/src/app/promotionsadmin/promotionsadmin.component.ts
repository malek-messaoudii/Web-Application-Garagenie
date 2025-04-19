import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../promotion.service';
import { Promotion } from '../models/promotion.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-promotionsadmin',
  templateUrl: './promotionsadmin.component.html',
  styleUrls: ['./promotionsadmin.component.css']
})
export class PromotionsadminComponent implements OnInit {
  promotions: Promotion[] = [];
  newPromotion: Promotion = { _id: '', price: 0, prestation: { titre: '' }, mois: '' };

  months: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  prestations = [
    { titre: 'FORFAIT RÉVISION' },
    { titre: 'FORFAIT FREINAGE' },
    { titre: 'FORFAIT AMORTISSEUR' },
    { titre: 'FORFAIT EMBRAYAGE' },
    { titre: 'DÉMARRAGE' },
    { titre: 'FORFAIT KIT DE DISTRIBUTION' },
    { titre: 'DIRECTION' },
    { titre: 'FORFAIT ÉCHAPPEMENT' },
    { titre: 'FORFAIT CLIMATISATION' }
  ];

  constructor(private promotionService: PromotionService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchPromotions();
  }

  fetchPromotions(): void {
    this.promotionService.getAllPromotions().subscribe(data => {
      this.promotions = data;
    });
  }

  addPromotion(): void {
    this.promotionService.addPromotion(this.newPromotion).subscribe(
      data => {
        this.promotions.push(data);
        this.newPromotion = { _id: '', price: 0, prestation: { titre: '' }, mois: '' };
        this.toastr.success('Promotion ajoutée avec succès.');
      },
      error => {
        this.toastr.error('Erreur lors de l\'ajout de la promotion.');
        console.error('Error adding promotion:', error);
      }
    );
  }

  deletePromotion(id: string): void {
    this.promotionService.deletePromotion(id).subscribe(
      () => {
        this.promotions = this.promotions.filter(promotion => promotion._id !== id);
        this.toastr.success('Promotion supprimée avec succès.');
      },
      error => {
        this.toastr.error('Erreur lors de la suppression de la promotion.');
        console.error('Error deleting promotion:', error);
      }
    );
  }
}
