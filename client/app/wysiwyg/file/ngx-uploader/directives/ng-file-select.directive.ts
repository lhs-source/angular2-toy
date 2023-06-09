import { Directive, ElementRef, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { UploadOutput, UploaderOptions } from '../classes/interfaces';
import { NgUploaderService } from '../classes/ngx-uploader.class';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[ngFileSelect]'
})
export class NgFileSelectDirective implements OnInit, OnDestroy {
  @Input() options = <UploaderOptions>null;
  @Input() uploadInput: EventEmitter<any>;
  @Output() uploadOutput: EventEmitter<UploadOutput>;

  upload: NgUploaderService;
  el: HTMLInputElement;

  private _sub: Subscription[];

  constructor(private elementRef: ElementRef) {
    this.uploadOutput = new EventEmitter<UploadOutput>();
  }

  ngOnInit() {
    this._sub = [];
    const concurrency = this.options && this.options.concurrency || Number.POSITIVE_INFINITY;
    this.upload = new NgUploaderService(concurrency);

    this.el = this.elementRef.nativeElement;
    this.el.addEventListener('change', this.fileListener, false);

    this._sub.push(
      this.upload.serviceEvents.subscribe((event: UploadOutput) => {
        this.uploadOutput.emit(event);
      })
    );

    if (this.uploadInput instanceof EventEmitter) {
      this._sub.push(this.upload.initInputEvents(this.uploadInput));
    }
  }

  ngOnDestroy() {
    this.el.removeEventListener('change', this.fileListener, false);
    this._sub.forEach(sub => sub.unsubscribe());
  }

  fileListener = () => {
    if (this.el.files) {
      this.upload.handleFiles(this.el.files);
    }
  }
}
