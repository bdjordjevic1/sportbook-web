import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Event } from '../../shared/model/event.model';
import { Location } from '../../shared/model/location.model';
import { User } from '../../shared/model/user.model';
import { EventService } from '../service/event.service';
import { LocationService } from '../../shared/service/location.service';
import { TeammatesService } from '../../shared/service/teammates.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'event-add.component.html',
  styleUrls: ['event-add.component.scss'],
})
export class EventAddComponent implements OnInit, OnDestroy {
  locations$: Observable<Location[]>;
  daysOfWeek: string[];
  eventForm: FormGroup;
  addedTeammates: User[];
  subscription: Subscription;

  constructor(
    private locationService: LocationService,
    private teammatesService: TeammatesService,
    private eventService: EventService
  ) {}

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
    this.eventService
      .createEvent({
        time: this.eventForm.value.time,
        location: { id: this.eventForm.value.location } as Location,
        weekDay: this.eventForm.value.dayOfWeek,
        users: this.eventForm.value.addedTeammates,
      } as Event)
      .subscribe(console.log);
  }
}
