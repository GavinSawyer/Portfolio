import { isPlatformBrowser }                                              from "@angular/common";
import { Inject, Injectable, OnDestroy, PLATFORM_ID }                     from "@angular/core";
import { Auth, onAuthStateChanged, signInAnonymously, Unsubscribe, User } from "@angular/fire/auth";
import { Observable, shareReplay, Subject }                               from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {

  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: Object,

    private readonly auth: Auth,
  ) {
    this
      .unsubscribeAuthStateChanged = onAuthStateChanged(auth, ((user: User | null): void => {
        user && this
          .userSubject
          .next(user);
      }));
    this
      .userSubject = new Subject<User>();
    this
      .userObservable = this
      .userSubject
      .asObservable()
      .pipe<User>(
        shareReplay<User>()
      );

    isPlatformBrowser(platformId) ? signInAnonymously(auth) : this
      .unsubscribeAuthStateChanged();
  }

  private readonly unsubscribeAuthStateChanged: Unsubscribe;
  private readonly userSubject: Subject<User>;

  public readonly userObservable: Observable<User>;

  ngOnDestroy(): void {
    this
      .unsubscribeAuthStateChanged();
  }

}
