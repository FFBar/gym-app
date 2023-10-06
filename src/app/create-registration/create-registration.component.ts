import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  packages: string[] = ['Monthly', 'Quarterly', 'Half Yearly', 'Yearly'];
  genders: string[] = ['Male', 'Female'];
  joinReasons: string[] = ['Toxic Fat reduction', 'Weight Loss', 'Weight Gain', 'Muscle Gain', 'General Fitness', 'Others'];

  // Tracks the value and validity state of a group of FormControl instances
  registerForm!: FormGroup;

  // FormBuilder is a service that provides syntactic sugar that shortens creating instances of a FormControl, FormGroup, or FormArray
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      requireTrainer: [''],
      gender: [''],
      package: [''],
      joinReason: [''],
      haveGymBefore: [''],
      enquiryDate: [''],
    });
  }

  submit() {
    console.log(this.registerForm.value);
  }
}
