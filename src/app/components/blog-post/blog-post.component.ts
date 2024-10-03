import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import matter from 'gray-matter-browser';
import MarkdownIt from 'markdown-it';
import { Headerdata, HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [HttpClientModule,],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent implements OnInit {
  private markdownIt = new MarkdownIt();
  content = '';
  constructor(private activeRouter:ActivatedRoute, private http: HttpClient, 
    private headerService: HeaderService){
  }
  ngOnInit(){
    const slug = this.activeRouter.snapshot.paramMap.get('post');
    this.http.get(`assets/posts/${slug}/post.md`, { responseType: 'text' }).subscribe({
      next: data => this.manageMarkdonwFileData(data),
      error: error => console.log(error)
    })
    
  }
  manageMarkdonwFileData(markDownFile: string | undefined): void {
    if (!markDownFile) {
      return
    };

    const matterObj = matter(markDownFile);
    const { title = '', subtitle = '', thumbnail = '' } = matterObj.data;
    const headerData: Headerdata = { title, subtitle, thumbnail };
    this.setHeaderData(headerData)
    this.content = this.markdownIt.render(matterObj.content);
  }
  setHeaderData(headerData: Headerdata): void {
    this.headerService.uidata.set(headerData)
  }
}
