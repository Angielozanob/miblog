import { Component } from '@angular/core';
import { Headerdata, HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  private uidata: Headerdata = {
    title: 'Acerca de nosotros',
    subtitle: ' ',
    thumbnail: 'https://caracoltv.brightspotcdn.com/dims4/default/28d9878/2147483647/strip/true/crop/1060x606+0+0/resize/1000x572!/format/webp/quality/90/?url=http%3A%2F%2Fcaracol-brightspot.s3.us-west-2.amazonaws.com%2F0c%2Fff%2F008e6b5a4db68a8ac7325493d7ba%2Fflor-lirio-sobre-fondo-oscuro-al-generativo-169016-28588.jpg'
  }

  constructor(private headerService: HeaderService){
    headerService.uidata.set(this.uidata)
  }

}
