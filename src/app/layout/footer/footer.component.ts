import { Component, OnInit, OnDestroy  } from '@angular/core';

import { SubSink } from 'subsink';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit ,  OnDestroy{ private subs = new SubSink();

  constructor() { }

   // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
  }

}
