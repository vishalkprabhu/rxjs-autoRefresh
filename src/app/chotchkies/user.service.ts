import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { User } from "./User.model";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

@Injectable()
export class UserService {
  private _refreshNeeded$ = new Subject<void>();
  private _url = "http://localhost:3000/people";

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this._url);
  }

  getUsersBySearchTerm(term: string) {
    return this.httpClient.get<User[]>(this._url, {
      params: { searchTerm: term }
    });
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this._url, user).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  patchUser(id: number, userData: any) {
    return this.httpClient.patch<User>(`${this._url}/${id}`, userData).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  removeUser(id: number) {
    return this.httpClient.delete(`${this._url}/${id}`).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }
}
