import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UserQuery, UserResponse } from "./user.models";
import { delay } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserHttpClientService {
  http = inject(HttpClient);

  getUsers({ limit, skip, search, sort }: UserQuery) {
    let params = new HttpParams();
    let path = "";

    if (sort) {
      params = params.append("sortBy", sort.key);
      params = params.append("order", sort.order);
    }

    if (skip) {
      params = params.append("skip", skip);
    }

    if (skip && limit) {
      params = params.append("limit", limit);
    }

    if (search && search.trim().length > 0) {
      path = "/search";
      params = params.append("q", search);
    }

    return this.http
      .get<UserResponse>(`https://dummyjson.com/users${path}`, { params })
      .pipe(
        // delay(1000)
      );
  }
}
