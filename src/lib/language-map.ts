import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { python } from '@codemirror/lang-python';
import { markdown } from '@codemirror/lang-markdown';
import { json } from '@codemirror/lang-json';
import { java } from '@codemirror/lang-java';
import { php } from '@codemirror/lang-php';
import { rust } from '@codemirror/lang-rust';
import { cpp } from '@codemirror/lang-cpp';
import { StreamLanguage } from '@codemirror/language';
import { ruby } from '@codemirror/legacy-modes/mode/ruby';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { swift } from '@codemirror/legacy-modes/mode/swift';
import { go } from '@codemirror/legacy-modes/mode/go';
import { csharp } from '@codemirror/legacy-modes/mode/clike';


export const languageMap: { [key: string]: string } = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python',
    java: 'Java',
    csharp: 'C#',
    cpp: 'C++',
    php: 'PHP',
    ruby: 'Ruby',
    go: 'Go',
    swift: 'Swift',
    kotlin: 'Kotlin',
    rust: 'Rust',
    html: 'HTML',
    css: 'CSS',
    sql: 'SQL',
    shell: 'Shell',
    plaintext: 'Texte brut',
};

// Map file extensions to CodeMirror language extensions
const extensionMap: { [key: string]: any } = {
    js: javascript({ jsx: true }),
    jsx: javascript({ jsx: true }),
    ts: javascript({ typescript: true, jsx: true }),
    tsx: javascript({ typescript: true, jsx: true }),
    html: html(),
    css: css(),
    py: python(),
    md: markdown(),
    json: json(),
    java: java(),
    php: php(),
    rs: rust(),
    cpp: cpp(),
    rb: () => StreamLanguage.define(ruby),
    sh: () => StreamLanguage.define(shell),
    swift: () => StreamLanguage.define(swift),
    go: () => StreamLanguage.define(go),
    cs: () => StreamLanguage.define(csharp),
    // Add other languages as needed
};

export const getLanguageExtension = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension ? extensionMap[extension] || [] : [];
};
