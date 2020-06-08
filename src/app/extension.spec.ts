import { Extension } from './extension';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('Extension', () => {
  it('should create an instance from an extension id', () => {
    const extension: Extension = Extension.from('namespace.extension');

    expect(extension).toBeTruthy();
    expect(extension.id).toEqual('namespace.extension');
  });

  it('should not create an instance from an empty extension id',  () => {
    const extension: Extension = Extension.from('');

    expect(extension).toBeFalsy();
  });

  it('should should extract namespace from id', () => {
    const extension: Extension = Extension.from('namespace.extension');

    expect(extension.namespace).toEqual('namespace');
  });

  it('should should extract name from id', () => {
    const extension: Extension = Extension.from('namespace.extension');

    expect(extension.name).toEqual('extension');
  });
});
