import { Component, inject } from "@angular/core";
import { TableComponent } from "../../shared/components/table.component";
import { PaginationComponent } from "../../shared/components/pagination.component";
import { UserStore } from "../stores/ngrx-signal-store/user.store";

@Component({
  selector: "app-user-page-ngrx-signal",
  standalone: true,
  imports: [TableComponent, PaginationComponent],
  template: `
    <div>
      <div>
        <app-pagination
          [total]="userStore.total()"
          [page]="userStore.page()"
          [size]="userStore.size()"
          (pageSizeChanged)="pageSizeChanged($event)"
          (pageChanged)="pageChanged($event)"
        />
      </div>
      <div>
        <app-table [data]="userStore.data()" [columns]="userStore.columns()" />
      </div>
    </div>
  `,
  styles: ``,
})
export class UserPageNgrxSignalComponent {
  userStore = inject(UserStore);

  pageSizeChanged(event: number) {
    this.userStore.updatePageSize(event);
    this.userStore.updatePage(0);
  }

  pageChanged(event: number) {
    this.userStore.updatePage(event);
  }
}
