import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HeaderAuthorityEnum } from 'src/app/_enum/headerAutority.enum';
import { Asset } from 'src/app/_models/asset.model';
import { Delivery } from 'src/app/_models/delivery.model';
import { Entry } from 'src/app/_models/entry.model';
import { Fundraising } from 'src/app/_models/fundraising.model';
import { Invoice } from 'src/app/_models/invoice.model';
import { StockEntry } from 'src/app/_models/stock-entry.model';
import { StockOut } from 'src/app/_models/stockOut.model';
import { Transfert } from 'src/app/_models/transfert.model';
import { User } from 'src/app/_models/user.model';
import { AssetsService } from 'src/app/_services/assets.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DeliveryService } from 'src/app/_services/delivery.service';
import { EntryService } from 'src/app/_services/entry.service';
import { FundraisingService } from 'src/app/_services/fundraising.service';
import { InvoiceService } from 'src/app/_services/invoice.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { Sharedatafromheadertosidebar2Service } from 'src/app/_services/sharedatafromheadertosidebar2.service';
import { StockEntryService } from 'src/app/_services/stock-entry.service';
import { StockOutService } from 'src/app/_services/stock-out.service';
import { TransfertService } from 'src/app/_services/transfert.service';
import { UserService } from 'src/app/_services/user.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import { ExpenseService } from 'src/app/_services/expense.service';
import { Expense } from 'src/app/_models/expense.model';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  @ViewChild('content', { static: false }) private content;

  private subs = new SubSink();
  public user: User;

  showsideBar: boolean;

  searching = false;

  public voucherNumberFound = false;

  objetToshared : any;

  delivery : Delivery;
  
  actions = [
    {id : "sale", value :"Ventes"},
    {id : "transfert", value :"Transferts"},
    {id : "cashEntry", value :"Recouvrement"},
    {id : "expense", value :"Dépenses"},
    {id : "asset", value :"Avoirs"},
    {id : "stockEntry", value :"Entrées en stock"},
    {id : "stockOut", value :"Sorties de stock"},
    {id : "invoice", value :"Factures clients"},

  ]

  searchForm: FormGroup;
  action: string;
  
  tsContent : string;

  searchText: string;

  deliveryModalRef : NgbModalRef;

  showModal = false;
  constructor(private router: Router,
    private readonly sidebarService: NbSidebarService,
    private authService: AuthenticationService,
    private shareDataFromHeaderToSidebar2: Sharedatafromheadertosidebar2Service,
    private deliveryService : DeliveryService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private userService: UserService,
    private notificationService: NotificationService,
    private transfertService : TransfertService,
    private fundraisingService: FundraisingService,
    private assetService: AssetsService,
    private stockEntryService: StockEntryService,
    private stockOutService: StockOutService,
    private invoiceService: InvoiceService,
    private expenseService : ExpenseService
    ) {
      config.backdrop = 'static';
      config.keyboard = false;}

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.user = this.authService.getUserFromLocalStorage(); 
    console.log(this.user.authorities);
               
    this.shareDataFromHeaderToSidebar2.currentSource.subscribe(data => this.showsideBar = data)
    this.searchForm = new FormGroup({ 
      searchText : new FormControl(""),
      action : new FormControl("sale")});
  }

  toggleSidebar() {
    this.sidebarService.toggle(false, 'left');

  }

  toggleCompact() {
    this.sidebarService.toggle(false, 'right');
  }
  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
  showRightSideBarF() {
    this.shareDataFromHeaderToSidebar2.changeData(!this.showsideBar);
  }

  public get canAccessOrderSearchBox() {
    return this.userService.checkAuthority(HeaderAuthorityEnum.PURCHASE_ORDER_SEARCH_BOX);
  }

  public get canAccessNotification() {
    return this.userService.checkAuthority(HeaderAuthorityEnum.NOTIFICATION);
  }

  public get canAccessSetting() {
    return this.userService.checkAuthority(HeaderAuthorityEnum.SETTINGS);
  }


  onsearching() {
    this.delivery = null;
    this.searchText = this.searchForm.get("searchText").value;
     this.action = this.searchForm.get("action").value;
    if (this.searchText.length == 0 && this.action != null) {
      this.searching = false;
    } else {
      this.searching = true;
      
      switch (this.action) {
        case 'sale':
          this.subs.add(
            this.deliveryService.findAllDeliveryByBlNumber(this.searchText).subscribe(
              (response : Delivery)=>{
                if (response != null) { 
                  this.delivery = response;
                  this.voucherNumberFound = true;
                  this.tsContent = "saleContent"
                  if(!this.deliveryModalRef){
                    this.deliveryModalRef =  this.modalService.open(this.content, { size: 'xl' });
                  } 

                }else{
                  this.voucherNumberFound = false;
                }  
                              
              }
            )
          )
            ;
          break;
          case 'transfert':
            this.subs.add(
              this.transfertService.findSingleByTransfertNumber(this.searchText).subscribe(
                (response :Transfert)=>{
                  if (response != null) { 
                    this.voucherNumberFound = true;
                    this.tsContent = "transfertContent";
                      this.deliveryModalRef = this.modalService.open(this.content, { size: 'lg' });
                  }else{
                    this.voucherNumberFound = false;
                  } 
                  ;               
                }
              )
            )
            break;
          case 'cashEntry':
          this.subs.add(
            this.fundraisingService.findByNumber(this.searchText).subscribe(
              (response :Fundraising)=>{
                if (response != null) { 
                  this.voucherNumberFound = true;
                  this.tsContent = "cashEntryContent";
                    this.deliveryModalRef = this.modalService.open(this.content, { size: 'lg' });
                }else{
                  this.voucherNumberFound = false;
                }                
              }
            )
            )
            break;
        case 'asset':
          this.subs.add(
            this.assetService.findAllAssetsByAssetNumber(this.searchText).subscribe(
              (response :Asset[])=>{                        
                if (response.length != 0) { 
                  this.objetToshared = response;
                  this.voucherNumberFound = true;
                  this.tsContent = "assetContent";
                    this.deliveryModalRef = this.modalService.open(this.content, { size: 'xl' });
                  
                }else{
                    this.voucherNumberFound = false;
                }                
                 }
              )
            )
            break;
            case 'stockEntry':
              this.subs.add(
                this.stockEntryService.findByBlNumber(this.searchText).subscribe(
                  (response :StockEntry[])=>{    
                    if (response.length != 0) { 
                      this.voucherNumberFound = true;
                      this.tsContent = "stockEntryContent";
                        this.deliveryModalRef = this.modalService.open(this.content, { size: 'xl' });
                    }else{
                        this.voucherNumberFound = false;
                    }                
                     }
                  )
                )
            break;
            case 'stockOut':
              this.subs.add(
                this.stockOutService.getByStockOutputNumber(this.searchText).subscribe(
                  (response :StockOut)=>{    
                    if (response != null) { 
                      this.voucherNumberFound = true;
                      this.tsContent = "stockOutContent";
                        this.deliveryModalRef = this.modalService.open(this.content, { size: 'xl' });
                    }else{
                        this.voucherNumberFound = false;
                    }                
                     }
                  )
                )
            break;
            case 'invoice':
              this.subs.add(
                this.invoiceService.findAllInvoiceByInvoiceNumber(this.searchText).subscribe(
                  (response :Invoice[])=>{
                    ;
                    if (response.length != 0) { 
                      this.voucherNumberFound = true;
                      this.tsContent = "invoiceContent";
                        this.deliveryModalRef = this.modalService.open(this.content, { size: 'xl' });
                    }else{
                        this.voucherNumberFound = false;
                    }                
                    ;     
                    }
                  )
                  )
              break;
            case 'expense':
              this.subs.add(
              this.expenseService.findByNumber(this.searchText).subscribe(
                (response : Expense) =>{                  
                  if (response != null) { 
                    this.voucherNumberFound = true;
                    this.tsContent = "expenseContent";
                      this.deliveryModalRef = this.modalService.open(this.content, { size:'lg' });
                  }else{
                      this.voucherNumberFound = false;
                  }
                }
              )
              )
            break;
        default:
          break;
      } 
      
    }  
  
  }

closeModal(){
this.deliveryModalRef.close();
this.deliveryModalRef = null
}

updateDeliveryInvoice(){
// this.deliveryModalRef.close();
this.modalService.dismissAll()
this.deliveryModalRef = null
}

showModalForm(){
  this.showModal = !this.showModal;
}
onactionChange(){
  this.onsearching()
// if(this.voucherNumberFound)  this.openModal(content);
}


}
