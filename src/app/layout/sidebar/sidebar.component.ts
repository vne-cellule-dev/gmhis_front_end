import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faNapster } from '@fortawesome/free-brands-svg-icons';
import { faBell, faBox, faTachometerAlt,faShoppingCart, faCubes, faChartLine, faClipboardList, faCartArrowDown, faCartPlus, faCashRegister, faUser, faFileInvoiceDollar, faHeadset, faHome, faUsers,faUserAlt, faKey, faDollarSign, faLongArrowAltRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { LocalAuthorityEnum } from 'src/app/_enum/localAuthority.enum';
import { SideBar1MenuAuthorityEnum } from 'src/app/_enum/sideBar1MenuAuthority.enum';

import { AssetsService } from 'src/app/_services/assets.service';
import { CustomerOrderService } from 'src/app/_services/customer-order.service';
import { InventoryService } from 'src/app/_services/inventory.service';
import { NotifService } from 'src/app/_services/notif.service';
import { StockEntryService } from 'src/app/_services/stock-entry.service';
import { TransfertService } from 'src/app/_services/transfert.service';
import { UserService } from 'src/app/_services/user.service';

import { SubSink } from 'subsink';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  private subs = new SubSink();

  faHome = faHome;
  faTachometerAlt = faTachometerAlt;
  faUsers = faUsers;
  faUser = faUser;
  faKey = faKey;
  faMoney = faDollarSign;
  falOGOUT = faSignOutAlt



  /**
   * number to display when make a transfer or confirm transfer
   */
  public stockNotification: boolean = false;
  public CustomerSaleNotification : boolean = false;
  public transfertNotification: number = 0;
  public depotageNotification: number = 0;
  public stockEntryNotification: number = 0;
  public customerOderNotification : number = 0;
  public InventoryDepotNotification : number = 0;
  public InventoryPlannigNotification : number = 0;
  public assetNotification : number = 0;

  public  menuItem : string;

  constructor(
    private userService: UserService,
    private notificationService: NotifService,
    private transferService: TransfertService,
    private stockEntryService: StockEntryService,
    private customerOrderService : CustomerOrderService,
    private inventoryService : InventoryService,
    private assetService : AssetsService
     ) {


    }

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.menuItem = localStorage.getItem('menuItem');
    this.notificationService.getsideBarNotificationMsg().subscribe(
      response => {
        this.menuItem = response;
        ;
      }
      
    )
  

   }
// dashboard
   get canAccessDashBoard() {
    return this.userService.checkAuthority(SideBar1MenuAuthorityEnum.ACCESS_DASHBOARD);
  }

  get canAccessPatient() {
    return this.userService.checkAuthority(SideBar1MenuAuthorityEnum.ACCESS_PATIENT);
  }

  get canAccessAdmission() {
    return this.userService.checkAuthority(SideBar1MenuAuthorityEnum.ACCESS_ADMISSION);
  }

  get canAccessCaisse() {
    return this.userService.checkAuthority(SideBar1MenuAuthorityEnum.ACCESS_CAISSE);
  }

  get canAccessInvoiceAssurance() {
    return this.userService.checkAuthority(SideBar1MenuAuthorityEnum.ACCESS_INSURANCE_INVOICE);
  }

  get canAccessConstantTaking() {
    return this.userService.checkAuthority(SideBar1MenuAuthorityEnum.ACCESS_CONSTANT_TAKING);
  }

  get canAccessWaitingRoom() {
    return this.userService.checkAuthority(SideBar1MenuAuthorityEnum.ACCESS_WAITING_ROOM);
  }


  get canAccessPharmacy() {
    return this.userService.checkAuthority(SideBar1MenuAuthorityEnum.ACCESS_PHARMACY);
  }

  get canAccessLaboratory() {
    return this.userService.checkAuthority(SideBar1MenuAuthorityEnum.ACCESS_LABORATORY);
  }

  get canAccessHospitalisation() {
    return this.userService.checkAuthority(SideBar1MenuAuthorityEnum.ACCESS_HOSPITALISATION);
  }

  get canAccessStatistics() {
    return this.userService.checkAuthority(SideBar1MenuAuthorityEnum.ACCESS_PHARMACY);
  }

 
  /** */

  menuItemFunction(menuItem : string){
    switch (menuItem) {
      case 'Dashboard':
        this.menuItem = 'Dashboard';
        localStorage.setItem('menuItem', menuItem);
        break;
      case 'patient':
        this.menuItem = 'patient';
        localStorage.setItem('menuItem', menuItem);
        break;
        case 'admission':
        this.menuItem = 'admission';
        localStorage.setItem('menuItem', menuItem);
        break;
      case 'invoice':
        this.menuItem = 'invoice';
        localStorage.setItem('menuItem', menuItem);
        break; 
      case 'insuranceBill':
        this.menuItem = 'insuranceBill';
        localStorage.setItem('menuItem', menuItem);
        break;
        case 'constantWaitingRoom':
        this.menuItem = 'constantWaitingRoom';
        localStorage.setItem('menuItem', menuItem);
        break;
        case 'pharmacy':
          this.menuItem = 'pharmacy';
          localStorage.setItem('menuItem', menuItem);
          break;
          case 'laboratory-exam':
            this.menuItem = 'laboratory-exam';
            localStorage.setItem('menuItem', menuItem);
            break;
        case 'waitingRoom':
        this.menuItem = 'waitingRoom';
        localStorage.setItem('menuItem', menuItem);
      default:
        break;
    }
  }

}
