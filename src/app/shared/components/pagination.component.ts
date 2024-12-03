import { Component, computed, input, output } from "@angular/core";

@Component({
  selector: "app-pagination",
  standalone: true,
  template: `
    <div>
      <select [value]="size()" (change)="handlePageSizeChange($event)">
        @for (size of sizes(); track $index) {
        <option [value]="size">{{ size }}</option>
        }
      </select>
      <ul>
        @for (block of blocks(); track $index) {
        <li>
          <button
            [class]="this.page() === $index ? 'on-page' : ''"
            (click)="handleChangePage($index)"
          >
            {{ block + 1 }}
          </button>
        </li>
        }
      </ul>
      <div> Total:{{ total() }}</div>
    </div>
  `,
  styles: [
    `
      div {
        display: flex;
      }
      ul {
        padding: 0;
        margin: 0;
        display: flex;
        list-style: none;
      }
      ul li {
        margin: 0 0.05rem;
      }
      ul li button {
        border-radius: 0.15rem;
        border: 1px solid #202024;
      }
      .on-page {
        color: white;
        background-color: black;
      }
    `,
  ],
})
export class PaginationComponent {
  sizes = input<number[]>([10, 25, 50, 100]);
  size = input<number>(10);
  page = input<number>(0);
  total = input<number>(0);

  blocks = computed(() =>
    Array.from(Array(Math.ceil(this.total() / this.size())).keys())
  );

  pageSizeChanged = output<number>();
  pageChanged = output<number>();

  handlePageSizeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.pageSizeChanged.emit(parseInt(value));
  }

  handleChangePage(page: number) {
    this.pageChanged.emit(page);
  }
}
