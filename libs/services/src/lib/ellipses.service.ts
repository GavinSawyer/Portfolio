import { isPlatformBrowser }                               from "@angular/common";
import { Inject, Injectable, PLATFORM_ID, signal, Signal } from "@angular/core";
import { toSignal }                                        from "@angular/core/rxjs-interop";
import { interval, map, startWith }                        from "rxjs";


type Ellipses = "." | ".." | "...";

@Injectable({
  providedIn: "root",
})
export class EllipsesService {

  public readonly ellipses$: Signal<Ellipses>;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this
      .ellipses$ = isPlatformBrowser(platformId) ? toSignal<Ellipses>(
        interval(800).pipe<Ellipses, Ellipses>(
          map<number, Ellipses>(
            (n: number): Ellipses => ".".repeat(((n + 1) % 3) + 1) as Ellipses,
          ),
          startWith<Ellipses>("."),
        ),
        {
          requireSync: true,
        },
      ) : signal<Ellipses>(".");
  }
}
