import { isPlatformServer }                                                             from "@angular/common";
import { Component, Inject, OnDestroy, PLATFORM_ID }                                    from "@angular/core";
import { Analytics, logEvent }                                                          from "@angular/fire/analytics";
import { FormBuilder, FormGroup }                                                       from "@angular/forms";
import { MessageDocument }                                                              from "@portfolio/interfaces";
import { AuthenticationService, EllipsesService, MessagesService, ResponsivityService } from "@portfolio/services";
import { BehaviorSubject, filter, Observable, shareReplay, Subscription, take }         from "rxjs";


type MessageFormStatus = "unsent" | "sending" | "sent"

@Component({
  selector: 'portfolio-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.sass'],
})
export class MessageFormComponent implements OnDestroy {

  constructor(
    @Inject(PLATFORM_ID)
    platform_id: string,

    Analytics: Analytics,
    AuthenticationService: AuthenticationService,
    EllipsesService: EllipsesService,
    FormBuilder: FormBuilder,
    MessagesService: MessagesService,
    ResponsivityService: ResponsivityService,
  ) {
    this
      .authenticationService = AuthenticationService;
    this
      .ellipsesService = EllipsesService;
    this
      .formGroup = FormBuilder
      .group({
        name: [""],
        message: [""],
        phone: [""],
        email: [""],
      });
    this
      .responsivityService = ResponsivityService;
    this
      .statusSubject = new BehaviorSubject<MessageFormStatus>("unsent");
    this
      .statusObservable = this
      .statusSubject
      .asObservable()
      .pipe<MessageFormStatus, MessageFormStatus>(
        shareReplay<MessageFormStatus>(),
        isPlatformServer(platform_id) ? take<MessageFormStatus>(1) : filter<MessageFormStatus>((): boolean => true)
      );
    this
      .submit = (): void => {
        this
          .statusSubject
          .next("sending");

        logEvent(Analytics, "form_submit", {
          "form_id": "",
          "form_name": "message",
          "form_destination": window.location.protocol + "//" + window.location.hostname + (window.location.port !== "" ? ":" + window.location.port : "") + "/",
        });

        MessagesService
          .createMessage(this.formGroup.value);
      };
    this
      .unsubscribeSentMessageDocument = MessagesService
      .sentMessageObservable
      .subscribe((sentMessageDocument?: MessageDocument): void => sentMessageDocument && ((): void => {
        this
          .formGroup
          .setValue({
            ...sentMessageDocument,
          });

        this
          .formGroup
          .disable();

        this
          .statusSubject
          .next("sent");
      })())
      .unsubscribe;
  }

  private readonly statusSubject: BehaviorSubject<MessageFormStatus>;
  private readonly unsubscribeSentMessageDocument: Subscription["unsubscribe"];

  public readonly authenticationService: AuthenticationService;
  public readonly ellipsesService: EllipsesService;
  public readonly formGroup: FormGroup;
  public readonly responsivityService: ResponsivityService;
  public readonly statusObservable: Observable<MessageFormStatus>;
  public readonly submit: () => void;

  ngOnDestroy(): void {
    this
      .unsubscribeSentMessageDocument();
  }

}
