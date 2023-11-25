import { Component } from '@angular/core';
import { rotateInAnimation } from 'src/app/animations/animation';
@Component({
  selector: 'app-home-vista',
  templateUrl: './home-vista.component.html',
  styleUrls: ['./home-vista.component.scss'],
  animations:[rotateInAnimation]
})
export class HomeVistaComponent {
  state: string = 'default';

  rotate() {
      this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
}
