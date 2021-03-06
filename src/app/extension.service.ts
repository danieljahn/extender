import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {Extension, ExtensionBlobError, ExtensionMetadataError} from './extension';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ExtensionGroup} from './extension-group';
import {ExtensionMetadata} from './extension-metadata';

@Injectable({
  providedIn: 'root'
})
export class ExtensionService {

  private readonly baseUrl = 'https://open-vsx.org/api';

  constructor(private httpClient: HttpClient) {
  }

  public getExtension(extension: Extension): Observable<Extension> {
    const metadataUrl = `${this.baseUrl}/${extension.namespace}/${extension.name}/latest`;
    return this.httpClient.get<ExtensionMetadata>(metadataUrl)
      .pipe(
        map(metadata => extension.withMetadata(metadata)),
        switchMap(extensionWithMetadata => {
            return this.httpClient.get(extensionWithMetadata.getDownloadUrl(), {responseType: 'blob'})
              .pipe(
                map(extensionBlob => {
                  return extensionWithMetadata.withBlob(extensionBlob);
                },
                catchError(() => of(extension.withError(new ExtensionBlobError()))))
              );
          }
        ),
        catchError(() => of(extension.withError(new ExtensionMetadataError())))
      );
  }

  private getMetadata(extensionId: Extension): Observable<any> {
    const metadataUrl = `${this.baseUrl}/${extensionId.namespace}/${extensionId.name}`;
    return this.httpClient.get<ExtensionMetadata>(metadataUrl);
  }

  public downloadExtensionGroup(extensionGroup: ExtensionGroup): Observable<Extension[]> {
    return forkJoin(extensionGroup.extensions.map(e => this.getExtension(e)));
  }
}


