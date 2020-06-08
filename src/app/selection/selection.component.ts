import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ExtensionService} from '../extension.service';
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
  extensionGroup: ExtensionGroup;

  constructor(private formBuilder: FormBuilder, private extensionService: ExtensionService) { }

  get extensions() {
    if (this.extensionGroup) {
      return this.extensionGroup.extensions
        .sort((a, b) => {
          if (!a.hasErrors() && b.hasErrors()) {
            return -1;
          }
          else if (a.hasErrors() && !b.hasErrors()) {
            return 1;
          }
          else {
            return 0;
          }
      });
    }
  }

  ngOnInit(): void {
    this.downloadRunning = false;
  }

  onClear(): void {
    this.extensionsForm.reset();
    this.extensionGroup = null;
  }

  onSubmit(): void {
    this.downloadRunning = true;
    this.extensionGroup = ExtensionGroup.from(this.extensionsForm.get('extensions').value);
    this.extensionService.downloadExtensionGroup(this.extensionGroup).subscribe({
      next: value => console.log(value),
      complete: () => {
        this.extensionGroup.createZipArchive().subscribe(archive => this.createDownload(archive));
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
