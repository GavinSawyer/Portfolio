import { Injector, NgModule }                             from "@angular/core";
import { ScreenTrackingService, UserTrackingService }     from "@angular/fire/analytics";
import { FirebaseApp, initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { AppCheck, initializeAppCheck, provideAppCheck }  from "@angular/fire/app-check";
import { Auth, getAuth, provideAuth }                     from "@angular/fire/auth";
import { Firestore, getFirestore, provideFirestore }      from "@angular/fire/firestore";
import { Functions, getFunctions, provideFunctions }      from "@angular/fire/functions";
import { ReactiveFormsModule }                            from "@angular/forms";
import { BrowserModule }                                  from "@angular/platform-browser";
import { RouterModule }                                   from "@angular/router";
import { TransferHttpCacheModule }                        from "@nguniversal/common";
import { AsideComponent, BannerComponent }                from "@portfolio/components";
import { AppCheckOptionsService }                         from "@portfolio/services";
import { environment }                                    from "../environments/environment";
import { AppComponent }                                   from "./app.component";


const baseTitle: string = "Console";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AsideComponent,
    BannerComponent,
    BrowserModule.withServerTransition({
      appId: "serverApp",
    }),
    provideAppCheck((injector: Injector): AppCheck => initializeAppCheck(undefined, injector.get(AppCheckOptionsService).appCheckOptions(environment.recaptchaSiteKey))),
    provideAuth((): Auth => getAuth()),
    provideFirebaseApp((): FirebaseApp => initializeApp(environment.firebase)),
    provideFirestore((): Firestore => getFirestore()),
    provideFunctions((): Functions => getFunctions()),
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {
          loadComponent: () => import("./routeComponents/home/home.component").then((m) => m.HomeComponent),
          path: "",
          pathMatch: "full",
          title: baseTitle,
        },
        {
          loadComponent: () => import("./routeComponents/otherwise/otherwise.component").then((m) => m.OtherwiseComponent),
          path: "**",
          title: baseTitle + " | Page not found",
        },
      ],
      {
        initialNavigation: "enabledBlocking",
        scrollPositionRestoration: "enabled",
      },
    ),
    TransferHttpCacheModule,
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
  ],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {}
