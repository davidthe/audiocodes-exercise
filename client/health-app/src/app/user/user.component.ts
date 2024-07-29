import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Subscription, interval } from 'rxjs';
import healthReasons from '../../../../../data-files/health_reasons.json';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  @Input() user: any;
  expanded: boolean = false;
  userDetails: any = null;
  currentMinute: number = 0;
  intervalSubscription: Subscription | null = null;

  healthForm: FormGroup;
  healthReasons: any = healthReasons;
  secondLevelOptions: any[] = [];
  thirdLevelOptions: any[] = [];

  fileUploadProgress: number = 0;
  uploadResponse: string = '';

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.healthForm = this.fb.group({
      firstLevel: [''],
      secondLevel: [''],
      thirdLevel: ['']
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.stopInterval();
  }

  toggleExpand() {
    this.expanded = !this.expanded;
    if (this.expanded && !this.userDetails) {
      this.userService.getUserDetails(this.user.id).subscribe(details => {
        this.userDetails = details;
        this.startInterval();
      });
    } else if (!this.expanded) {
      this.stopInterval();
    }
  }

  startInterval() {
    this.currentMinute = 0;
    this.intervalSubscription = interval(1000).subscribe(() => {
      this.currentMinute++;
      if (this.currentMinute >= this.userDetails.heartRateData.length) {
        this.stopInterval();
      }
    });
  }

  stopInterval() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  getCurrentStatus(): string {
    const statusData = this.userDetails.heartRateData[this.currentMinute];
    return statusData ? statusData.status : '';
  }

  getBMI(): number {
    if (this.userDetails) {
      return this.userDetails.bmi;
    }
    return 0;
  }

  getHeartRateData(): any[] {
    if (this.userDetails) {
      return this.userDetails.heartRateData;
    }
    return [];
  }

  onFirstLevelChange() {
    const selectedFirstLevel = this.healthForm.value.firstLevel;
    const firstLevelOption = this.healthReasons.values.find((reason: any) => reason.name === selectedFirstLevel);
    this.secondLevelOptions = firstLevelOption ? firstLevelOption.values || [] : [];
    this.thirdLevelOptions = [];
    this.healthForm.patchValue({ secondLevel: '', thirdLevel: '' });
  }

  onSecondLevelChange() {
    const selectedSecondLevel = this.healthForm.value.secondLevel;
    const secondLevelOption = this.secondLevelOptions.find((option: any) => option.name === selectedSecondLevel);
    this.thirdLevelOptions = secondLevelOption ? secondLevelOption.values || [] : [];
    this.healthForm.patchValue({ thirdLevel: '' });
  }

  submitHealthReport() {
    if (this.healthForm.valid) {
      this.userService.reportHealthIssue(this.healthForm.value).subscribe(response => {
        alert(response.message);
      });
    }
  }

  handleFileInput(files: any) {
    files = files.target.files
    if (files.length > 0) {
      const file = files.item(0);
      if (file && file.type === 'text/csv') {
        const formData = new FormData();
        formData.append('file', file);

        this.userService.uploadCsv(formData).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.fileUploadProgress = Math.round(100 * event.loaded / (event.total ? event.total : 1));
          } else if (event instanceof HttpResponse) {
            this.uploadResponse = 'File successfully uploaded and processed!';
            this.fileUploadProgress = 0;
          }
        }, error => {
          this.uploadResponse = 'File upload failed!';
          this.fileUploadProgress = 0;
        });
      } else {
        alert('Please upload a valid CSV file.');
      }
    }
  }
}
