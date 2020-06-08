import {ExtensionMetadata} from './extension-metadata';

export class Extension {

  private constructor(id: string){
    this.id = id;
    this.namespace = this.extractNamespaceFromId();
    this.name = this.extractNameFromId();
  }

  id: string;
  namespace: string;
  name: string;
  private metadata: ExtensionMetadata;
  private blob: Blob;
  private errors: ExtensionError[] = [];

  public static from(extensionId: string){
    if (Extension.isIdValid(extensionId)) {
      return new Extension(extensionId);
    }
  }

  private static isIdValid(extensionId: string): boolean{
    const matches = extensionId.match(/^[\w-]+\.[\w-]+$/);
    return matches && matches.length === 1;
  }

  private extractNamespaceFromId() {
    return this.id.split('.')[0];
  }

  private extractNameFromId() {
    return this.id.split('.')[1];
  }

  public withMetadata(metadata: ExtensionMetadata) {
    this.metadata = metadata;
    return this;
  }

  public withBlob(blob: Blob) {
    this.blob = blob;
    return this;
  }

  public withError(error: ExtensionError): Extension {
    this.errors.push(error);
    return this;
  }

  public hasErrors() {
    return this.errors.length > 0;
  }

  public getDownloadUrl(): string {
    return this.metadata.files.download;
  }

  public getBlob() {
    return this.blob;
  }

  public getFileName() {
    return this.metadata.files.download.substring(this.metadata.files.download.lastIndexOf('/') + 1);
  }

  getId() {
    return this.id;
  }

  getMetadata(): ExtensionMetadata {
    return this.metadata;
  }

  getErrors() {
    return this.errors;
  }
}

export abstract class ExtensionError {
  message: string;
}

export class ExtensionMetadataError extends ExtensionError{
  message = 'Could not download metadata';
}

export class ExtensionBlobError extends ExtensionError{
  message = 'Could not download extension';
}

