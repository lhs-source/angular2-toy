import { Component, Input } from '@angular/core';

interface Item  {
    mainTitle : string,
    subTitle : string,
    content : string
};

@Component({
    selector: 'css-timeline',
    templateUrl : 'css-timeline.component.html',
    styleUrls : [
        'css-timeline.component.scss',
    ],
})
export class CSSTimelineComponent{
    items : Item[];
    sel_index : number;
    @Input() changeIndex : Function;

    constructor(){
        this.sel_index = -1;
        this.items = [
            {
                mainTitle : "2019.05",
                subTitle : "sub title",
                content : "content",
            },
            {
                mainTitle : "2019.06",
                subTitle : "sub title2",
                content : "content2",
            },
            {
                mainTitle : "2019.07",
                subTitle : "sub title3",
                content : "content3",
            },
            {
                mainTitle : "2019.08",
                subTitle : "sub title4",
                content : "content4",
            }
        ]
    }
	clickItem(item : Item, index : number){
        console.log(item);
        this.sel_index = index;
        console.log(index);
        this.changeIndex(item.mainTitle);
    }
}