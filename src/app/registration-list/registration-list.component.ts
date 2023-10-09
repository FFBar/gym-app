import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../models/user.model';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss'],
})
export class RegistrationListComponent implements OnInit {
  dataSource!: MatTableDataSource<User>;
  users!: User[];
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'mobile',
    'weight',
    'height',
    'bmi',
    'bmiResult',
    'requireTrainer',
    'gender',
    'package',
    'joinReason',
    'haveGymBefore',
    'enquiryDate',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private router: Router,
    private confirm: NgConfirmService,
    private toastService: NgToastService,
  ) {}

  getUsers() {
    //   get the users-data from the api
    this.api.getRegisteredUsers().subscribe((res) => {
      this.users = res;
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource<User>(this.users);
      console.log(this.dataSource);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getUsers();
  }

  edit(id: number) {
    this.router.navigate(['update', id]);
  }

  delete(id: number) {
    this.confirm.showConfirm(
      'Are you sure to delete?',
      () => {
        this.api.deleteRegisteredUser(id).subscribe((res) => {
          this.getUsers();
          this.toastService.success({
            detail: 'Success',
            summary: 'Enquiry deleted',
            duration: 3000,
          });
        });
      },
      () => {},
    );
  }
}
