import { Injectable,signal } from '@angular/core';
import { post } from '../components/types/post.type';

export type Headerdata = Pick<post, 'title' | 'subtitle' | 'thumbnail'>


@Injectable({
  providedIn: 'root'
})
export class HeaderService {

    uidata = signal<Headerdata>({ title:'', subtitle:'', thumbnail:''})
}
