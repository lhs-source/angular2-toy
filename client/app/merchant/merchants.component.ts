import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { MerchantsService } from './merchants.service';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.css']
})
export class MerchantsComponent implements OnInit {

  merchant = {};
  merchants = [];
  isLoading = true;
  isEditing = false;

  addMerchantForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private merchantService: MerchantsService,
              private formBuilder: FormBuilder, // ReactiveFormsModule import 필요
              private http: Http,
              ) { }

  ngOnInit() {
    this.getMerchant();
    this.addMerchantForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight
    });
  }

  getMerchant() {
    this.merchantService.getMerchants().subscribe(
      data => this.merchants = data,
      error => console.log(error),
      () => {this.isLoading = false;}
    );
  }

  addMerchant() {
    this.merchantService.addMerchant(this.addMerchantForm.value).subscribe(
      res => {
        const newMerchant = res.json();
        this.merchants.push(newMerchant);
        this.addMerchantForm.reset();
        //this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(merchant) {
    this.isEditing = true;
    this.merchant = merchant;
  }

  cancelEditing() {
    this.isEditing = false;
    this.merchant = {};
    //this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the merchants to reset the editing
    this.getMerchant();
  }

  editMerchant(merchant) {
    this.merchantService.editMerchant(merchant).subscribe(
      res => {
        this.isEditing = false;
        this.merchant = merchant;
        //this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteMerchant(merchant) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.merchantService.deleteMerchant(merchant).subscribe(
        res => {
          const pos = this.merchants.map(elem => elem._id).indexOf(merchant._id);
          this.merchants.splice(pos, 1);
          //this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
