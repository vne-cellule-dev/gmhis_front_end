import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActService } from 'src/app/act/act/service/act.service';
import { INameAndId } from 'src/app/shared/models/name-and-id';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { IExamDto } from '../models/exam-dto';
import { ExamService } from '../services/exam.service';

@Component({
  selector: 'app-examen-form',
  templateUrl: './examen-form.component.html',
  styleUrls: ['./examen-form.component.scss']
})
export class ExamenFormComponent implements OnInit {
  acts: INameAndId;

  @Output('addExam') addExam: EventEmitter<any> =
  new EventEmitter();
  
  @Input()
  admissionId : number;
  examDto : IExamDto = {
    acts: [],
    admission: 0,
    diagnostic: 'ok ok ',
    id: 0,
    observation: 'ok ok'
  };
  selectectedItems = [];

  constructor(
    private actService : ActService,
    private examenService : ExamService,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    ) { }

  ngOnInit(): void {
    this.getAllAct();
    this.examDto.admission = this.admissionId;
  }


  getAllAct(){
    this.actService.getListOfActiveAct().subscribe(
      (response : any) => {
        console.log(response);
        this.acts = response;
      }
    )
  }

  getPrescriptionItemsIdToCollected(target, item) {
    this.examDto.acts = [];
    if (this.selectectedItems.includes(item)) {
      let index = this.selectectedItems.indexOf(item);
      this.selectectedItems.splice(index, 1);

    } else {
      this.selectectedItems.push(item);
    }
    console.log(this.examDto);
    
  }

  saveExamanRequest(){
    this.selectectedItems.forEach((el) => {
      this.examDto.acts.push(el["id"])
    })
    this.examenService.createExam(this.examDto).subscribe(
      (response : any) => {
        this.modalService.dismissAll();
        this.addExam.emit()
      },
      (errorResponse : HttpErrorResponse) => {
        this.notificationService.notify(
          NotificationType.ERROR,
          errorResponse.error.message
        );
      }
    )
  }
}
