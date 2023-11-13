import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  packages: string[] = ['Monthly', 'Quarterly', 'Half Yearly', 'Yearly'];
  genders: string[] = ['Male', 'Female'];
  joinReasons: string[] = [
    'Toxic Fat reduction',
    'Weight Loss',
    'Weight Gain',
    'Muscle Gain',
    'General Fitness',
    'Others',
  ];

  // Tracks the value and validity state of a group of FormControl instances
  registerForm!: FormGroup;
  userIdToUpdate!: number;
  isUpdate: boolean = false;

  // FormBuilder is a service that provides syntactic sugar that shortens creating instances of a FormControl, FormGroup, or FormArray
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toastService: NgToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        // q: difference between formControlName and formControl
        // a: formControlName is used in template-driven forms, formControl is used in reactive forms
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
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
      },
      { updateOn: 'blur' },
    );

    // use the ActivatedRoute service to retrieve the parameters for the route
    this.activatedRoute.params.subscribe((value) => {
      this.userIdToUpdate = value['id'];
      //   set the state of the form to update

      if (this.userIdToUpdate) {
        this.isUpdate = true;
        //   get the user-data from the api
        this.api.getRegisteredUserById(this.userIdToUpdate).subscribe((res) => {
          this.fillFormToUpdate(res);
        });
      }
    });
  }

  submit() {
    this.calculateBMI();
    console.log(this.registerForm.value);
    this.api.postRegistration(this.registerForm.value).subscribe((res) => {
      this.toastService.success({
        detail: 'Success',
        summary: 'Enquiry added',
        duration: 3000,
      });
      this.registerForm.reset();
    });
  }

  update() {
    this.calculateBMI();
    this.api
      .updateRegisteredUser(this.registerForm.value, this.userIdToUpdate)
      .subscribe((res) => {
        this.toastService.success({
          detail: 'Success',
          summary: 'Enquiry updated',
          duration: 3000,
        });
        this.registerForm.reset();
        this.router.navigate(['list']);
      });
  }

  calculateBMI() {
    const weight = this.registerForm.value.weight;
    const height = this.registerForm.value.height;

    if (height > 0 && weight > 0) {
      const finalBmi = weight / (height * height);
      this.registerForm.controls['bmi'].patchValue(finalBmi.toFixed(2));

      switch (true) {
        case finalBmi < 18.5:
          this.registerForm.controls['bmiResult'].patchValue('Underweight');
          break;
        case finalBmi > 18.5 && finalBmi < 25:
          this.registerForm.controls['bmiResult'].patchValue('Normal');
          break;
        case finalBmi > 25 && finalBmi < 30:
          this.registerForm.controls['bmiResult'].patchValue('Overweight');
          break;
        case finalBmi > 30:
          this.registerForm.controls['bmiResult'].patchValue('Obese');
          break;
        default:
          this.registerForm.controls['bmiResult'].patchValue('Invalid');
      }
    } else {
      this.registerForm.controls['bmiResult'].patchValue('Invalid');
      this.registerForm.controls['bmi'].patchValue('Invalid');
    }
  }
  fillFormToUpdate(user: User) {
    this.registerForm.patchValue(user);
  }
}
