import React, { useState, useCallback, useEffect } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './playground.module.css';

// iec-checker JSON diagnostic format
interface Diagnostic {
  linenr: number;
  column: number;
  file: string;
  id: string;
  msg: string;
  type: string[];
}

const API_BASE =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:8080'
    : 'https://iec-checker.nowarp.io';

interface VersionInfo {
  version: string;
  commit: string;
  commit_short: string;
  commit_date: string;
}

const EXAMPLE_PROGRAMS: Record<string, string> = {
  '': '', // placeholder for "Select example..."
  'Float equality (CP8)': `PROGRAM main
VAR
  x : REAL := 1.0;
  y : REAL := 1.0;
END_VAR
  IF x = y THEN
    x := x + 0.1;
  END_IF;
END_PROGRAM
`,
  'Uninitialized variable (CP3)': `FUNCTION_BLOCK FB_Example
VAR
  counter : INT;
  result  : INT;
END_VAR
  result := counter + 1;
END_FUNCTION_BLOCK
`,
  'Missing ELSE (L17)': `PROGRAM main
VAR
  mode : INT := 0;
  output : BOOL;
END_VAR
  IF mode = 1 THEN
    output := TRUE;
  END_IF;
END_PROGRAM
`,
};

// Known detector IDs that have docs pages
const DETECTOR_DOC_IDS = new Set([
  'PLCOPEN-CP1', 'PLCOPEN-CP2', 'PLCOPEN-CP3', 'PLCOPEN-CP4',
  'PLCOPEN-CP6', 'PLCOPEN-CP8', 'PLCOPEN-CP9', 'PLCOPEN-CP13',
  'PLCOPEN-CP25', 'PLCOPEN-CP28', 'PLCOPEN-L10', 'PLCOPEN-L17',
  'PLCOPEN-N3',
]);

function detectorDocUrl(id: string): string | null {
  return DETECTOR_DOC_IDS.has(id) ? `/docs/detectors/${id}` : null;
}

export default function Playground(): React.ReactElement {
  const [code, setCode] = useState('');
  const [diagnostics, setDiagnostics] = useState<Diagnostic[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(() => {
    if (typeof document === 'undefined') return false;
    const seen = document.cookie.split('; ').some((c) => c === 'playground_info_seen=1');
    return !seen;
  });
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/version`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setVersionInfo(data))
      .catch(() => {});
  }, []);

  const runCheck = useCallback(async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    setDiagnostics(null);

    try {
      const resp = await fetch(`${API_BASE}/api/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Server returned ${resp.status}: ${text}`);
      }

      const data: Diagnostic[] = await resp.json();
      setDiagnostics(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [code]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Ctrl/Cmd + Enter to run
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCheck();
        return;
      }
      // Tab inserts spaces
      if (e.key === 'Tab') {
        e.preventDefault();
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newValue = code.substring(0, start) + '  ' + code.substring(end);
        setCode(newValue);
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        });
      }
    },
    [code, runCheck],
  );

  const handleExampleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const program = EXAMPLE_PROGRAMS[e.target.value];
      if (program) {
        setCode(program);
        setDiagnostics(null);
        setError(null);
      }
    },
    [],
  );

  return (
    <Layout description="Try iec-checker online" noFooter>
      <Head>
        <title>Try Online — iec-checker</title>
      </Head>

      <div className={styles.playgroundContainer}>
        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <button
              className={styles.runButton}
              onClick={runCheck}
              disabled={loading || !code.trim()}
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
                  Running…
                </>
              ) : (
                <>
                  <i className="fa-solid fa-play" aria-hidden="true" />
                  Run
                </>
              )}
            </button>
            <select
              className={styles.exampleSelect}
              onChange={handleExampleChange}
              defaultValue=""
            >
              <option value="" disabled>
                Load example…
              </option>
              {Object.keys(EXAMPLE_PROGRAMS)
                .filter(Boolean)
                .map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
            </select>
          </div>
          <div className={styles.toolbarRight}>
            {versionInfo && (
              <span className={styles.versionLabel}>
                v{versionInfo.version} (
                <a
                  href={`https://github.com/iec-checker/iec-checker/commit/${versionInfo.commit}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {versionInfo.commit_short}
                </a>
                , {versionInfo.commit_date.split(' ')[0]})
              </span>
            )}
            <kbd>Ctrl</kbd>+<kbd>Enter</kbd> to run
            <div className={styles.infoWrapper}>
              <button
                className={styles.infoButton}
                onClick={() => setShowInfo((v) => !v)}
                aria-label="Info"
              >
                ?
              </button>
              {showInfo && (
                <>
                  <div
                    className={styles.infoBackdrop}
                    onClick={() => {
                      setShowInfo(false);
                      document.cookie = 'playground_info_seen=1; path=/; SameSite=Lax';
                    }}
                  />
                  <div className={styles.infoPopup} onClick={(e) => e.stopPropagation()}>
                    <ul className={styles.infoList}>
                      <li>
                        This is a <strong>demonstration site</strong> for reference
                        only and cannot be used for code verification.
                      </li>
                      <li>
                        <strong>DO NOT</strong> upload safety-critical components!
                        The input code is saved on the server during analysis.
                        The server&apos;s security is not audited and will never be.
                      </li>
                      <li>
                        If you find any issues, please report them at{' '}
                        <a
                          href="https://github.com/iec-checker/iec-checker/issues"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub Issues
                        </a>
                        .
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Split panels */}
        <div className={styles.panels}>
          {/* Editor */}
          <div className={styles.editorPanel}>
            <div className={styles.panelHeader}>Structured Text</div>
            <textarea
              className={styles.editorTextarea}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste your IEC 61131-3 Structured Text program here…"
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>

          {/* Results */}
          <div className={styles.resultsPanel}>
            <div className={styles.panelHeader}>Diagnostics</div>
            <div className={styles.resultsBody}>
              {error && (
                <div className={styles.errorBanner}>
                  {error}
                  <br />
                  If this issue persists, please reach out to{' '}
                  <a href="mailto:jubnzv@gmail.com">jubnzv@gmail.com</a>.
                </div>
              )}

              {!diagnostics && !error && (
                <div className={styles.emptyState}>
                  <div className={styles.emptyStateIcon}>
                    <i className="fa-solid fa-terminal" aria-hidden="true" />
                  </div>
                  <span>Write or paste a program, then hit Run.</span>
                </div>
              )}

              {diagnostics && diagnostics.length === 0 && (
                <div className={styles.successBanner}>
                  <i className="fa-solid fa-circle-check" aria-hidden="true" />
                  No issues found. Your code looks clean.
                </div>
              )}

              {diagnostics && diagnostics.length > 0 && (() => {
                const hasParseErrors = diagnostics.some(
                  (d) => d.id === 'ParserError' || d.id === 'LexingError',
                );
                return (
                  <>
                    <ul className={styles.diagnosticList}>
                      {diagnostics.map((d, i) => {
                        const docUrl = detectorDocUrl(d.id);
                        const isError = d.id === 'ParserError' || d.id === 'LexingError';
                        const msg = d.msg || (isError ? 'Syntax error' : 'Unknown issue');
                        return (
                          <li key={i} className={`${styles.diagnosticItem} ${isError ? styles.diagnosticError : ''}`}>
                            <span className={styles.diagnosticLocation}>
                              {d.linenr}:{d.column}
                            </span>
                            <span className={isError ? styles.diagnosticIdError : styles.diagnosticId}>
                              {docUrl ? (
                                <a
                                  href={docUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.diagnosticIdLink}
                                >
                                  {d.id}
                                </a>
                              ) : (
                                d.id
                              )}
                            </span>
                            <span className={styles.diagnosticMsg}>{msg}</span>
                          </li>
                        );
                      })}
                    </ul>
                    {hasParseErrors && (
                      <a
                        className={styles.reportLink}
                        href={`https://github.com/iec-checker/iec-checker/issues/new?${new URLSearchParams({
                          title: 'Parser error from Try Online',
                          body: `**Input program:**\n\`\`\`iecst\n${code}\n\`\`\`\n\n**Diagnostics:**\n\`\`\`json\n${JSON.stringify(diagnostics.filter((d) => d.id === 'ParserError' || d.id === 'LexingError'), null, 2)}\n\`\`\`\n`,
                        }).toString()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa-solid fa-bug" aria-hidden="true" />{' '}
                        Looks like a bug? Report this issue
                      </a>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
