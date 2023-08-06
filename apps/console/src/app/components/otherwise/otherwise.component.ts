import { CommonModule, isPlatformBrowser }          from "@angular/common";
import { Component, Inject, Optional, PLATFORM_ID } from "@angular/core";
import { RESPONSE }                                 from "@nguniversal/express-engine/tokens";
import { PathService }                              from "@portfolio/services";
import { Response }                                 from "express";


@Component({
  imports:     [
    CommonModule,
  ],
  selector:    "console-app-otherwise",
  standalone:  true,
  styleUrls:   [
    "./otherwise.component.sass",
  ],
  templateUrl: "./otherwise.component.html",
})
export class OtherwiseComponent {

  constructor(
                @Inject(PLATFORM_ID) platformId: Object,
    @Optional() @Inject(RESPONSE)    response: Response,

    public readonly pathService: PathService,
  ) {
    isPlatformBrowser(platformId) || response
      .status(404);
  }

}
