import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { BankAuthorityEnum } from 'src/app/_enum/bankAuthority.enum';
import { CarrierAuthorityEnum } from 'src/app/_enum/carrierAuthority.enum';
import { CityAuthorityEnum } from 'src/app/_enum/cityAuthority.enum';
import { CommuneAuthorityEnum } from 'src/app/_enum/communeAuthority.enum';
import { containerCostAuthorityEnum } from 'src/app/_enum/containerCost.enum';
import { CountryAuthorityEnum } from 'src/app/_enum/countryAuthority.enum';
import { DriverAuthorityEnum } from 'src/app/_enum/driverAutorith.enum';
import { EditorAuthorityEnum } from 'src/app/_enum/editorAuthority.enum';
import { FreightForwarderAuthorityEnum } from 'src/app/_enum/freightForwarderAuthority.enum';
import { PortAuthorityEnum } from 'src/app/_enum/portAuthority.enum';
import { RoleAuthorityEnum } from 'src/app/_enum/roleAuthorityEnum';
import { ShipperAuthorityEnum } from 'src/app/_enum/shipperAuthority.enum';
import { SideBar2MenuAuthorityEnum } from 'src/app/_enum/sideBar2MenuAuthority.enum';
import { StockOutReasonAuthorityEnum } from 'src/app/_enum/stockOutReason.enum';
import { UserAuthority } from 'src/app/_enum/userAuthority.enum';
import { VehiculeAuthorityEnum } from 'src/app/_enum/vehicule.Authority.enum';
import { PortService } from 'src/app/_services/port.service';
import { UserService } from 'src/app/_services/user.service';

import { SubSink } from 'subsink';

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.scss'],
})
export class Sidebar2Component implements OnInit, OnDestroy {
  private subs = new SubSink();

  items2: NbMenuItem[] = [
    {
      title: 'ACTES',
      icon: 'folder-outline',
      hidden: !this.canAccessBasicFiles(),
      children: [
        {
          title: 'Liste des actes',
          link: '/act/list',
          icon: 'minus-outline',
          // hidden : !this.canAccessEditor()
        },
        {
          // title: 'Categories des actes',
          title: 'Spécialités des actes',
          link: '/act/category',
          icon: 'minus-outline',
        },
        {
          title: 'familles des actes',
          link: '/act/family',
          icon: 'minus-outline',
        },
        {
          title: 'codes des actes',
          link: '/act/code',
          icon: 'minus-outline',
        },
      ],
    },
    {
      title: 'ANTECEDENT',
      icon: 'folder-outline',
      hidden: !this.canAccessBasicFiles(),
      children: [
        {
          title: 'Liste des antecedents',
          link: '/antecedent/list',
          icon: 'minus-outline',
        },
        {
          title: 'familles des antecedens',
          link: '/antecedent/family',
          icon: 'minus-outline',
        },
      ],
    },
    {
      title: 'ASSURANCES',
      icon: 'folder-outline',
      hidden: !this.canAccessBasicFiles(),
      children: [
        {
          title: 'Assurances/Mutuelles',
          link: '/insurance/list',
          icon: 'minus-outline',
        },
        {
          title: 'établissements garant',
          link: '/insurance/subscriber-list',
          icon: 'minus-outline',
        },
      ],
    },
    {
      title: 'CAISSES DE RÉGLEMENTS',
      icon: 'folder-outline',
      hidden: !this.canAccessBasicFiles(),
      children: [
        {
          title: 'Liste des caisses',
          link: '/cash-register/list',
          icon: 'minus-outline',
        },
      ],
    },
    {
      title: 'CAISSIERS',
      icon: 'folder-outline',
      hidden: !this.canAccessBasicFiles(),
      children: [
        {
          title: 'Liste des caissiers',
          link: '/cashier/list',
          icon: 'minus-outline',
        },
      ],
    },
    {
      title: 'CONSTANTES MEDICALES',
      icon: 'folder-outline',
      hidden: !this.canAccessBasicFiles(),
      children: [
        {
          title: 'Groupe de constante',
          link: '/constant/domain',
          icon: 'minus-outline',
        },
        {
          title: 'Constante type',
          link: '/constant/type',
          icon: 'minus-outline',
        },
      ],
    },
    {
      title: 'NOS CONVENTIONS',
      icon: 'folder-outline',
      hidden: !this.canAccessBasicFiles(),
      children: [
        {
          title: 'Liste convention',
          link: '/convention/list',
          icon: 'minus-outline',
        },
      ],
    },
    {
      title: 'DOCUMENTS TYPES',
      icon: 'folder-outline',
      children: [
        {
          title: 'Bilan type',
          link: '/document/check-up',
          icon: 'minus-outline',
        },
        {
          title: 'Certificat type',
          link: '/document/certificat',
          icon: 'minus-outline',
        },
        {
          title: 'courier type',
          link: '/document/mail',
          icon: 'minus-outline',
        },
        {
          title: 'Ordannance type',
          link: '/document/prescription',
          icon: 'minus-outline',
        },
        {
          title: 'Cro type',
          link: '/document/cro',
          icon: 'minus-outline',
        },
        {
          title: 'Famille de cro ',
          link: '/document/cro-family',
          icon: 'minus-outline',
        },
      ],
    },
    {
      title: 'NOS ETABLISSEMENT',
      icon: 'folder-outline',
      children: [
        {
          title: 'Liste des établissement',
          // link: '/constant/domain',
          icon: 'minus-outline',
        }
      ],
    },
    {
      title: 'PATHOLOGIES',
      icon: 'folder-outline',
      children: [
        {
          title: 'Liste des pathologies',
          link: '/pathology/list',
          icon: 'minus-outline',
        }  
      ],
    },
    {
      title: 'PHARMACIE',
      icon: 'folder-outline',
      children: [
        {
          title: 'Medicaments',
          // link: '/constant/domain',
          icon: 'minus-outline',
        },
        {
          title: 'DCI',
          // link: '/constant/type',
          icon: 'minus-outline',
        },
        {
          title: 'Classe therapeutique',
          // link: '/constant/type',
          icon: 'minus-outline',
        },
        {
          title: 'Forme pharmcologique',
          // link: '/constant/type',
          icon: 'minus-outline',
        },
        {
          title: 'Laboratoire',
          // link: '/constant/type',
          icon: 'minus-outline',
        },
        {
          title: 'Unite de conditionnement',
          // link: '/constant/type',
          icon: 'minus-outline',
        }
      ],
    },
    {
      title: 'PRACTICIENS',
      icon: 'folder-outline',
      children: [
        {
          title: 'Liste des practiciens',
          // link: '/constant/domain',
          icon: 'minus-outline',
        }    
      ],
    },
    {
      title: "SALLES D'ATTENTE",
      icon: 'folder-outline',
      children: [
        {
          title: 'Salles d\'attente',
          link: '/waiting-room/list',
          icon: 'minus-outline',
        }
      ],
    },
    {
      title: "SERVICES",
      icon: 'folder-outline',
      children: [
        {
          title: 'Liste des service',
          link: '/service/list',
          icon: 'minus-outline',
        }       
      ],
    },
    {
      title: "STOCK",
      icon: 'folder-outline',
      children: [
        {
          title: 'Gestion de de kits',
          // link: '/constant/domain',
          icon: 'minus-outline',
        },
        {
          title: 'Articles',
          // link: '/constant/type',
          icon: 'minus-outline',
        },
        {
          title: 'Détails des entrées en stocks',
          // link: '/constant/type',
          icon: 'minus-outline',
        },
        {
          title: 'Emplacement d\'article',
          // link: '/constant/type',
          icon: 'minus-outline',
        },
        {
          title: 'Famille d\'article',
          // link: '/constant/type',
          icon: 'minus-outline',
        },
        {
          title: 'Fournisseur',
          // link: '/constant/type',
          icon: 'minus-outline',
        }  
      ],
    },
    {
      title: "SPECIALITES",
      icon: 'folder-outline',
      children: [
        {
          title: 'Liste des spécialités',
          // link: '/constant/domain',
          icon: 'minus-outline',
        }     
      ],
    },
    {
      title: "SUBDIVISION TERRITORIALE",
      icon: 'folder-outline',
      children: [
        {
          title: 'Pays',
          // link: '/constant/domain',
          icon: 'minus-outline',
        },
        {
          title: 'Villes',
          // link: '/constant/type',
          icon: 'minus-outline',
        },
        {
          title: 'Regions',
          // link: '/constant/type',
          icon: 'minus-outline',
        },
        {
          title: 'Districts',
          // link: '/constant/type',
          icon: 'minus-outline',
        },
        {
          title: 'Localités',
          // link: '/constant/type',
          icon: 'minus-outline',
        }
      ],
    },
    {
      title: "SYMPTÔMES",
      icon: 'folder-outline',
      children: [
        {
          title: 'Liste des symptômes',
          // link: '/constant/domain',
          icon: 'minus-outline',
        }       
      ],
    },
    {
      title: "TYPES DE PAYEMENT",
      icon: 'folder-outline',
      children: [
        {
          title: 'Liste des types de payements',
          // link: '/constant/domain',
          icon: 'minus-outline',
        }
      ],
    },
    {
      title: "UNITE DE MESURES",
      icon: 'folder-outline',
      children: [
        {
          title: 'Liste des unités de mesures',
          // link: '/constant/domain',
          icon: 'minus-outline',
        }      
      ],
    },
    {
      title: 'GESTION DES UTILISATEURS',
      icon: 'people-outline',
      hidden: !this.canAccessUserManagenent(),
      children: [
        {
          title: 'Utilisateur',
          link: '/user/list',
          icon: 'minus-outline',
          hidden: !this.canAccesUser(),
        },
        {
          title: 'Rôle utilisateur',
          link: '/role/list',
          icon: 'minus-outline',
          hidden: !this.canAccesUserRole(),
        },
      ],
    },
    {
      title: 'TRACE DES EVENEMENTS',
      icon: 'question-mark-circle-outline',
      link: '/log/list',
      hidden: !this.canAccessEventLog(),
    },
    {
      title: "PARAMETRE D'APPLICATION",
      icon: 'settings-outline',
      hidden: !this.canAccessApllicationSetting(),
    },
  ];
  constructor(private userService: UserService) {}

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {}

  //basic files menu
  private canAccessBasicFiles() {
    return this.userService.checkAuthority(
      SideBar2MenuAuthorityEnum.ACCESS_BASIC_FILES
    );
  }

  private canAccessVehicle() {
    return this.userService.checkAuthority(VehiculeAuthorityEnum.VEHICULE_LIST);
  }

  private canAccessDriver() {
    return this.userService.checkAuthority(DriverAuthorityEnum.DRIVER_LIST);
  }

  private canAccessBank() {
    return this.userService.checkAuthority(BankAuthorityEnum.BANK_LIST);
  }

  private canAccessCountry() {
    return this.userService.checkAuthority(CountryAuthorityEnum.COUNTRY_LIST);
  }

  private canAccessFreightForwarder() {
    return this.userService.checkAuthority(
      FreightForwarderAuthorityEnum.FREIGHT_FORWARDER_LIST
    );
  }

  private canAccessContainerCost() {
    return this.userService.checkAuthority(
      containerCostAuthorityEnum.CONTAINER_COST_LIST
    );
  }

  private canAccessExcess() {
    return this.userService.checkAuthority(
      containerCostAuthorityEnum.CONTAINER_COST_LIST
    );
  }

  private canAccessShipper() {
    return this.userService.checkAuthority(ShipperAuthorityEnum.SHIPPER_LIST);
  }

  private canAccessPort() {
    return this.userService.checkAuthority(PortAuthorityEnum.PORT_LIST);
  }

  private canAccessStockOutReason() {
    return this.userService.checkAuthority(
      StockOutReasonAuthorityEnum.STOCK_OUT_REASON_LIST
    );
  }

  private canAccessCarrier() {
    return this.userService.checkAuthority(CarrierAuthorityEnum.CARRIER_LIST);
  }
  //user managenement menu
  private canAccessUserManagenent() {
    return this.userService.checkAuthority(
      SideBar2MenuAuthorityEnum.ACCESS_USER_MANAGEMENT
    );
  }
  private canAccesUser() {
    return this.userService.checkAuthority(UserAuthority.USER_LIST);
  }
  private canAccesUserRole() {
    return this.userService.checkAuthority(RoleAuthorityEnum.ROLE_LIST);
  }
  private canAccessEventLog() {
    return this.userService.checkAuthority(
      SideBar2MenuAuthorityEnum.ACCESS_EVENT_LOG
    );
  }

  private canAccessApllicationSetting() {
    return this.userService.checkAuthority(
      SideBar2MenuAuthorityEnum.ACCESS_APPLICATION_SETTINGS
    );
  }

  private canAccessCity() {
    return this.userService.checkAuthority(CityAuthorityEnum.CITY_LIST);
  }

  private canAccessCommune() {
    return this.userService.checkAuthority(CommuneAuthorityEnum.COMMUNE_LIST);
  }

  private canAccessEditor() {
    return this.userService.checkAuthority(EditorAuthorityEnum.EDITOR_LIST);
  }
}
