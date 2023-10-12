import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userId!: number;
  user!: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((value) => {
      this.userId = value['id'];
      this.getUserFromApi(this.userId);
    });
  }
  getUserFromApi(userId: number) {
    this.api.getRegisteredUserById(userId).subscribe((res) => {
      this.user = res;
    });
  }
}
