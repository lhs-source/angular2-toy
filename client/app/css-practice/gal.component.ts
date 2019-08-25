import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'gal',
    templateUrl : 'gal.component.html',
    styleUrls : [
        'gal.component.scss',
    ],
})
export class GalComponent{
	images = [
		"http://localhost:3000/uploads/KakaoTalk_20190822_212515189.jpg",
		"http://localhost:3000/uploads/KakaoTalk_20190822_212524681.jpg",
		"http://localhost:3000/uploads/3fd6fdedfadb48a9917973ba10ac574a.png",
		"http://localhost:3000/uploads/1507718722f4a4155f511944a8b6284d5c00ad0281__mn132811__w741__h546__f66493__Ym201710.jpg",
		"http://localhost:3000/uploads/1507803180 (3).png",
		"http://localhost:3000/uploads/8a6d25370fe33078b0808364fdf0f449.png",
		"http://localhost:3000/uploads/1508320561524a519e728f44788351bd9a99af3548__mn727844__w800__h450__f33404__Ym201710.png"
	];
    constructor(){

    }

    ngOnInit(){

    }
	
}