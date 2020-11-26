import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesModels } from 'src/app/models/heroes.models';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroesModels[] = [];
  load: boolean = false;
  constructor(  private heroe: HeroesService,
                private router: Router
    ) { }

  ngOnInit(): void {
    this.load = true;
    this.heroe.getHeroes().subscribe(res => {
      this.heroes = res;
      this.load = false;
    });
  }

  modificarHero(id : string ) {
    this.router.navigateByUrl(`heroe/${id}`);
  }

  deleteHero(id: string, index: number) {
    this.heroe.deleteHero(id).subscribe(()=>{
      this.heroes.splice(index, 1);
    });
  }

}
