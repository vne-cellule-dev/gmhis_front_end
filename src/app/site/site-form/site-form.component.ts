import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Commune } from 'src/app/_models/commune.model';
import { Site } from 'src/app/_models/site.model';
import { CommuneService } from 'src/app/_services/commune.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { SiteService } from 'src/app/_services/site.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss']
})
export class SiteFormComponent implements OnInit {

  
  private subs = new SubSink();

  @Input()
  site: Site;

  @Input()
  details: boolean;

  @Output("addSite") addSite: EventEmitter<any> = new EventEmitter();
  @Output("updateSite") updateSite: EventEmitter<any> = new EventEmitter();

  /**
   * form
   */
  public siteForm: FormGroup;

  /**
  * the form valid state
  */
  public invalidFom = false;
  
  /**
   * check if the form is submitted
   */
  public formSubmitted = false;

  /**
   * define isActive options
   */
  states = [
    { id: true, value: "Actif" },
    { id: false, value: "En sommeil" },
  ];

  /**
   * handle the spinner
   */
  showloading: boolean = false;
  communes: Commune[];

  constructor(
    private siteService : SiteService,
    private notificationService: NotificationService,
    private communeService : CommuneService) { }

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
    if (this.site){            
      this.subs.add(
        this.siteService.getDetails(this.site).subscribe(
          (response : Site)=>{       
            this.siteForm.patchValue(response);
            this.siteForm.get('commune').setValue(response.commune.id)
            if (this.details) {              
              this.siteForm.disable();
            }
          }
        )
      )
    };

    this.getCommunes();
  }

  initForm() {
    this.siteForm = new FormGroup({
      id: new FormControl(0),
      commune: new FormControl(null),
      infoSite: new FormControl(''),
      localisationSite: new FormControl(''),
      nomSite: new FormControl(''),
      nombreLocaux: new FormControl(null)

    });
  }
  get name() { return this.siteForm.get('name'); }


  save() {
    this.invalidFom = !this.siteForm.valid;
    this.formSubmitted = true;
    if (this.siteForm.valid) {
      this.showloading = true;
      this.site = this.siteForm.value;   
      if (this.site.id) {
        this.subs.add(
          this.siteService.updateSite(this.site).subscribe(
            (response: Site) => {
              this.showloading = false;
              this.updateSite.emit();
            },
            (errorResponse: HttpErrorResponse) => {
              this.showloading = false;
              this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
            }
          ));
      } else {
        this.subs.add(
          this.siteService.saveSite(this.site).subscribe(
            (response: Site) => {
              this.showloading = false;
              this.addSite.emit();
            },
            (errorResponse: HttpErrorResponse) => {
              this.showloading = false;
              this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
            }
          ));
      }
    }
  }

  getCommunes(){
    this.subs.add(
      this.communeService.getAllCommune().subscribe(
        (response : Commune[]) =>{
          this.communes = response;
        },
        (errorResponse : HttpErrorResponse) =>{
         this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
        }
 
      )
    )
  }
}
