import type { PrismLib } from 'prism-react-renderer';

const K = [
  'END_TYPE', 'TYPE', 'END_STRUCT', 'STRUCT', 'OVERLAP', 'ARRAY', 'OF', 'REF_TO', 'REF',
  'END_VAR', 'VAR_GLOBAL', 'VAR_CONFIG', 'VAR_ACCESS', 'VAR_EXTERNAL', 'VAR_TEMP',
  'VAR_IN_OUT', 'VAR_OUTPUT', 'VAR_INPUT', 'VAR', 'CONSTANT', 'RETAIN', 'NON_RETAIN', 'AT',
  'END_PROGRAM', 'PROGRAM', 'END_FUNCTION_BLOCK', 'FUNCTION_BLOCK', 'END_FUNCTION', 'FUNCTION',
  'END_CLASS', 'CLASS', 'END_INTERFACE', 'INTERFACE', 'END_METHOD', 'METHOD',
  'FINAL', 'ABSTRACT', 'EXTENDS', 'IMPLEMENTS', 'OVERRIDE',
  'PUBLIC', 'PROTECTED', 'PRIVATE', 'INTERNAL',
  'END_CONFIGURATION', 'CONFIGURATION', 'END_RESOURCE', 'RESOURCE', 'ON', 'TASK', 'WITH',
  'READ_ONLY', 'READ_WRITE', 'PRIORITY', 'INTERVAL', 'SINGLE',
  'END_IF', 'IF', 'THEN', 'ELSIF', 'ELSE', 'END_CASE', 'CASE',
  'END_FOR', 'FOR', 'TO', 'BY', 'DO', 'END_WHILE', 'WHILE', 'END_REPEAT', 'REPEAT', 'UNTIL',
  'EXIT', 'CONTINUE', 'RETURN', 'AND', 'OR', 'XOR', 'NOT', 'MOD',
];

const T = [
  'ANY(?:_(?:DERIVED|ELEMENTARY|MAGNITUDE|NUM|REAL|INT|BIT|STRING|DATE))?',
  'L?TIME_OF_DAY', 'L?TOD', 'L?DATE_AND_TIME', 'L?DT', 'L?DATE', 'L?TIME',
  'BOOL', 'W?CHAR', 'W?STRING', 'U?[SDL]?INT', 'L?REAL', '[DL]?WORD', 'BYTE',
];

const w = (a: string[]) => ({
  pattern: new RegExp(`(^|[^.\\w])(?:${a.join('|')})\\b`, 'i'),
  lookbehind: true,
});

const c = (o: string, e: string) =>
  new RegExp(`${o}(?:${o}[\\s\\S]*?${e}|[\\s\\S])*?(?:${e}|$)`);

export default function prismIncludeLanguages(p: PrismLib): void {
  p.languages.iecst = {
    comment: [
      { pattern: c('\\(\\*', '\\*\\)'), greedy: true },
      { pattern: c('\\/\\*', '\\*\\/'), greedy: true },
      { pattern: /\{[\s\S]*?(?:\}|$)/, greedy: true },
      { pattern: /(^|[^:])\/\/.*/, lookbehind: true, greedy: true },
    ],
    string: {
      pattern: /'(?:\$[\s\S]|[^$'\r\n])*'|"(?:\$[\s\S]|[^$"\r\n])*"/,
      greedy: true,
    },
    address: {
      pattern: /%[IQM]?[XBWDL]?(?:\*|\d+(?:\.\d+)*)?/i,
      alias: 'symbol',
    },
    boolean: /\bBOOL#(?:TRUE|FALSE|[01])\b|\b(?:TRUE|FALSE|NULL)\b/i,
    number: [
      /\b(?:L?TIME|L?T)#[-+]?[\d_.a-z]*[a-z]/i,
      /\b(?:L?TIME_OF_DAY|L?TOD|L?DATE_AND_TIME|L?DT|L?DATE|L?D)#[\d_.:-]*\d/i,
      /\b(?:[a-z_]\w*#)?(?:2#[01_]+|8#[0-7_]+|16#[\da-f_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:e[-+]?\d[\d_]*)?)\b/i,
    ],
    keyword: w(K),
    'class-name': w(T),
    function: /\b[a-z_]\w*(?=\s*\()/i,
    operator: /:=|\?=|=>|<>|<=|>=|\*\*|[-+*/=<>&^]/,
    punctuation: /\.\.|[()[\].,;:#]/,
  };
}
