import { Component, inject } from "@angular/core";
import { TableComponent } from "../../shared/components/table.component";
import { PaginationComponent } from "../../shared/components/pagination.component";
import { select, Store } from "@ngxs/store";
import { UserStore } from "../stores/ngxs-store/user.store";
import { SetPage, SetSize } from "../stores/ngxs-store/user.actions";

@Component({
  selector: "app-user-page-ngxs",
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
export class UserPageNgxsComponent {
  store = inject(Store);

  data = select(UserStore.getUsers);
  page = select(UserStore.getPage);
  size = select(UserStore.getSize);
  columns = select(UserStore.getColumns);
  total = select(UserStore.getTotal);

  pageSizeChanged(event: number) {
    this.store.dispatch(new SetSize(event));
  }

  pageChanged(event: number) {
    this.store.dispatch(new SetPage(event));
  }
}
