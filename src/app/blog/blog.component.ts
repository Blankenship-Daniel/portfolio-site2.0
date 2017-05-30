import { Component, OnInit } from '@angular/core';
import { HighlightJsService } from 'angular2-highlight-js';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  private posts: FirebaseListObservable<any[]>;
  private nextPosts: FirebaseListObservable<any[]>;
  private offset: number = 0;
  private offsetAmount: number = 5;
  private showOlderPosts: boolean = true;
  private showBlogNav: boolean = false;

  constructor(
    private db: AngularFireDatabase,
    private highlightService: HighlightJsService,
    private route: ActivatedRoute
  ) {
    let slug: string = route.snapshot.params['slug'];
    route.queryParams.subscribe(
      params => {
        this.offset = params['start'] !== undefined ? params['start'] : 0;
        if (slug !== undefined) {
          this.loadSinglePost(db, slug);
        }
        else {
          this.loadPosts(db);
          this.loadNextPosts(db);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  convertDate(timestamp: string) {
    return new Date(timestamp);
  }

  prevPage() {
    return '/blog?start=' + (Number(this.offset) - Number(this.offsetAmount));
  }

  nextPage() {
    return '/blog?start=' + (Number(this.offset) + Number(this.offsetAmount));
  }

  loadSinglePost(db: AngularFireDatabase, slug: string) {
    this.showOlderPosts = false;
    this.posts = db.list('posts', {
      query: {
        orderByChild: 'slug',
        limitToFirst: 1,
        equalTo: slug
      }
    });
  }

  loadPosts(db: AngularFireDatabase) {
    this.posts = db.list('posts', {
      query: {
        orderByChild: 'id',
        startAt: {
          key: 'id',
          value: Number(this.offset)
        },
        limitToFirst: Number(this.offsetAmount)
      }
    });
  }

  loadNextPosts(db: AngularFireDatabase) {
    // Load the next set of posts to see if there are older posts to load. This
    //  allows us to know when to show and hide the `Older Posts` link in the
    //  nav.
    db.list('posts', {
      query: {
        orderByChild: 'id',
        startAt: {
          key: 'id',
          value: Number(this.offset) + Number(this.offsetAmount)
        },
        limitToFirst: Number(this.offsetAmount)
      }
    }).subscribe(
      posts => {
        this.showBlogNav = true;
        if (posts.length === 0) {
          this.showOlderPosts = false;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
