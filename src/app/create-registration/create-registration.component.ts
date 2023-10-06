import { Component } from '@angular/core';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent {
  packages: string[] = ['Monthly', 'Quarterly', 'Half Yearly', 'Yearly'];
  genders: string[] = ['Male', 'Female'];
  joinReasons: string[] = ['Toxic Fat reduction', 'Weight Loss', 'Weight Gain', 'Muscle Gain', 'General Fitness', 'Others'];

}
