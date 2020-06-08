import {Extension} from './extension';
import * as JSZip from 'jszip';
import {from, Observable} from 'rxjs';

export class ExtensionGroup {

  extensions: Extension[];
  zipArchive: Blob;

  constructor(extensions: Extension[]) {
    this.extensions = extensions;
  }

  public static from(entensionIds: string): ExtensionGroup {
    const extensions = entensionIds
      .split('\n')
      .filter(id => id.length > 0)
      .map(Extension.from);
    return new ExtensionGroup(extensions);
  }

  public createShellScript(): string {
    return this.extensions
      .map(e => `code --install-extension ${e.getFileName()}`)
      .join('\n');
  }

  public createZipArchive(): Observable<Blob>{
    const zip = new JSZip();
    this.extensions.forEach(e => {
      zip.file(e.getFileName(), e.getBlob(), {binary: true});
    });
    zip.file('install.sh', this.createShellScript(), {unixPermissions: '755'});
    return from(zip.generateAsync({type: 'blob', platform: 'UNIX'}));
  }
}
