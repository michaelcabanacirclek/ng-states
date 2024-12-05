import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavComponent } from "./shared/components/nav.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  template: `
    <app-nav />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {}
