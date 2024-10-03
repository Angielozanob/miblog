import { Component, Input, } from '@angular/core';
import { PostPreview } from '../../../types/post-preview.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-preview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post-preview.component.html',
  styleUrl: './post-preview.component.css'
})
export class PostPreviewComponent {
  @Input() post: PostPreview ={
    title: '',
    subtitle: '',
    slug: '',
    author: '',
    publicationdate: ''
}
}
