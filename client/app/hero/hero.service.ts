import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hero } from './heroClass';

@Injectable()
export class HeroService{

    private heroesUrl = 'api/heroes';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http : Http) { }

    getHeroes(): Observable<Hero[]> {
        console.log("service : getHeros");
        // return this.http.get('api/heroes')
        //                 .toPromise()
        //                 .then(response => {response.json(); console.log(response.json());})
        //                 .catch(this.handleError);
        //return Promise.resolve(HEROES);
        return this.http.get('api/heroes').map(response => response.json());
    }

    // getHeroesSlowly(): Promise<Hero[]> {
    //     return new Promise(resolve => {
    //     // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(this.getHeroes()), 2000);
    //     });
    // }
    getHero(id : number) : Promise<Hero>{
        console.log("service : getHero");
        const url = `api/hero/${id}`;
        return this.http.get(url)
                        .toPromise()
                        .then(response => response.json().data as Hero)
                        .catch(this.handleError);
        // return this.getHeroes()
        //     .then(heroes => heroes.find(hero => hero.totalPower === p));
    }
    update(hero : Hero) : Promise<Hero> {
        console.log("service : update");
        const url = `api/hero/${hero.id}`;
        return this.http.put(url, JSON.stringify(hero), {headers : this.headers})
                        .toPromise()
                        .then(() => hero)
                        .catch(this.handleError);
    }
    create(name : string) : Promise<Hero>{
        console.log("service : create");
        return this.http.post('api/hero', JSON.stringify({name : name}), {headers : this.headers})
                        .toPromise()
                        .then(res => res.json().data as Hero)
                        .catch(this.handleError);
    }
    delete(id : number) : Promise<void> {
        console.log("service : delete");
        const url = `api/hero/${id}`;
        return this.http.delete(url, {headers : this.headers})
                        .toPromise()
                        .then(() => null)
                        .catch(this.handleError);
    }
    private handleError(error : any) : Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}