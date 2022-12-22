import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

import { SubSink } from 'subsink';
import { faBirthdayCake, faCartArrowDown, faCartPlus, faClipboardList, faCubes, faDollarSign, faDollyFlatbed, faFileInvoice, faFileInvoiceDollar, faFunnelDollar, faMoneyBill, faMoneyBillAlt, faMoneyBillWaveAlt, faMoneyCheck, faSearchDollar, faShip, faShippingFast, faSignInAlt, faStopCircle, faTasks, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../_services/user.service';
import { DashBoardAuthorityEnum } from '../_enum/dashBoardAuthority.enum';
import { NotifService } from '../_services/notif.service';
import { TransfertService } from '../_services/transfert.service';
import { StockEntryService } from '../_services/stock-entry.service';
import { CustomerOrderService } from '../_services/customer-order.service';
import { InventoryService } from '../_services/inventory.service';
import { PromotionService } from '../_services/promotion.service';
import { RelaunchService } from '../_services/relaunch.service';
import { SupplierOrderingService } from '../_services/supplier-ordering.service';
import { AssetsService } from '../_services/assets.service';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { StockService } from '../_services/stock.service';
import { StockAuthorityEnum } from '../_enum/stockAuthority.enum';
import { CustomersService } from '../_services/customers.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit ,  OnDestroy{ private subs = new SubSink();
  userPasswordMustBeChange: boolean;

  faCartPlus = faCartPlus;
  faSignInAlt = faSignInAlt;
  faShippingFast = faShippingFast;
  faShip = faShip;
  faCubes = faCubes;
  faDollyFlatbed = faDollyFlatbed;
  faTasks = faTasks;
  faClipboardList = faClipboardList;
  faBirthdayCake = faBirthdayCake;
  faFilInvoice = faFileInvoice;
  faCartArrowDown = faCartArrowDown;
  faUndoAlt = faUndoAlt;
  faWindowClose = faWindowClose;
  faDollard = faDollarSign;
  faSearchDollar = faSearchDollar;



  public  menuItem : string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotifService,
    private transferService: TransfertService,
    private stockEntryService: StockEntryService,
    private customerOrderService : CustomerOrderService,
    private inventoryService : InventoryService,
    private promotionService : PromotionService,
    private sideBarNotif : NotifService,
    private relaunchService : RelaunchService,
    private supplierOrderService : SupplierOrderingService,
    private assetService : AssetsService,
    private stockService : StockService,
    private userService:UserService,
    private customerService: CustomersService )
 {
 

  }
  
   // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  todayDate : Date;

  ngOnInit(): void {
    this.todayDate = new Date();
    this.authenticationService.getUserFromLocalStorage();
    this.userPasswordMustBeChange = JSON.parse(localStorage.getItem('user'))['passwordMustBeChange'];
    if (this.userPasswordMustBeChange === true) {
      this.router.navigateByUrl('/reset-password')
    }
  }
  

  menuItemFunction(menuItem : string){
    switch (menuItem) {
      case 'Dashboard':
        this.menuItem = 'Dashboard';
        localStorage.setItem('menuItem', menuItem);
        break;
      case 'article':
        this.menuItem = 'article';
        localStorage.setItem('menuItem', menuItem);
        break;
      case 'stock':
        this.menuItem = 'stock';
        localStorage.setItem('menuItem', menuItem);
        break; 
      case 'depot':
        this.menuItem = 'depot';
        localStorage.setItem('menuItem', menuItem);
        break; 
      case 'inventory':
        this.menuItem = 'inventory';
      localStorage.setItem('menuItem', menuItem);
        break;
      case 'supplier':
        this.menuItem = 'supplier';
      localStorage.setItem('menuItem', menuItem);
        break;
      case 'achat':
        this.menuItem = 'achat';
      localStorage.setItem('menuItem', menuItem);
        break;
      case 'customer':
        this.menuItem = 'customer';
        localStorage.setItem('menuItem', menuItem);
        break;
      case 'customer-order':
        this.menuItem = 'customer-order';
        localStorage.setItem('menuItem', menuItem);
        break;
      case 'invoice':
        this.menuItem = 'invoice';
        localStorage.setItem('menuItem', menuItem);
        break;
      case 'cash-register':
        this.menuItem = 'cash-register';
        localStorage.setItem('menuItem', menuItem);
      default:
        break;
    }
    this.sideBarNotif.sendsideBarNotificationMsg(this.menuItem);
  }
}
