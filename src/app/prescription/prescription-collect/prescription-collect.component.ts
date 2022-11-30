import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { PrescriptionService } from '../services/prescription.service';

@Component({
  selector: 'app-prescription-collect',
  templateUrl: './prescription-collect.component.html',
  styleUrls: ['./prescription-collect.component.scss']
})
export class PrescriptionCollectComponent implements OnInit {

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private prescriptionService : PrescriptionService,
    private notificationService: NotificationService,

  ) { }

  public perscriptionItems : any[] = [];

  public prescriptionItemsId : string[] = [];

  public prescriptionInfos = {};
    /**
   * form
   */
     public searchForm: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.searchForm = new FormGroup({
      prescriptionNumber: new FormControl('', [Validators.required]),
    });
  }

  save(addFormContent){
    console.log(this.searchForm.value);
    this.modalService.open(addFormContent, { size: 'xl' });
  }

  findPrescription(addFormContent){
    let prescriptionNumber = this.searchForm.get('prescriptionNumber').value;
    this.prescriptionService.getPrescriptionDetailsByPrescriptionNumber(prescriptionNumber).subscribe(
      (res : any) => {
        this.prescriptionInfos = res;
        console.log(this.prescriptionInfos);  
        this.prescriptionService.getPrescriptionItemByPrescriptionId(this.prescriptionInfos['id']).subscribe(
          (res : any ) => {
            this.perscriptionItems = res;
            console.log(this.perscriptionItems);
            
          }
        )
        this.modalService.open(addFormContent, { size: 'xl' });  
      }
    )
  }

  getPrescriptionItemsIdToCollected(event, perscriptionItemId){
      console.log(this.prescriptionItemsId.indexOf(perscriptionItemId));
      
    if (this.prescriptionItemsId.indexOf(perscriptionItemId) == -1) {
        this.prescriptionItemsId.push(perscriptionItemId); 
      }else{
        this.prescriptionItemsId.splice(this.prescriptionItemsId.indexOf(perscriptionItemId),1);
      } 
      console.log(this.prescriptionItemsId);      
  }

  collectedPrescription(){
    this.prescriptionService.setPrescriptionItems(this.prescriptionItemsId).subscribe(
      (res : any) => {
        console.log(res);
        this.modalService.dismissAll();
        this.notificationService.notify(
          NotificationType.SUCCESS,
          "medicaments(s) collecté avec succès"
        );
        
      }
    )
  }

}
