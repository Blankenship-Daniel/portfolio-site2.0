import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private postId: number = 1;
  private blogForm: FormGroup;
  private projectForm: FormGroup;
  private posts: FirebaseListObservable<any[]>;
  private projects: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.getLastPostId(db); 
    this.posts = db.list('posts');
    this.projects = db.list('projects');
    this.blogForm = new FormGroup({
      blogTitle: new FormControl('', Validators.required),
      blogPost: new FormControl('', Validators.required)
    });
    this.projectForm = new FormGroup({
      projectTitle: new FormControl('', Validators.required),
      projectImage: new FormControl('', Validators.required),
      projectPost: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  getLastPostId(db: AngularFireDatabase) {
    // Grab the last id from the db.
    db.list('posts', {
      query: {
        orderByChild: 'timestamp',
        limitToLast: 1
      }
    }).subscribe(
      data => {
        if (data.length) {
          this.postId = data[0].id + 1;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  postToBlog(form: any) {
    if (form.valid) {
      let f: any = form.value;
      let post: any = {
        id: this.postId++,
        title: f.blogTitle,
        slug: f.blogTitle.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-'),
        post: f.blogPost,
        timestamp: Date.now()
      };
      this.posts.push(post);
    }
  }

  postToPortfolio(form: any) {
    if (form.valid) {
      let f: any = form.value;
      let project: any = {
        title: f.projectTitle,
        image: f.projectImage,
        post: f.projectPost,
        timestamp: Date.now()
      };
      this.projects.push(project);
    }
  }
}
