import { ExtensionGroup } from './extension-group';
import { Extension } from './extension';

describe('ExtensionGroup.from()', () => {
  it('should create an empty Extension Group for empty list of extsion IDs', () => {
    const extensionGroup: ExtensionGroup = ExtensionGroup.from('');

    expect(extensionGroup).toBeTruthy();
    expect(extensionGroup.extensions.length).toBe(0);
  });

  it('should create an Extension Group with one entry for a single extension ID', () => {
    const extensionGroup: ExtensionGroup = ExtensionGroup.from('namespace.extension');
    const expectedExtension = Extension.from('namespace.extension');

    expect(extensionGroup).toBeTruthy();
    expect(extensionGroup.extensions.length).toBe(1);
    expect(extensionGroup.extensions[0].id).toEqual('namespace.extension');
  });
});
