import { Component, input } from "@angular/core";

@Component({
  selector: "app-table",
  standalone: true,
  template: ` <table>
    <thead>
      <tr>
        @for (column of columns(); track $index) {

        <th>{{ column }}</th>
        }
      </tr>
    </thead>
    <tbody>
      @for (row of data(); track $index) {

      <tr>
        @for (column of columns(); track $index) {

        <td>
          {{ row[column] }}
        </td>

        }
      </tr>

      }
    </tbody>
  </table>`,
  styles: [
    `
      table {
        width: 100%;
      }
      td {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ],
})
export class TableComponent<T = unknown> {
  data = input<T[]>([]);

  columns = input<(keyof T)[]>([]);
}
