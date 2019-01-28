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
  // name = new FormControl('', Validators.required);
  // age = new FormControl('', Validators.required);
  // weight = new FormControl('', Validators.required);
  cmid = new FormControl('', Validators.required);
  bin = new FormControl('', Validators.required);
  corp_no = new FormControl('', Validators.required);
  corp_name = new FormControl('', Validators.required);
  corp_cls = new FormControl('', Validators.required);
  biz_kind = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  post_no = new FormControl('', Validators.required);
  reg_dt = new FormControl('', Validators.required);
  bank = new FormControl('');
  acnt_name = new FormControl('');
  acnt_no = new FormControl('');
  
  constructor(private merchantService: MerchantsService,
              private formBuilder: FormBuilder, // ReactiveFormsModule import 필요
              private http: Http,
              ) { }

  ngOnInit() {
    this.getMerchant();
    this.addMerchantForm = this.formBuilder.group({
      cmid: this.cmid,
      bin: this.bin,
      corp_no: this.corp_no,
      corp_name: this.corp_name,
      corp_cls: this.corp_cls,
      biz_kind: this.biz_kind,
      email: this.email,
      post_no: this.post_no,
      reg_dt: this.reg_dt,
      bank: this.bank,
      acnt_name: this.acnt_name,
      acnt_no: this.acnt_no
    });
  }

  getMerchant() {
    this.merchantService.getMerchants().subscribe(
      data => {this.merchants = data; console.log(data)},
      error => console.log(error),
      () => {this.isLoading = false;}
    );
  }

  addMerchant() {
    this.merchantService.addMerchant(this.addMerchantForm.value).subscribe(
      res => {
        console.log(res.json());
        this.merchants.push(this.addMerchantForm.value);
        console.log(this.merchants);
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
