import { animate, style, transition, trigger, state } from "@angular/animations";

export const slideInAnimation =
  trigger('slideInAnimation', [
    transition(':enter', [
      style({ position: 'absolute', left: '-100%', width: '100%' }),
      animate('300ms ease-out', style({ left: '0%' }))
    ]),
    transition(':leave', [
      style({ position: 'absolute', left: '0%', width: '100%' }),
      animate('200ms ease-out', style({ left: '100%', opacity: 0 }))
    ])
  ]);

  export const rotateInAnimation =
  trigger('rotatedState', [
    state('default', style({ transform: 'rotate(0)' })),
    state('rotated', style({ transform: 'rotate(-360deg)' })),
    transition('rotated => default', animate('2000ms ease-out')),
    transition('default => rotated', animate('2000ms ease-in'))
])

export const openbox =
trigger('openClose', [
  state('true', style({ height: '*' })),
  state('false', style({ height: '0px' })),
  transition('false <=> true', [ animate(500) ])
])