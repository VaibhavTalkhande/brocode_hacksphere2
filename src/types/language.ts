export enum Language {
  JAVASCRIPT = 'javascript',
  PYTHON = 'python',
  JAVA = 'java',
  CPP = 'cpp',
}

export const languageNames: Record<Language, string> = {
  [Language.JAVASCRIPT]: 'JavaScript',
  [Language.PYTHON]: 'Python',
  [Language.JAVA]: 'Java',
  [Language.CPP]: 'C++',
};

export const languageExtensions: Record<Language, string> = {
  [Language.JAVASCRIPT]: 'js',
  [Language.PYTHON]: 'py',
  [Language.JAVA]: 'java',
  [Language.CPP]: 'cpp',
};