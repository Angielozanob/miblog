import { Component, OnInit } from '@angular/core';
import { PostPreviewComponent } from "./components/post-preview/post-preview.component";
import { Headerdata, HeaderService } from '../../services/header.service';
import { PostPreview } from '../types/post-preview.type';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { privateDecrypt } from 'crypto';
import matter from 'gray-matter-browser';

type HomeData = {
  posts: Array<string>
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostPreviewComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  private uidata: Headerdata = {
    title: 'BIENVENIDOS',
    subtitle: 'Conoce sobre las flores más lindas.',
    thumbnail: 'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2024/02/06/17072363356980.jpg'
  }

  posts: Array<PostPreview> = []

  constructor( private headerService: HeaderService, private http: HttpClient){ }

  ngOnInit(){
    const pathHomeData = 'assets/home/home-data.json'
    this.headerService.uidata.set(this.uidata)
    this.http.get<HomeData>(pathHomeData).subscribe({
      next: data => {
        const requests = data.posts.map(slug =>
          this.http.get(
            `assets/posts/${slug}/post.md`, { responseType: 'text' }
          ))
        forkJoin(requests).subscribe({
          next: allPostDetails => {
            this.posts = allPostDetails.map(markdownFile => {
              const {
                title = '',
                subtitle = '',
                slug = '',
                author = '',
                publicationdate = ''
              } = matter(markdownFile).data;
              return {
                title,
                subtitle,
                slug,
                author,
                publicationdate
              }
            })
          },
          error: error => console.error(error)
        })
      },
      error: error => console.error(error)
    })
  }
}
