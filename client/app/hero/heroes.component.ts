import { Component, OnInit } from '@angular/core';
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
  heroes : Hero[] = [];
  selectedHero: Hero;

  constructor(
    private router : Router,
    private heroService: HeroService
  ){}

  getHeroes():void{
    //this.heroes = this.heroService.getHeroes();
    // this.heroService.getHeroes()
    //                 .then(heroes => {this.heroes = heroes; console.log(this.heroes); console.log(heroes)}
    //               );
    this.heroService.getHeroes().subscribe(
      data => this.heroes = data,
      error => console.log(error)
    );
  }
  onSelect(hero: Hero) : void{
    this.selectedHero = hero;
    console.log("heroes component : onSelecte");
  }
  ngOnInit():void{
    this.getHeroes();
    console.log("heroes component : init");
  }
  gotoDetail() : void{
    this.router.navigate(['/detail', this.selectedHero.id]);
    console.log("heroes component : gotoDetail");
  }
  add(name : string) : void {
    name = name.trim();
    if(!name) { return; }
    this.heroService.create(name)
                    .then(hero =>{
                      this.heroes.push(hero);
                      this.selectedHero = null;
                    });
    console.log("heroes component : add");
  }
  delete(hero :Hero) : void{
    this.heroService.delete(hero.id)
                    .then(()=>{
                      this.heroes = this.heroes.filter(h => h !== hero);
                      if(this.selectedHero === hero) { 
                        this.selectedHero = null;
                      }
                    });
    console.log("heroes component : delete");
  }
}