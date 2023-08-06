import { CommonModule, NgOptimizedImage }                              from "@angular/common";
import { Component }                                                   from "@angular/core";
import { Analytics, logEvent }                                         from "@angular/fire/analytics";
import { ButtonComponent, CreateMessageFormComponent, FocusComponent } from "@portfolio/components";
import { FocusService, MessagesService }                               from "@portfolio/services";


@Component({
  imports:     [
    CommonModule,
    ButtonComponent,
    CreateMessageFormComponent,
    FocusComponent,
    NgOptimizedImage,
  ],
  selector:    "portfolio-aside",
  standalone:  true,
  styleUrls:   [
    "./aside.component.sass",
  ],
  templateUrl: "./aside.component.html",
})
export class AsideComponent {

  public readonly logClickAddToContactsEvent: () => void;
  public readonly logClickOpenResumeEvent: () => void;

  constructor(
    public readonly focusService:    FocusService,
    public readonly messagesService: MessagesService,

    analytics: Analytics,
  ) {
    this
      .logClickAddToContactsEvent = (): void => logEvent<"click_addToContacts">(
        analytics,
        "click_addToContacts",
      );
    this
      .logClickOpenResumeEvent = (): void => logEvent<"click_openResume">(
        analytics,
        "click_openResume",
      );
  }

}
