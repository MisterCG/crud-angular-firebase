import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { HeroesModels } from '../models/heroes.models';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-8fc03.firebaseio.com/';

  constructor( private http: HttpClient ) { }

  getHeroes() {
    return this.http.get(`${this.url}heroes.json`)
            .pipe( map(res=> {
              delay(1500)
              return this.arrHeroes(res)
            }));
  }

  getOneHero(id: string) {
    return this.http.get(`${this.url}heroes/${id}.json`);
  }

  private arrHeroes( heroeObj: Object ) {
    let heroe: HeroesModels = new HeroesModels();
    let heroes: HeroesModels[] = [];
    if(!heroeObj){ return heroes = []; }

    Object.keys( heroeObj ).forEach( key =>  {
      heroe = heroeObj[key];
      heroe.id = key
      heroes.push(heroe);
    });
    return heroes;
  }

  setHeroe(heroe: HeroesModels) {
    return this.http.post(`${this.url}heroes.json`, heroe)
            .pipe( map( resp => {
              heroe.id = resp['name'];
              return heroe;
            }));
  }

  updateHero( hero: HeroesModels ) {
    return this.http.put(`${this.url}heroes/${hero.id}.json`, hero);
  }

  deleteHero(id: string) {
    return this.http.delete(`${this.url}heroes/${id}.json`);
  }

}
