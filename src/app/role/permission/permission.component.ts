import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Resource } from 'src/app/_models/resource.model';
import { Role } from 'src/app/_models/role.model';
import { ResourceService } from 'src/app/_services/resource.service';
import { RoleService } from 'src/app/_services/role.service';

import { SubSink } from 'subsink';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit, OnDestroy {
    private subs = new SubSink();

  /**
   * collection of items
   */
  public resources: Resource[];

  /**
   * component form
   */
  form = new FormArray([]);

  /* 
   role model
 */
  @Input()
  public role: Role;

  @Output("setAuthority") setAuthority: EventEmitter<any> = new EventEmitter();

  /**
   * ids od role authorities
   */
  role_authorities: number[];

  constructor(
    private resourceService: ResourceService,
    private roleSerice: RoleService
  ) { }

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {

    this.getResources();
  }

  /**
   * get resource and their authorities
   */
  getResources() {
    //get all ids id role authorities
    this.subs.add(
      this.roleSerice.findRoleAuthorityIds(this.role).subscribe(
        (response) => {
          this.role_authorities = response ? response : [];
          this.subs.add(
            this.resourceService.findAll().subscribe(
              (response) => {

                this.resources = response;
                response.forEach(element => {
                  let resource_perm = [];
                  // get only ids from collection of authority
                  resource_perm = element["authorities"].map(({ id }) => id)
                  let authority_intersection = this.role_authorities.filter(x => resource_perm.includes(x));
                  const group = new FormGroup({
                    authorities: new FormControl(authority_intersection),
                  });
                  this.form.push(group);
                });
              },
              (errorResponse: HttpErrorResponse) => {
                console.error(errorResponse.error.message);
              }));
        }, (error) => {
          console.error(error.message);
        }));

  }

  public save() {

    let data = {
      "authorities": [],
      "role": this.role.id
    }

    this.form.value.forEach(element => {

      data.authorities = data.authorities.concat(element['authorities']);
    });

    this.subs.add(
      this.roleSerice.setAuthorities(data).subscribe(
        (response: Role) => {
          this.setAuthority.emit();
        },
        (errorResponse: HttpErrorResponse) => {
          //this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
        }
      ));
  }
}
