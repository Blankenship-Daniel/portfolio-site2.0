import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private projects: FirebaseListObservable<any[]>;
  private featured: any[];

  constructor(
    private db: AngularFireDatabase,
    private sanitizer: DomSanitizer
  ) {
    this.featured = [];
    this.projects = db.list('projects');
    this.projects.subscribe(
      projects => this.setFeaturedProjects(projects),
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
  }

  sanitizeImage(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  setFeaturedProjects(projects: any) {
    this.featured = projects;
  }
}
