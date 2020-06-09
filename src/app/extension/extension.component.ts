import {Component, Input, OnInit} from '@angular/core';
import {Extension} from '../extension';

@Component({
  selector: 'app-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.scss']
})
export class ExtensionComponent implements OnInit {

  constructor() { }

  @Input()
  extension: Extension;

  ngOnInit(): void {
  }

  get id() {
    return this.extension?.getId();
  }

  get status(){
    return this.extension?.hasErrors() ? 'Error' : 'OK';
  }

  get hasMetadata() {
    return !this.extension?.hasErrors() && this.extension?.getMetadata() !== undefined;
  }

  get metadata() {
    return this.extension?.getMetadata();
  }

  get hasErrors() {
    return this.extension?.hasErrors();
  }

  get errors() {
    return this.extension?.getErrors().map(e => e.message).join('\n');
  }

  get icon(){
    return this.hasMetadata ? this.metadata.files.icon : 'assets/icons/extension-black-48dp.svg';
  }
}
