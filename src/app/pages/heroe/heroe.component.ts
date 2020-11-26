import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service'; 
import { HeroesModels } from '../../models/heroes.models';

@Component({
  selector:'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit {

  heroeM =  new HeroesModels();

  constructor(  private heroe: HeroesService,
                private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if ( id.length > 8 ){
      this.heroe.getOneHero(id).subscribe( (res: HeroesModels) => {
        this.heroeM.id = id;
        this.heroeM.nombre = res.nombre;
        this.heroeM.poder = res.poder;
        this.heroeM.vivo = res.vivo;
      });
    }
  }

  guardar( form: NgForm ) {
    if ( form.invalid ) {
      console.log('Formulario inválido');
    }
    if(this.heroeM.id){
      this.heroe.updateHero(this.heroeM).subscribe( console.log );
    } else {
      this.heroe.setHeroe(this.heroeM).subscribe( res => {
        console.log( res );
      });
    }
  }

}