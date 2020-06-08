export interface ExtensionMetadata {
  namespaceUrl: string;
  reviewsUrl: string;
  files: Files;
  name: string;
  namespace: string;
  publishedBy: PublishedBy;
  unrelatedPublisher: boolean;
  namespaceAccess: string;
  allVersions: AllVersions;
  downloadCount: number;
  reviewCount: number;
  version: string;
  versionAlias: string[];
  timestamp: Date;
  preview: boolean;
  displayName: string;
  description: string;
  engines: string[];
  categories: string[];
  tags: string[];
  license: string;
  homepage: string;
  repository: string;
  bugs: string;
  galleryColor: string;
  galleryTheme: string;
  qna: string;
  dependencies: any[];
  bundledExtensions: any[];
}

export interface AllVersions {
  latest: string;
  '1.14.5': string;
  '1.14.3': string;
  '1.13.1': string;
  '1.13.0': string;
}

export interface Files {
  download: string;
  manifest: string;
  icon: string;
  readme: string;
  license: string;
}

export interface PublishedBy {
  loginName: string;
  fullName: string;
  avatarUrl: string;
  homepage: string;
  provider: string;
}
