// src/app/models/promotion.model.ts
export interface Promotion {
  _id: string;
  price: number;
  prestation: {
    titre: string;
  },
  mois:string
}

  