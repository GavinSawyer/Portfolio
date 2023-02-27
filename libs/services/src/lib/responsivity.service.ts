import { BreakpointObserver, BreakpointState }         from "@angular/cdk/layout";
import { DOCUMENT, isPlatformServer }                  from "@angular/common";
import { Inject, Injectable, PLATFORM_ID }             from "@angular/core";
import { BehaviorSubject, fromEvent, map, Observable } from "rxjs";


type Appearance = "light" | "dark"

@Injectable({
  providedIn: 'root',
})
export class ResponsivityService {

  constructor(
    @Inject(DOCUMENT)
      document: Document,

    @Inject(PLATFORM_ID)
      platformId: string,

    BreakpointObserver: BreakpointObserver,
  ) {
    this
      .adjustTextAreaRows = (textAreaElement: HTMLTextAreaElement, options: {
        fontSize?: number,
        lineHeight?: number,
        min?: number,
        max?: number,
      }): void => {
        textAreaElement
          .style
          .height = "0";

        textAreaElement
          .rows = this
          .getTextAreaRows(textAreaElement, options);

        textAreaElement
          .style
          .height = "auto";
      };
    this
      .backgroundAppearanceObservable = BreakpointObserver
      .observe("(prefers-color-scheme: light)")
      .pipe<Appearance | undefined>(
        map<BreakpointState, Appearance | undefined>((breakpointState: BreakpointState): Appearance | undefined => isPlatformServer(platformId) ? undefined : (breakpointState.matches ? "light" : "dark"))
      );
    this
      .foregroundAppearanceObservable = BreakpointObserver
      .observe("(prefers-color-scheme: dark)")
      .pipe<Appearance | undefined>(
        map<BreakpointState, Appearance | undefined>((breakpointState: BreakpointState): Appearance | undefined => isPlatformServer(platformId) ? undefined : (breakpointState.matches ? "light" : "dark"))
      );
    this
      .getTextAreaRows = (textAreaElement: HTMLTextAreaElement, options: {
        fontSize?: number,
        lineHeight?: number,
        min?: number,
        max?: number,
      }): number => Math.min(Math.max(Math.round(textAreaElement.scrollHeight / ((options.lineHeight || 1.15) * (options.fontSize || 1) * 16)), options.min || 1), options.max || 256);
    this
      .scrollPositionObservable = (document.defaultView ? fromEvent<Event>(document.defaultView, "scroll").pipe<number>(
        map<Event, number>((): number => window.scrollY || 0)
      ) : (new BehaviorSubject<number>(0)).asObservable());
  }

  public readonly scrollPositionObservable: Observable<number>;

  public readonly backgroundAppearanceObservable: Observable<Appearance | undefined>;
  public readonly foregroundAppearanceObservable: Observable<Appearance | undefined>;

  public readonly adjustTextAreaRows: (messageTextAreaElement: HTMLTextAreaElement, options: {
    fontSize?: number,
    lineHeight?: number,
    min?: number,
    max?: number,
  }) => void;
  public readonly getTextAreaRows: (messageTextAreaElement: HTMLTextAreaElement, options: {
    fontSize?: number,
    lineHeight?: number,
    min?: number,
    max?: number,
  }) => number;

}
