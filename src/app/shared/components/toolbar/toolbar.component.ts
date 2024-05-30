import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  authservice = inject(AuthService)

  get user() {
    return this.authservice.getUser()
  }
  
}

