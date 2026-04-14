import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  sidebar: [
    { type: 'doc', id: 'intro', label: 'Introduction' },
    { type: 'doc', id: 'installation', label: 'Installation' },
    { type: 'doc', id: 'cli', label: 'CLI Reference' },
    { type: 'doc', id: 'configuration', label: 'Configuration' },
    { type: 'doc', id: 'ci-cd', label: 'CI/CD Integration' },
    { type: 'doc', id: 'python', label: 'Python Integration' },
    {
      type: 'html',
      value: '<hr class="sidebars-separator" />',
    },
    {
      type: 'doc',
      id: 'funding',
      label: 'Sponsor Development',
      className: 'sidebar-sponsor',
    },
    {
      type: 'html',
      value: '<hr class="sidebars-separator" /><span class="menu__link"><b> Detectors </b></span>',
    },
    { type: 'doc', id: 'detectors', label: 'Overview' },
    {
      type: 'category',
      label: 'Built-in detectors',
      collapsed: false,
      items: [
        { type: 'doc', id: 'detectors/OutOfBounds', label: 'OutOfBounds' },
        { type: 'doc', id: 'detectors/UnusedVariable', label: 'UnusedVariable' },
      ],
    },
    {
      type: 'category',
      label: 'PLCOpen Guidelines',
      collapsed: false,
      items: [
        { type: 'doc', id: 'detectors/plcopen-overview', label: 'Overview' },
        { type: 'doc', id: 'detectors/PLCOPEN-CP1', label: 'PLCOPEN-CP1' },
        { type: 'doc', id: 'detectors/PLCOPEN-CP2', label: 'PLCOPEN-CP2' },
        { type: 'doc', id: 'detectors/PLCOPEN-CP3', label: 'PLCOPEN-CP3' },
        { type: 'doc', id: 'detectors/PLCOPEN-CP4', label: 'PLCOPEN-CP4' },
        { type: 'doc', id: 'detectors/PLCOPEN-CP6', label: 'PLCOPEN-CP6' },
        { type: 'doc', id: 'detectors/PLCOPEN-CP8', label: 'PLCOPEN-CP8' },
        { type: 'doc', id: 'detectors/PLCOPEN-CP9', label: 'PLCOPEN-CP9' },
        { type: 'doc', id: 'detectors/PLCOPEN-CP13', label: 'PLCOPEN-CP13' },
        { type: 'doc', id: 'detectors/PLCOPEN-CP16', label: 'PLCOPEN-CP16' },
        { type: 'doc', id: 'detectors/PLCOPEN-CP25', label: 'PLCOPEN-CP25' },
        { type: 'doc', id: 'detectors/PLCOPEN-CP26', label: 'PLCOPEN-CP26' },
        { type: 'doc', id: 'detectors/PLCOPEN-CP28', label: 'PLCOPEN-CP28' },
        { type: 'doc', id: 'detectors/PLCOPEN-L10', label: 'PLCOPEN-L10' },
        { type: 'doc', id: 'detectors/PLCOPEN-L13', label: 'PLCOPEN-L13' },
        { type: 'doc', id: 'detectors/PLCOPEN-L17', label: 'PLCOPEN-L17' },
        { type: 'doc', id: 'detectors/PLCOPEN-L22', label: 'PLCOPEN-L22' },
        { type: 'doc', id: 'detectors/PLCOPEN-N1', label: 'PLCOPEN-N1' },
        { type: 'doc', id: 'detectors/PLCOPEN-N2', label: 'PLCOPEN-N2' },
        { type: 'doc', id: 'detectors/PLCOPEN-N3', label: 'PLCOPEN-N3' },
        { type: 'doc', id: 'detectors/PLCOPEN-N4', label: 'PLCOPEN-N4' },
        { type: 'doc', id: 'detectors/PLCOPEN-N5', label: 'PLCOPEN-N5' },
        { type: 'doc', id: 'detectors/PLCOPEN-N6', label: 'PLCOPEN-N6' },
        { type: 'doc', id: 'detectors/PLCOPEN-N8', label: 'PLCOPEN-N8' },
        { type: 'doc', id: 'detectors/PLCOPEN-N9', label: 'PLCOPEN-N9' },
        { type: 'doc', id: 'detectors/PLCOPEN-N10', label: 'PLCOPEN-N10' },
      ],
    },
  ],
};

export default sidebars;
