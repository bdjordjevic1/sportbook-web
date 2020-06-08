import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Location } from '../../shared/model/location.model';
import { User } from '../../shared/model/user.model';
import { LocationService } from '../../shared/service/location.service';
import { TeammatesService } from '../../shared/service/teammates.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'group-add.component.html',
  styleUrls: ['group-add.component.scss'],
})
export class GroupAddComponent implements OnInit, OnDestroy {
  locations$: Observable<Location[]>;
  daysOfWeek: string[];
  eventForm: FormGroup;
  addedTeammates: User[];
  subscription: Subscription;

  constructor(private locationService: LocationService, private teammatesService: TeammatesService) {}

  ngOnInit() {
    this.locations$ = this.locationService.getAllLocations();
    this.daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.eventForm = new FormGroup({
      location: new FormControl(null, [Validators.required]),
      dayOfWeek: new FormControl('', [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      addedTeammates: new FormControl(null, [Validators.required]),
    });
    this.subscription = this.teammatesService.addedTeammates$.subscribe((teammates) => {
      this.addedTeammates = teammates;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  removeTeammate(teammate: User) {
    this.teammatesService.removeTeammate(teammate);
  }

  onSubmit() {
    this.eventForm.patchValue({
      addedTeammates: this.addedTeammates,
    });
    console.log(this.eventForm);
  }
}
