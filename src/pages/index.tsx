import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './index.module.css';

export default function Home(): React.ReactElement {
  return (
    <Layout description="Static analyzer for IEC 61131-3 Structured Text">
      <Head>
        <title>iec-checker — Static analyzer for IEC 61131-3</title>
      </Head>

      <header className={styles.heroBanner}>
        <div className={styles.textContainer}>
          <h1 className={styles.heroTitle}>iec-checker</h1>
          <p className={styles.heroSubtitle}>Static analyzer for IEC 61131-3</p>
          <p className={styles.heroSubtitleSmall}>
            Catch bugs and{' '}
            <a href="https://www.plcopen.org" style={{color: 'inherit', textDecoration: 'underline'}}>
              PLCOpen coding guidelines
            </a>{' '}
            violations in Structured Text before they reach the PLC.
          </p>
          <div className={styles.buttons}>
            <a
              className="button button--primary button--lg"
              href="/docs/installation"
            >
              Get Started
            </a>
            <a
              className="button button--secondary button--lg"
              href="/playground"
            >
              <i className="fa-solid fa-play" aria-hidden="true" />
              {' '}Try Online
            </a>
            <a
              className="button button--secondary button--lg"
              href="https://github.com/iec-checker/iec-checker"
            >
              <i className="fa-brands fa-github" aria-hidden="true" />
              {' '}View on GitHub
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Overview Section */}
        <section
          id="overview"
          className={`${styles.features} ${styles.sectionPadding}`}
        >
          <div className="container">
            <h2 className={styles.featuresTitle}>What is iec-checker?</h2>
            <p className={styles.featuresSummary}>
              iec-checker is an open-source static analyzer for{' '}
              <a href="https://en.wikipedia.org/wiki/IEC_61131-3">
                IEC 61131-3
              </a>{' '}
              programs. It processes input programs, finding possible errors
              and code smells without executing them.
            </p>
            <div className={`${styles.rowWithMargin} row`}>
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>📋 PLCOpen Compliance</h3>
                  <p>
                    13{' '}
                    <a href="/docs/detectors">PLCOpen Guideline checks</a>{' '}
                    covering naming, initialization, complexity, recursion,
                    floating-point comparison and more.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>📥 Multi-format Input</h3>
                  <p>
                    Analyze plain Structured Text, PLCOpen XML exports, or
                    Schweitzer Engineering Laboratories XML — all from the
                    same CLI.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>⚙️ CI-friendly</h3>
                  <p>
                    Machine-readable{' '}
                    <a href="/docs/cli">JSON output</a>, meaningful exit
                    codes, recursive directory scanning. Drop it into{' '}
                    <a href="/docs/ci-cd">GitHub Actions or GitLab CI</a> in
                    minutes.
                  </p>
                </div>
              </div>
            </div>
            <div className={`${styles.rowWithMargin} row`}>
              <div className="col col--6">
                <div className={styles.featureBox}>
                  <h3><i className="fa-brands fa-python" aria-hidden="true" /> Python API</h3>
                  <p>
                    Dump the parsed IR (AST, control-flow graphs, environments)
                    as JSON via{' '}
                    <a href="/docs/cli">--dump</a> and consume it from your own
                    Python plugins.
                  </p>
                </div>
              </div>
              <div className="col col--6">
                <div className={styles.featureBox}>
                  <h3>📜 Open Source</h3>
                  <p>
                    Released under the{' '}
                    <a href="https://www.gnu.org/licenses/lgpl-3.0.html">
                      LGPL-3.0-or-later
                    </a>{' '}
                    license — free to use, audit, modify, and integrate into
                    commercial PLC toolchains. Contributions welcome on{' '}
                    <a href="https://github.com/iec-checker/iec-checker">GitHub</a>.
                  </p>
                </div>
              </div>
            </div>

            <div className={`${styles.buttons} ${styles.centerButton}`}>
              <a
                className="button button--primary button--lg"
                href="/docs/intro"
              >
                Read the Documentation
              </a>
            </div>
          </div>
        </section>

        {/* Discover Detectors Section */}
        <section
          id="discover-detectors"
          className={`${styles.features} ${styles.sectionPadding} ${styles.alternateBackground}`}
        >
          <div className="container">
            <h2 className={styles.featuresTitle}>Discover Detectors</h2>
            <p className={styles.featuresSummary}>
              iec-checker ships with 13 built-in detectors that catch the
              most common classes of mistakes in Structured Text code.
            </p>

            <div className={`${styles.rowWithMargin} row`}>
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>✨ Code Quality</h3>
                  <p>
                    Enforce maintainable code with detectors like{' '}
                    <a href="/docs/detectors/PLCOPEN-CP1">PLCOPEN-CP1</a>{' '}
                    (access by name) and{' '}
                    <a href="/docs/detectors/PLCOPEN-CP3">PLCOPEN-CP3</a>{' '}
                    (initialize before use).
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>🛡️ Safety Issues</h3>
                  <p>
                    Catch the bugs that take production lines down, like{' '}
                    <a href="/docs/detectors/PLCOPEN-CP13">PLCOPEN-CP13</a>{' '}
                    (no direct or indirect recursion).
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.featureBox}>
                  <h3>➗ Numerical Correctness</h3>
                  <p>
                    Avoid silent precision bugs with detectors like{' '}
                    <a href="/docs/detectors/PLCOPEN-CP8">PLCOPEN-CP8</a>{' '}
                    (float equality) and{' '}
                    <a href="/docs/detectors/PLCOPEN-CP25">PLCOPEN-CP25</a>{' '}
                    (explicit conversions).
                  </p>
                </div>
              </div>
            </div>

            <div className={`${styles.buttons} ${styles.centerButton}`}>
              <a
                className="button button--primary button--lg"
                href="/docs/detectors"
              >
                View All Detectors
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
