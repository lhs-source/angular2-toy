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

@Component({
    selector : 'palette',
    templateUrl : './color-picker.component.html',
    styleUrls : [
        '/color-picker.component.css'
    ]
})
export class ColorPickerComponent implements OnInit, OnChanges{

    size = 320;
    baseColor  = "#FF0000";
    selectedColor = "#FF0000";
    plusAlpha = "rgba(255, 0, 0, 1)";
    alphaBack = "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 255, 255, 1))";

    basePointerX = 0;
    basePointerY = 0;
    colorPointerX = 0;
    colorPointerY = 0;
    alphaPointerX = 0;
    alphaPointerY = 0;

    ngOnChanges(changes : any) : void{

    }
    ngOnInit() : void {

    }
    rgb(red, green, blue) : number {
        let result = 0;
        result += red << 16;
        result += green << 8;
        result += blue;
        return result;
    }
    rgbstr(rgb : number){
        let result = "#";
        result += ( (rgb & 0xF00000) >> 20 ).toString(16);
        result += ( (rgb & 0xF0000) >> 16 ).toString(16);
        result += ( (rgb & 0xF000) >> 12).toString(16);
        result += ( (rgb & 0xF00) >> 8).toString(16);
        result += ( (rgb & 0xF0) >> 4 ).toString(16);
        result += (rgb & 0xF).toString(16);
        return result;
    }
    rgbstr2num(rgbstr : string) {
        rgbstr = rgbstr.substr(1, rgbstr.length);
        return parseInt(rgbstr, 16);
    }
    color1(event : any) {
        //console.log(event);
        
        this.colorPointerX = event.clientX - 16;
        this.colorPointerY = event.clientY - 95;

        this.calcColor(this.colorPointerX, this.colorPointerY);
        this.calcAlpha(this.alphaPointerX);
    }
    calcColor(x, y) {
        let ratioX = x / this.size;
        let ratioY = y / this.size;

        let base_r = (this.rgbstr2num(this.baseColor) & 0xFF0000) >> 16;
        let base_g = (this.rgbstr2num(this.baseColor) & 0xFF00) >> 8;
        let base_b = this.rgbstr2num(this.baseColor) & 0xFF;
        
        //console.log(base_r + " " + base_g + " " + base_b);

        let r2 = ( 255 - (255 - ( base_r )) * (ratioX) );
        let g2 = ( 255 - (255 - ( base_g )) * (ratioX) );
        let b2 = ( 255 - (255 - ( base_b )) * (ratioX) );

        //console.log(r2 + " " + g2 + " " + b2);

        let r3 = r2 * (1 - ratioY);
        let g3 = g2 * (1 - ratioY);
        let b3 = b2 * (1 - ratioY);
        
        //console.log(r3 + " " + g3 + " " + b3);
        this.selectedColor = this.rgbstr(this.rgb(r3, g3, b3));
        console.log(this.selectedColor);  
    }
    color2(event : any) {
        this.basePointerY = event.clientY - 95;

        this.calcBase(this.basePointerY);
        this.calcColor(this.colorPointerX, this.colorPointerY);
        this.calcAlpha(this.alphaPointerX);
    }
    calcBase(y) {
        let cls = this.size / 6;
        let kind = y / cls;
        let level = y % cls;
        let ratio = level / cls;
        // console.log("color log");
        // console.log(cls);
        // console.log(kind);
        // console.log(level);
        // console.log(ratio);
        if(kind < 1){
            this.baseColor = this.rgbstr(this.rgb(255, 255 * ratio, 0) | 0);
            //console.log(this.baseColor);
        } 
        else if(1 <= kind && kind < 2){
            this.baseColor = this.rgbstr(this.rgb(255*(1 - ratio), 255, 0) | 0);
            //console.log(this.baseColor);            
        } 
        else if(2 <= kind && kind < 3){
            this.baseColor = this.rgbstr(this.rgb(0, 255, 255 * ratio) | 0);
            //console.log(this.baseColor);      
        } 
        else if(3 <= kind && kind < 4){
            this.baseColor = this.rgbstr(this.rgb(0, 255*(1 - ratio), 255) | 0);
            //console.log(this.baseColor);      
        } 
        else if(4 <= kind && kind < 5){
            this.baseColor = this.rgbstr(this.rgb(255 * ratio, 0, 255) | 0);
            //console.log(this.baseColor);      
        } 
        else if(5 <= kind && kind <= 6){
            this.baseColor = this.rgbstr(this.rgb(255, 0, 255*(1 - ratio)) | 0);
            //console.log(this.baseColor);    
        } 
    }
    color3(event : any) {
        this.alphaPointerX = event.clientX - 16;
        this.calcAlpha(this.alphaPointerX);
    }
    calcAlpha(x) {
        let ratio = 1 - x / this.size;
        
        let base_r = this.selectedColor.substr(1, 2);
        let base_g = this.selectedColor.substr(3, 2);
        let base_b = this.selectedColor.substr(5, 2);

        this.plusAlpha = "";
        this.plusAlpha += "rgba(";
        this.plusAlpha += parseInt(base_r, 16);
        this.plusAlpha += ",";
        this.plusAlpha += parseInt(base_g, 16);
        this.plusAlpha += ",";
        this.plusAlpha += parseInt(base_b, 16);
        this.plusAlpha += ","
        this.plusAlpha += ratio;
        this.plusAlpha += ")";

        //console.log(this.plusAlpha);
    }
}