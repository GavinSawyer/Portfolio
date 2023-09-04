import { Location }                                                                                                                                                                                                                                                                                         from "@angular/common";
import { inject, Injectable, Signal }                                                                                                                                                                                                                                                                       from "@angular/core";
import { toSignal }                                                                                                                                                                                                                                                                                         from "@angular/core/rxjs-interop";
import { ActivationEnd, ActivationStart, ChildActivationEnd, ChildActivationStart, GuardsCheckEnd, GuardsCheckStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent, RoutesRecognized, Scroll } from "@angular/router";
import { distinctUntilChanged, filter, map, startWith }                                                                                                                                                                                                                                                     from "rxjs";


@Injectable({
  providedIn: "root",
})
export class PathService {

  private readonly location: Location = inject(Location);
  private readonly router:   Router   = inject(Router);

  public readonly path$: Signal<string> = toSignal<string>(
    this.router.events.pipe<NavigationEnd, string, string, string>(
      filter<RouterEvent | NavigationStart | NavigationEnd | NavigationCancel | NavigationError | RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart | ResolveEnd, NavigationEnd>(
        (routerEvent: RouterEvent | NavigationStart | NavigationEnd | NavigationCancel | NavigationError | RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart | ResolveEnd): routerEvent is NavigationEnd => routerEvent instanceof NavigationEnd,
      ),
      map<NavigationEnd, string>(
        (navigationEnd: NavigationEnd): string => navigationEnd.url.split("?")[0],
      ),
      startWith<string, [ string ]>(this.location.path()),
      distinctUntilChanged<string>(),
    ),
    {
      requireSync: true,
    },
  );

}
