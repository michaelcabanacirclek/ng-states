import { Component, OnInit } from "@angular/core";
import { TableComponent } from "../../shared/components/table.component";
import { User } from "../user.models";
import { PaginationComponent } from "../../shared/components/pagination.component";
import { filter, map, Observable, of, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import {
  selectPagination,
  selectTotal,
  selectUsers,
} from "../stores/ngrx-store/user.selectors";
import { getUsers, setPage, setSize } from "../stores/ngrx-store/user.actions";

@Component({
  selector: "app-user-page-ngrx",
  standalone: true,
  imports: [TableComponent, PaginationComponent],
  template: `
    <div>
      <div>
        <app-pagination
          [total]="total"
          [page]="page"
          [size]="size"
          (pageSizeChanged)="pageSizeChanged($event)"
          (pageChanged)="pageChanged($event)"
        />
      </div>
      <div>
        <app-table [data]="data" [columns]="columns" />
      </div>
    </div>
  `,
  styles: ``,
})
export class UserPageNgrxComponent implements OnInit {
  data$: Observable<User[]>;
  total$: Observable<number>;
  page$: Observable<number>;
  size$: Observable<number>;

  columns$: Observable<(keyof User)[]>;

  data: User[] = [];
  total = 0;
  page = 0;
  size = 0;

  columns: (keyof User)[] = [];

  constructor(private store: Store) {
    this.data$ = this.store.select(selectUsers).pipe(filter((a) => !!a));
    this.total$ = this.store.select(selectTotal).pipe(filter((a) => !!a));
    this.page$ = this.store.select(selectPagination).pipe(
      filter((a) => !!a),
      map((a) => a.page)
    );
    this.size$ = this.store.select(selectPagination).pipe(
      filter((a) => !!a),
      map((a) => a.size)
    );

    this.columns$ = this.store.select(selectUsers).pipe(
      filter((a) => !!a && !!a[0]),
      switchMap((res) => {
        const obj = res[0];
        const acceptedKeys: (keyof User)[] = [];

        const keys = Object.keys(obj) as (keyof User)[];
        for (const key of keys) {
          if (typeof obj[key] !== "object") {
            acceptedKeys.push(key);
          }
        }

        return of(acceptedKeys);
      })
    );
  }

  ngOnInit(): void {
    this.data$.subscribe({ next: (data) => (this.data = data) });
    this.total$.subscribe({ next: (total) => (this.total = total) });
    this.page$.subscribe({ next: (page) => (this.page = page) });
    this.size$.subscribe({ next: (size) => (this.size = size) });
    this.columns$.subscribe({ next: (columns) => (this.columns = columns) });
    this.store.dispatch(getUsers());
  }

  pageSizeChanged(event: number) {
    this.store.dispatch(setSize({ size: event }));
    this.store.dispatch(setPage({ page: 0 }));
    this.store.dispatch(getUsers());
  }

  pageChanged(event: number) {
    this.store.dispatch(setPage({ page: event }));
    this.store.dispatch(getUsers());
  }
}
