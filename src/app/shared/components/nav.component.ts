import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-nav",
  standalone: true,
  imports: [RouterModule],
  template: `
    <div style="margin-bottom: 1rem; display: flex; gap: 0.25rem;">
      @for (link of links; track $index) {
      <button [routerLink]="link.path">{{ link.label }}</button>
      }
    </div>
  `,
})
export class NavComponent {
  links = [
    {
      path: "",
      label: "Plain Signals",
    },
    {
      path: "ngrx",
      label: "NGRX Store",
    },
    {
      path: "ngrx-signal",
      label: "NGRX Signal Store",
    },
    {
      path: "ngxs",
      label: "NGXS Store",
    },
  ];
}
