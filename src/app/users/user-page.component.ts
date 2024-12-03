import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { UserHttpClientService } from "./user-http-client.service";
import { TableComponent } from "../shared/components/table.component";
import { User, UserQuery } from "./user.models";
import { PaginationComponent } from "../shared/components/pagination.component";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { switchMap } from "rxjs";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-user-page",
  standalone: true,
  imports: [TableComponent, PaginationComponent],
  template: `
    <div>
      <div>
        <app-pagination
          [total]="total()"
          [page]="page()"
          [size]="size()"
          (pageSizeChanged)="pageSizeChanged($event)"
          (pageChanged)="pageChanged($event)"
        />
      </div>
      <div>
        <app-table [data]="data()" [columns]="columns()" />
      </div>
    </div>
  `,
  styles: ``,
})
export class UserPageComponent {
  userHttpClient = inject(UserHttpClientService);

  page = signal<number>(0);
  size = signal<number>(10);

  skip = computed(() => this.page() * this.size());

  query = computed(
    () =>
      ({
        limit: `${this.size()}`,
        skip: `${this.skip()}`,
      } as UserQuery)
  );

  res = toSignal(
    toObservable(this.query).pipe(
      switchMap((q) => this.userHttpClient.getUsers(q))
    )
  );

  total = computed<number>(() => this.res()?.total ?? 0);
  data = computed<User[]>(() => this.res()?.users ?? []);
  columns = computed(() => {
    const obj = this.data()[0];
    const acceptedKeys: (keyof User)[] = [];

    if (obj) {
      const keys = Object.keys(obj) as (keyof User)[];
      for (const key of keys) {
        if (typeof obj[key] !== "object") {
          acceptedKeys.push(key);
        }
      }
    }

    return acceptedKeys;
  });

  pageSizeChanged(event: number) {
    this.size.set(event);
    this.page.set(0);

  }

  pageChanged(event: number) {
    this.page.set(event);
  }
  
}
