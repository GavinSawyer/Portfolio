import { CommonModule }                              from "@angular/common";
import { Component }                                 from "@angular/core";
import { Auth, UserCredential }                      from "@angular/fire/auth";
import { Functions }                                 from "@angular/fire/functions";
import { signInWithPasskey, confirmUserWithPasskey } from "@ngx-firebase-web-authn/browser";
import { ButtonComponent }                           from "../button/button.component";
import { CreateAccountFormComponent }                from "../create-account-form/create-account-form.component";


@Component({
  imports: [
    ButtonComponent,
    CommonModule,
    CreateAccountFormComponent,
  ],
  selector: "portfolio-aside-console",
  standalone: true,
  styleUrls: [
    "./aside-console.component.sass",
  ],
  templateUrl: "./aside-console.component.html",
})
export class AsideConsoleComponent {

  constructor(
    private readonly auth: Auth,
    private readonly functions: Functions,
  ) {
    this
      .confirmUserWithPasskey = (): Promise<void> => confirmUserWithPasskey(auth, functions)
      .then<void>((): void => void(0));
    this
      .signInWithPasskey = (): Promise<void> => signInWithPasskey(auth, functions)
      .then<void>((_userCredential: UserCredential): void => void(0));
  }

  public readonly confirmUserWithPasskey: () => Promise<void>;
  public readonly signInWithPasskey: () => Promise<void>;

}
