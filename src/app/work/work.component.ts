import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  private projects: FirebaseListObservable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private sanitizer: DomSanitizer
  ) {
    this.projects = db.list('projects');
  }

  ngOnInit() {
  }

  sanitizeImage(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
