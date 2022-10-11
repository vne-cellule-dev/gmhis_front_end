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
import { WebsocketService } from '../_services/websocket.service';
import { CustomerOrderService } from '../_services/customer-order.service';
import { InventoryService } from '../_services/inventory.service';
import { PromotionService } from '../_services/promotion.service';
import { RelaunchService } from '../_services/relaunch.service';
import { SupplierOrderingService } from '../_services/supplier-ordering.service';
import { AssetsService } from '../_services/assets.service';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { StockService } from '../_services/stock.service';
import { StockAuthorityEnum } from '../_enum/stockAuthority.enum';
import { ArticleAuthorityEnum } from '../_enum/articleAuthority.enum';
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

  public stockNotification: boolean = false;
  public CustomerSaleNotification : boolean = false;
  public transfertNotification: any = 0;
  public depotageNotification: any = 0;
  public stockEntryNotification: any = 0;
  public customerOderNotification : any = 0;
  public InventoryDepotNotification : any = 0;
  public InventoryPlannigNotification : any = 0;
  public promotionNotification : any = 0;
  public invoiceToRelaunchNotification : any = 0;
  public supplierOrderIncourseNotification : any = 0;
  public containerInSeaNotification : any = 0;
  public assetNotification : any = 0;
  public idleStockNotification : any = 0;
  public blInProgressNotification : any = 0;
  public cumpToCalculate : any = 0;
  public dormantAccount : any = 0;


  public  menuItem : string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotifService,
    private transferService: TransfertService,
    private stockEntryService: StockEntryService,
    private webSocketService: WebsocketService,
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
    // Open connection with server socket
    let stompClient = this.webSocketService.connect();
    stompClient.connect({}, frame => {


  
    });

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
    this.subs.add(
      this.transferService.getNumberOfTransfertToValidated().subscribe(
        (response: number) => {
          this.transfertNotification = response;
          if (this.transfertNotification > 0) {
            this.stockNotification = true;
          }
        }
      )
    )
    /*****************end transfert notification****************** */

    /*****************star Depotage notification****************** */
    this.notificationService.getDepotageNotificationMsg().subscribe(response => {
      this.depotageNotification = response;
      if (this.depotageNotification > 0) {
        this.stockNotification = true;
      }
    })
    this.subs.add(
      this.stockEntryService.getNumberOfDepotageToValidate().subscribe(
        (response: number) => {
          this.depotageNotification = response;
          if (this.depotageNotification > 0) {
            this.stockNotification = true;
          }
        }
      )
    )
    /*****************end transfert notification****************** */
    /*****************star Stock Entry notification****************** */
    this.subs.add(
      this.stockEntryService.getNumberOfStockEntryToValidate().subscribe(
        (response: number) => {
          this.stockEntryNotification = response;
          if (this.stockEntryNotification > 0) {
            this.stockNotification = true;
          }
        }
      )
    )
    /*****************end transfert notification****************** */

    /*****************Start customer Order notification****************** */
  this.subs.add(
    this.customerOrderService.getCustomerOderToDelivery().subscribe(
      (response : any) =>{
        this.customerOderNotification = response;
        if (this.customerOderNotification > 0) {
          this.CustomerSaleNotification = true;
        }
        
      }
    )
  )
    /*****************End customer Order notification****************** */
    /*****************Start inventory showroom notification****************** */
    this.subs.add(
      this.inventoryService.getInventoryShowroomToConsolidate().subscribe(
        (response : any) => {
          this.InventoryDepotNotification = response;
        }
      )
    )
    /*****************End inventory showroom notification****************** */
    /*****************start inventory planning notification****************** */
    this.subs.add(
      this.inventoryService.getInventoryPlanningToPerform().subscribe(
        (response : any) => {
          this.InventoryPlannigNotification = response;
        }
      )
    )
   /*************** */ 
   this.subs.add(
    this.promotionService.getNumberOfPromotionIncourse().subscribe(
      (response : any) => {
        
        this.promotionNotification = response;
      }
    )
  )
  /********* */
  this.subs.add(
    this.relaunchService.getNumberOfInvoiceTorelaunch().subscribe(
      (response : any) => {
        this.invoiceToRelaunchNotification = response;
      }
    )
  )

  this.subs.add(
    this.supplierOrderService.getNumberOfongoingSupplierOrder().subscribe(
      (response : any) => {
        this.supplierOrderIncourseNotification = response;
      }
    )
  )
  this.subs.add(
    this.supplierOrderService.getNumberOContainerInSea().subscribe(
      (response : any) => {
        this.containerInSeaNotification = response;
      }
    )
  )

  this.subs.add(
    this.supplierOrderService.getNumberOfBlInProgress().subscribe(
      (response : any) => {
        this.blInProgressNotification = response;
      }
    )
  )

  /*****************start CUMP to calculate notification****************** */
  this.subs.add(
    this.stockEntryService.getNumberOfCumpToCalculate().subscribe(
      (response: number) => {
        this.cumpToCalculate = response;
      }
    )
  )
  /*****************end transfert notification****************** */


  /*****************start dormant account notification****************** */
  this.subs.add(
    this.customerService.getDormantAccountNumber().subscribe(
      (response: number) => {
        this.dormantAccount = response;
      }
    )
  )
  /*****************end dormant account notification****************** */
  }
  

  public get canSeeCustomerOrderNumber() {
    return this.userService.checkAuthority(DashBoardAuthorityEnum.CUSTOMER_ORDER);
  }

  public get canSeeTransfertNumber() {
    return this.userService.checkAuthority(DashBoardAuthorityEnum.TRANSFERT);
  }

  public get canSeeDepotageToValidateNumber() {
    return this.userService.checkAuthority(DashBoardAuthorityEnum.DEPOTAGE_TO_VALIDATE);
  }

  public get canSeeEntryToConsolidate() {
    return this.userService.checkAuthority(DashBoardAuthorityEnum.STOCK_ENTRY_TO_CONSOLIDATEE);
  }

  public get canInventoryToPerformNumber() {
    return this.userService.checkAuthority(DashBoardAuthorityEnum.INVENTORY_TO_PERFORM);
  }

  public get canSeeInventoryToConsolidate() {
    return this.userService.checkAuthority(DashBoardAuthorityEnum.INVENTORY_TO_CONSOLIDATE);
  }

  public get canSeeCustomerPromotionNumber() {
    return this.userService.checkAuthority(DashBoardAuthorityEnum.CUSTOMER_PROMOTION);
  }

  public get canSeeInvoiceRelaunchNumber() {
    return this.userService.checkAuthority(DashBoardAuthorityEnum.INVOICE_RELAUNCH);
  }

  public get canSeeSupplierOrderNumber() {
    return this.userService.checkAuthority(DashBoardAuthorityEnum.SUPPLIER_ORDER);
  }

  public get canContainerInSeaNumber() {
    return this.userService.checkAuthority(DashBoardAuthorityEnum.CONTAINER_IN_SEA);
  }
  
  public get canAssetToConsolidateNumber() {
    return this.userService.checkAuthority(DashBoardAuthorityEnum.ASSET_TO_CONSOLIDATE);
  }

  public get canAccessIdleStockteNumber() {
    return this.userService.checkAuthority(DashBoardAuthorityEnum.STOCK_DORMANT_LIST);
  }

  public get canCalculateCump() {
    return this.userService.checkAuthority(DashBoardAuthorityEnum.CONTAINER_IN_SEA);
  }

  public get canAccesDormantCustomerAccount() {
    return this.userService.checkAuthority(DashBoardAuthorityEnum.DORMANT_CUSCTOMER_ACCOUNT);
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
