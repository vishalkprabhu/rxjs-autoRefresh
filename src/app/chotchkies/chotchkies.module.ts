import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UserService } from "./user.service";
import { HttpClientModule } from "@angular/common/http";
import { CreateChotchkieModule } from "./create-form/create-chotchkie.module";
import { ChotchkiesListModule } from "./list/chotchkies-list.module";
import { ChotchkiesContainerComponent } from "./chotchkies-container.component";

@NgModule({
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    CreateChotchkieModule,
    ChotchkiesListModule
  ],
  declarations: [ChotchkiesContainerComponent],
  providers: [UserService],
  exports: [ChotchkiesContainerComponent]
})
export class ChotchkiesModule {}
