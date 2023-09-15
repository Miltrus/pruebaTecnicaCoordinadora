import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  private breakpointObserver = inject(BreakpointObserver);
  modules: any[] = [];

  constructor(
  ) {

    this.modules = [
      { name: 'Empleados', route: '/empleados' },
      { name: 'Premios', route: '/premios' },
      { name: 'Puntajes', route: '/puntajes' },
    ];

  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
