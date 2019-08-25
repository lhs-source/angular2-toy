import { Component, EventEmitter, Input } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, UploaderOptions, UploadStatus } from './ngx-uploader/classes/interfaces';
import { humanizeBytes } from './ngx-uploader/classes/ngx-uploader.class';

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls : [
      'file-upload.component.css',
  ]
})
export class FileUploadComponent {
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  //@Input() filedirs: string[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  filename : string;
  desturl : string = 'http://localhost:3000/upload';
  @Input() send2parent : Function;

  constructor() {
    this.options = { concurrency: 1 };
    this.files = [];
    // this.filedirs = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }

  onUploadOutput(output: UploadOutput): void {
    console.log(output);
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: this.desturl,
        method: 'POST',
        data: { foo: 'bar' }
      };

      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
      this.files.push(output.file);
      // this.filedirs.push(output.file.name);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
      // this.filedirs[index] = output.file.name;
    } else if (output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
      // this.filedirs = this.filedirs.filter(file => file !== output.file.name);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } 
    else if (output.type === 'done'){
      console.log("done!");
      this.filename = "http://localhost:3000/uploads/" + output.file.name;
      console.log(this.filename);
      let callback = {
        filename : output.file.name
      }
      this.send2parent(callback);
    }

    // console.log(this.filedirs);
    //this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: this.desturl,
      method: 'POST',
      data: { foo: 'bar' }
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
}