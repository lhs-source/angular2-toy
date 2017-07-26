import { Component, 
        OnChanges, 
        Directive, 
        Input, 
        Output, 
        ViewContainerRef,
        ElementRef, 
        EventEmitter, 
        OnInit,
        ViewChild}
        from '@angular/core';
import {NgModule, Compiler, ReflectiveInjector} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


export class ColorPickerComponent implements OnInit, OnChanges{
    ngOnChanges(changes : any) : void{

    }
    ngOnInit() : void {

    }
}

export class Hsva {
    constructor(public h: number, public s: number, public v: number, public a: number) { }
}
export class Hsla {
    constructor(public h: number, public s: number, public l: number, public a: number) { }
}
export class Rgba {
    constructor(public r: number, public g: number, public b: number, public a: number) { }
}
export class SliderPosition {
    constructor(public h: number, public s: number, public v: number, public a: number) { }
}
export class SliderDimension {
    constructor(public h: number, public s: number, public v: number, public a: number) { }
}