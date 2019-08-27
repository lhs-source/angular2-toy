import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "../ngx-image-gallery/nig.module";
 

@Component({
    selector: 'gal',
    templateUrl : 'gal.component.html',
    styleUrls : [
        'gal.component.scss',
    ],
})
export class GalComponent{
	@ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;
  
  // gallery configuration
  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
  };

	// images = [
	// 	"http://localhost:3000/uploads/KakaoTalk_20190822_212515189.jpg",
	// 	"http://localhost:3000/uploads/KakaoTalk_20190822_212524681.jpg",
	// 	"http://localhost:3000/uploads/3fd6fdedfadb48a9917973ba10ac574a.png",
	// 	"http://localhost:3000/uploads/1507718722f4a4155f511944a8b6284d5c00ad0281__mn132811__w741__h546__f66493__Ym201710.jpg",
	// 	"http://localhost:3000/uploads/1507803180 (3).png",
	// 	"http://localhost:3000/uploads/8a6d25370fe33078b0808364fdf0f449.png",
	// 	"http://localhost:3000/uploads/1508320561524a519e728f44788351bd9a99af3548__mn727844__w800__h450__f33404__Ym201710.png"
	// ];
	images: GALLERY_IMAGE[] = [
		{
		  url: "http://localhost:3000/uploads/KakaoTalk_20190822_212515189.jpg", 
		  altText: 'woman-in-black-blazer-holding-blue-cup', 
		  title: 'woman-in-black-blazer-holding-blue-cup',
		  thumbnailUrl: "http://localhost:3000/uploads/KakaoTalk_20190822_212515189.jpg"
		},
		{
		  url: "http://localhost:3000/uploads/KakaoTalk_20190822_212524681.jpg", 
		  altText: 'two-woman-standing-on-the-ground-and-staring-at-the-mountain', 
		//   extUrl: 'https://www.pexels.com/photo/two-woman-standing-on-the-ground-and-staring-at-the-mountain-669006/',
		  thumbnailUrl: "http://localhost:3000/uploads/KakaoTalk_20190822_212524681.jpg"
		},
	  ];
    constructor(){

	}
	// METHODS
  // open gallery
  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }
    
  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }
    
  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }
    
  // next image in gallery
  nextImage(index: number = 0) {
	// this.ngxImageGallery.next(index);
	this.ngxImageGallery.next();
  }
    
  // prev image in gallery
  prevImage(index: number = 0) {
	// this.ngxImageGallery.prev(index);
	this.ngxImageGallery.prev();
  }
    
  /**************************************************/
    
  // EVENTS
  // callback on gallery opened
  galleryOpened(index) {
    console.info('Gallery opened at index ', index);
  }
 
  // callback on gallery closed
  galleryClosed() {
    console.info('Gallery closed.');
  }
 
  // callback on gallery image clicked
  galleryImageClicked(index) {
    console.info('Gallery image clicked with index ', index);
  }
  
  // callback on gallery image changed
  galleryImageChanged(index) {
    console.info('Gallery image changed to index ', index);
  }
 
  // callback on user clicked delete button
  deleteImage(index) {
    console.info('Delete image at index ', index);
  }

    ngOnInit(){

    }
	
}