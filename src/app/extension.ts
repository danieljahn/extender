import {Observable} from "rxjs";

export class Extension {

  id: string;
  namespace: string;
  name: string;
  private metadata: ExtensionMetadata;
  private blob: Blob;

  private constructor(id: string){
    this.id = id;
    this.namespace = this.extractNamespaceFromId();
    this.name = this.extractNameFromId();
  }

  private extractNamespaceFromId() {
    return this.id.split('.')[0];
  }

  private extractNameFromId() {
    return this.id.split('.')[1];
  }

  public static from(extensionId: string){
    if (Extension.isIdValid(extensionId)) {
      return new Extension(extensionId);
    }
  }

  private static isIdValid(extensionId: string): boolean{
    const matches = extensionId.match(/^[\w-]+\.[\w-]+$/);
    return matches && matches.length === 1;
  }

  withMetadata(metadata: ExtensionMetadata) {
    this.metadata = metadata;
    return this;
  }

  withBlob(blob: Blob) {
    this.blob = blob;
    return this;
  }

  public getDownloadUrl(): string {
    return this.metadata.files.download;
  }

  getBlob() {
    return this.blob;
  }

  getFileName() {
    return this.metadata.files.download.substring(this.metadata.files.download.lastIndexOf('/')+1);
  }
}

export interface ExtensionMetadata {
  files: {
    download: string
  }
}
