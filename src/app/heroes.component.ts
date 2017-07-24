import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './heroClass';
import { HeroService} from './hero.service';

@Component({
  selector: 'my-heros',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  title = 'app. yeah this is an app. that\'s right. my DEMO page~';
  heroes : Hero[];
  selectedHero: Hero;

  constructor(
    private router : Router,
    private heroService: HeroService
  ){}

  getHeroes():void{
    //this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  onSelect(hero: Hero) : void{
    this.selectedHero = hero;
  }
  ngOnInit():void{
    this.getHeroes();
  }
  gotoDetail() : void{
    this.router.navigate(['/detail', this.selectedHero.totalPower]);
  }
}