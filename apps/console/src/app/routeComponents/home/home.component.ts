import { CommonModule }                           from "@angular/common";
import { Component }                              from "@angular/core";
import { AuthenticationService, WebAuthnService } from "@portfolio/services";

@Component({
  imports: [
    CommonModule,
  ],
  selector: "websiteApp-home",
  standalone: true,
  styleUrls: [
    "./home.component.sass",
  ],
  templateUrl: "./home.component.html",
})
export class HomeComponent {

  constructor(
    public readonly authenticationService: AuthenticationService,
    public readonly webAuthnService: WebAuthnService,
  ) {}

}
