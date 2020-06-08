import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {ExtensionService} from '../extension.service';
import {Extension} from '../extension';
import { saveAs } from 'file-saver';
import {ExtensionGroup} from '../extension-group';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  extensionsForm = this.formBuilder.group({
    extensions: ['']
  });

  downloadRunning: boolean;

  constructor(private formBuilder: FormBuilder, private extensionService: ExtensionService) { }

  ngOnInit(): void {
    this.downloadRunning = false;
  }

  onClear(): void {
    this.extensionsForm.reset();
  }

  onSubmit(): void {
    this.downloadRunning = true;
    const extensionGroup = ExtensionGroup.from(this.extensionsForm.get('extensions').value);
    this.extensionService.downloadExtensionGroup(extensionGroup).subscribe({
      next: value => console.log(value),
      complete: () => {
        extensionGroup.createZipArchive().subscribe(archive => this.createDownload(archive));
      }
    });
  }

  private createDownload(file: Blob) {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(file);
      link.download = 'extensions.zip';
      this.downloadRunning = false;
      link.click();
  }
}
