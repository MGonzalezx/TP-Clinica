import { Component } from '@angular/core';
import { rotateInAnimation, slideInAnimation } from 'src/app/animations/animation';
@Component({
  selector: 'app-home-vista',
  templateUrl: './home-vista.component.html',
  styleUrls: ['./home-vista.component.scss'],
  animations:[rotateInAnimation, slideInAnimation]
})
export class HomeVistaComponent {
  state: string = 'default';

  rotate() {
      this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
}
