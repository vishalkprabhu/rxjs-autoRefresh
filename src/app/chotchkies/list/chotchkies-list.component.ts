import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "../User.model";
import { UserService } from "../user.service";
import { merge } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap
} from "rxjs/operators";
import { FormBuilder, NgModel } from "@angular/forms";

@Component({
  selector: "rxjs-playground-chotchkies-list",
  template: `
    <h3>List of Users</h3>
    <form>
      <label>Filter</label>
      <input
        [(ngModel)]="searchTerm"
        class="form-control"
        name="searchTerm"
        type="text"
        #filterInput="ngModel"
      />
      <button class="btn btn-danger">
        Search!
      </button>
    </form>
    <div class="row"><div class="col">&nbsp;</div></div>
    <table
      class="table table-bordered table-striped table-responsive-sm"
      *ngIf="users"
    >
      <tr
        class="mb-2"
        style="word-break: break-word;"
        *ngFor="let user of users"
      >
        <td>{{ user.name }}</td>
        <td>{{ user.address }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.designation }}</td>
        <td>
          <button class="btn btn-sm btn-danger" (click)="removeUser(user.id)">
            Delete
          </button>
        </td>
      </tr>
    </table>
  `
})
export class ChotchkiesListComponent implements OnInit {
  @ViewChild("filterInput") filterInput: NgModel;

  searchTerm: string;

  users: User[];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    const emptySearch$ = this.filterInput.valueChanges.pipe(
      filter(v => !!!v),
      debounceTime(500),
      switchMap(() => this.userService.getAllUsers())
    );

    const valueSearch$ = this.filterInput.valueChanges.pipe(
      filter(v => !!v),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.getUsersBySearchTerm(term))
    );

    this.userService.refreshNeeded$
      .pipe(tap(() => this.filterInput.control.reset(null)))
      .subscribe();

    merge(emptySearch$, valueSearch$).subscribe(
      results => (this.users = results)
    );
  }

  private removeUser(id: number) {
    this.userService
      .removeUser(id)
      .subscribe(
        () => console.log(`${id} deleted.`),
        error => alert(JSON.stringify(error))
      );
  }
}
