import { Component }                         from "@angular/core";
import { FocusService, ResponsivityService } from "@portfolio/services";


@Component({
  selector: 'portfolio-focus',
  templateUrl: './focus.component.html',
  styleUrls: ['./focus.component.sass'],
})
export class FocusComponent {

  constructor(
    FocusService: FocusService,
    ResponsivityService: ResponsivityService,
  ) {
    this
      .focusService = FocusService;
    this
      .responsivityService = ResponsivityService;
  }

  public readonly focusService: FocusService;
  public readonly responsivityService: ResponsivityService;
}