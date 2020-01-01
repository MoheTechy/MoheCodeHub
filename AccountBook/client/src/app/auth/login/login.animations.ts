import { trigger, transition, animate } from '@angular/animations';

export let fade = trigger('fade', [

    transition('void => *', [
       // style({ opacity: 0, height: '2000px' }),
        animate(3000)
    ])
]);
