import { TestBed } from '@angular/core/testing';

import { ExtensionService } from './extension.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {metadataRepsonse, extensionResponse} from './open-vsx-mock/open-vsx-api-mock';
import {Extension} from './extension';

describe('ExtensionService', () => {
  let service: ExtensionService;
  let mockApi: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExtensionService]
    });
    service = TestBed.inject(ExtensionService);
    mockApi = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should download an extension', () => {

    service.getExtension(Extension.from('formulahendry.code-runner')).subscribe(
      {
        next: (extension: Extension) => {
          expect(extension.getDownloadUrl()).toEqual(metadataRepsonse.files.download);
          expect(extension.getBlob()).toEqual(extensionResponse);
        }
      }
    );

    const metadataRequest = mockApi.expectOne('https://open-vsx.org/api/formulahendry/code-runner/latest');
    expect(metadataRequest.request.method).toEqual('GET');
    metadataRequest.flush(metadataRepsonse);

    const extensionRequest = mockApi.expectOne('https://open-vsx.org/api/formulahendry/code-runner/0.10.0/file/formulahendry.code-runner-0.10.0.vsix');
    expect(extensionRequest.request.method).toEqual('GET');
    extensionRequest.flush(extensionResponse);

  });
});
