import { Component }           from "@angular/core";
import { ResponsivityService } from "@portfolio/services";


@Component({
  selector: "websiteApp-root",
  templateUrl: "./app.component.html",
  styleUrls: [
    "./app.component.sass",
  ],
})
export class AppComponent {

  constructor(
    ResponsivityService: ResponsivityService,
  ) {
    this
      .ResponsivityService = ResponsivityService;
  }

  public readonly ResponsivityService: ResponsivityService;

}
