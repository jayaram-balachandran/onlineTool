import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  myForm!: FormGroup;
  darkMode: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      formatBox: 'Paste your text here for formatting.',
      caseSensitive: '',
      find: '',
      replace: '',
    });
  }

  toggleDark() {
    this.darkMode = !this.darkMode;
  }

  replace() {
    if (this.caseVal) {
      const value = this.formatBoxVal;
      let newValue = value.replaceAll(this.findVal, this.replaceVal);
      this.formatBox?.patchValue(newValue);
    } else if (!this.caseVal) {
      const value = this.formatBoxVal;
      var regEx = new RegExp(this.findVal, 'ig');
      let newValue = value.replaceAll(regEx, this.replaceVal);
      this.formatBox?.patchValue(newValue);
    }
  }

  ucAll() {
    const ucAll = this.formatBoxVal.toUpperCase();
    this.formatBox?.patchValue(ucAll);
  }

  lcAll() {
    const lcAll = this.formatBoxVal.toLowerCase();
    this.formatBox?.patchValue(lcAll);
  }

  cwAll() {
    const cwAll = this.initCap(this.formatBoxVal);
    this.formatBox?.patchValue(cwAll);
  }

  csAll() {
    const csAll = this.formatBoxVal
      .toLowerCase()
      .replace(/(?<=(?:^|[.?!])\W*)[a-z]/g, (i: any) => i.toUpperCase());
    this.formatBox?.patchValue(csAll);
  }

  get formatBox() {
    return this.myForm.get('formatBox');
  }
  get formatBoxVal() {
    return this.myForm.get('formatBox')?.value;
  }
  get findVal() {
    return this.myForm.get('find')?.value;
  }
  get replaceVal() {
    return this.myForm.get('replace')?.value;
  }
  get caseVal() {
    return this.myForm.get('caseSensitive')?.value;
  }

  clear() {
    this.formatBox?.reset();
  }
  initCap(value: any) {
    return value
      .toLowerCase()
      .replace(/(?:^|[^a-zØ-öø-ÿ])[a-zØ-öø-ÿ]/g, (m: any) => {
        return m.toUpperCase();
      });
  }
}
