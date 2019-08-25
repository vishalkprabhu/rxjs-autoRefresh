import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../user.service";

@Component({
  selector: "rxjs-playground-chotchkie-form",
  template: `
    <div class="container">
      <h3>New Chotchkie...</h3>
      <form
        *ngIf="userFormGroup"
        (submit)="handleSubmit()"
        [formGroup]="userFormGroup"
      >
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            name="name"
            formControlName="name"
          />
          <div
            *ngIf="
              userFormGroup.controls['name'].invalid &&
              userFormGroup.controls['name'].touched
            "
            class="is-invalid"
          >
            Name must be between 1 and 60 characters
          </div>
        </div>
        <div class="form-group">
          <label for="address">Address</label>
          <textarea
            class="form-control"
            name="address"
            formControlName="address"
          >
          </textarea>
          <div
            *ngIf="
              userFormGroup.controls['address'].invalid &&
              userFormGroup.controls['address'].touched
            "
            class="is-invalid"
          >
            address must be between 1 and 1024 characters
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            class="form-control"
            formControlName="email"
          />
          <div
            *ngIf="
              userFormGroup.controls['email'].invalid &&
              userFormGroup.controls['email'].touched
            "
            class="is-invalid"
          >
            Enter a valid email like jane.doe@gmail.com
          </div>
        </div>
        <div class="form-group">
          <label for="designation">Designation</label>
          <input
            type="text"
            class="form-control"
            name="designation"
            formControlName="designation"
          />
          <div
            *ngIf="
              userFormGroup.controls['designation'].invalid &&
              userFormGroup.controls['designation'].touched
            "
            class="is-invalid"
          >
            For eg: Web Developer
          </div>
        </div>
        <button
          [disabled]="userFormGroup.invalid"
          class="btn btn-lg btn-primary"
          type="submit"
        >
          Create new User
        </button>
      </form>
    </div>
  `
})
export class CreateChotchkieComponent implements OnInit {
  userFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userFormGroup = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(60)]],
      address: ["", [Validators.required, Validators.maxLength(1024)]],
      email: ["", [Validators.required, Validators.email]],
      designation: ["", [Validators.required, Validators.minLength(3)]]
    });
  }

  handleSubmit() {
    this.userService.createUser(this.userFormGroup.value).subscribe(
      chotchkie => {
        console.log(`Saved successfully. ${JSON.stringify(chotchkie)}`);
        this.userFormGroup.reset({
          name: "",
          address: "",
          email: "",
          designation: ""
        });
      },
      error => {
        alert(error);
      }
    );
  }
}
