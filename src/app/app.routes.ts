import { Routes } from "@angular/router";
import { UserPageComponent } from "./users/pages/user-page.component";
import { UserPageNgrxSignalComponent } from "./users/pages/user-page-ngrx-signal.component";
import { UserPageNgrxComponent } from "./users/pages/user-page-ngrx.component";
import { UserPageNgxsComponent } from "./users/pages/user-page-ngxs.component";
import { provideState } from "@ngrx/store";
import { usersReducer } from "./users/stores/ngrx-store/user.reducer";
import { provideEffects } from "@ngrx/effects";
import * as userEffects from "./users/stores/ngrx-store/user.effects";

export const routes: Routes = [
  {
    path: "",
    component: UserPageComponent,
  },
  {
    path: "ngrx-signal",
    component: UserPageNgrxSignalComponent,
  },
  {
    path: "ngrx",
    component: UserPageNgrxComponent,
    providers: [
      provideState({ name: "users", reducer: usersReducer }),
      provideEffects(userEffects),
    ],
  },
  {
    path: "ngxs",
    component: UserPageNgxsComponent,
  },
];
