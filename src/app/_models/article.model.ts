export interface Article {
  id: number;
  articleSubFamilyId: string;
  description: string;
  imageUrl: any;
  isActive: true;
  name: string;
  qtyAlert: number;
  costPrice :number;
  qtyInStock: number;
  qtyMax: number;
  qtyMin: number;
  reference: string;
  priceDe : number;
  costEuro : number;
  dormantStock: number;
  dollardCost : number;
  qty40 : number;
  custom40 : number;
  cump40 : number;
  qty45 : number;
  custom45 : number;
  cump45 : number;
  qty20 : number;
  custom20 : number;
  cump20 : number;
  salesPriceLowerThanCostPrice: boolean,
  promotionalPriceBelowCostPrice: boolean,
  endPromotionalSaleAtLoss: any,
  endOfSaleAtLoss: any  
}