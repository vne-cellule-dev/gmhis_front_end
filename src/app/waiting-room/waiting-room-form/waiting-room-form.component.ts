import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { IWaitingRoom } from '../model/waiting-room';
import { IWaitingRoomDTO } from '../model/waiting-room-dto';
import { WaitingRoomService } from '../service/waiting-room.service';

@Component({
  selector: 'app-waiting-room-form',
  templateUrl: './waiting-room-form.component.html',
  styleUrls: ['./waiting-room-form.component.scss']
})
export class WaitingRoomFormComponent implements OnInit {

  private subs = new SubSink();

  @Input()
  waitingRoom: IWaitingRoom;

  waitingRoomDTO: IWaitingRoomDTO;


  @Output('addWaitingRoom') addWaitingRoom: EventEmitter<any> = new EventEmitter();
  @Output('updateWaitingRoom') updateWaitingRoom: EventEmitter<any> =
    new EventEmitter();

  /**
   * form
   */
  public waitingRoomForm: FormGroup;

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
    { id: true, value: 'Actif' },
    { id: false, value: 'En sommeil' },
  ];

  /**
   * handle the spinner
   */
  showloading: boolean = false;

  actives = [
    { id: true, value: 'Actif' },
    { id: false, value: 'Inactif' },
  ];





  public errorMessage!: string;

  public formsErrors: { [key: string]: string } = {};

  private isFormSubmitted: boolean = false;

  constructor(
    private waitingRoomService: WaitingRoomService,
    private notificationService: NotificationService
  ) {}

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
  
    this.initForm();
    if (this.waitingRoom) {
    this.waitingRoomService.getwaitingRoomDetails(this.waitingRoom)
    .subscribe(
      (response : IWaitingRoom) => {
        this.waitingRoomForm.patchValue(response);
      },
      (errorResponse: HttpErrorResponse) => {
        this.showloading = false;
        this.notificationService.notify(
          NotificationType.ERROR,
          errorResponse.error.message
        );
      }
    )
    }
  }



 

  initForm() {
    this.waitingRoomForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      active: new FormControl(true),
      capacity: new FormControl(null),
    });
  }
  get name() {
    return this.waitingRoomForm.get('name');
  }

  save() {
    this.invalidFom = !this.waitingRoomForm.valid;
    this.formSubmitted = true;
    if (this.waitingRoomForm.valid) {
      this.showloading = true;
      this.waitingRoomDTO = this.waitingRoomForm.value;
      console.log(this.waitingRoom);

      if (this.waitingRoomDTO.id) {
        this.subs.add(
          this.waitingRoomService.updatewaitingRoom(this.waitingRoomDTO).subscribe(
            (response: IWaitingRoom) => {
              this.showloading = false;
              this.updateWaitingRoom.emit();
            },
            (errorResponse: HttpErrorResponse) => {
              this.showloading = false;
              this.notificationService.notify(
                NotificationType.ERROR,
                errorResponse.error.message
              );
            }
          )
        );
      } else {
        this.subs.add(
          this.waitingRoomService.createwaitingRoom(this.waitingRoomDTO).subscribe(
            (response: IWaitingRoom) => {
              this.showloading = false;
              this.addWaitingRoom.emit();
            },
            (errorResponse: HttpErrorResponse) => {
              this.showloading = false;
              this.notificationService.notify(
                NotificationType.ERROR,
                errorResponse.error.message
              );
            }
          )
        );
      }
    }
  }

}
