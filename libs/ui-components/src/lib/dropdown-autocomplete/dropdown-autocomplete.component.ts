import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ControlContainer, FormGroupDirective, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularmaterialModule } from '../angularmaterial.module';
import { MediaChange, MediaObserver, FlexLayoutModule } from '@angular/flex-layout';
//import {MatFormFieldModule} from '@angular/material/form-field';

export class State {
  constructor(public name: string, public population: string, public flag: string) { }
}


@Component({
  selector: 'portal-dropdown-autocomplete',
  templateUrl: './dropdown-autocomplete.component.html',
  styleUrls: ['./dropdown-autocomplete.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AngularmaterialModule, FlexLayoutModule],
})
// export class DropdownAutocompleteComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
//==================================

export class DropdownAutocompleteComponent {
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;

  question = 'Would you like to add "';

  states: any[] = [
    {
      value: 'One',
      description: 'the first one',
      details: 'details of the first one'
    },
    {
      value: 'Two',
      description: 'the second one',
      details: 'details of the second one'
    },
    {
      value: 'Three',
      description: 'the third one',
      details: 'details of the third one'
    }
    // 'Arkansas',
    // 'Azar',
    // 'California',
    // 'Florida',
    // 'Texas'
  ];

  @Output() changeSelection = new EventEmitter<any>();

  constructor() {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
      startWith(''),
      map(state => state ? this.filterStates(state) : this.states.slice())
      );
  }

  filterStates(name: string) {
    let results = this.states.filter(state =>
      state.value.toLowerCase().indexOf(name.toLowerCase()) === 0);

    if (results.length < 1) {
      results = [this.question + name + '"?'];
    }
    this.changeSelection.emit(results);
    return results;
  }

  optionSelected(option:any) {
    console.log('optionSelected:', option.value);
    if (option.value.indexOf(this.question) === 0) {
      const newState = option.value.substring(this.question.length).split('"?')[0];
      this.states.push(newState);
      this.stateCtrl.setValue(newState);
    }
  }

  enter() {
    const value = this.stateCtrl.value;
    if (!this.states.some(entry => entry === value)) {
      this.states.push(value);
    }
    setTimeout(() => this.stateCtrl.setValue(value));
  }

  onKeyUpEvent(e:any) {
    this.enter();
  }


}
