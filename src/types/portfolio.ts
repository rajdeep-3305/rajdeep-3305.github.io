export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  category: string;
  gradient: string;
  description: string;
  image?: string;
  secondaryImages?: string[];
  links: string[];
  tags: string[];
  metrics?: { label: string; value: string }[];
}

export interface AxionLayer {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  productContext: string;
  myRole: string;
  myContribution: string;
  tags: string[];
  images: { src: string; caption: string; tag: string }[];
  codeSnippet?: { filename: string; language: string; code: string };
  telemetry: { key: string; val: string }[];
  accentColor: string;
}

export interface HardwareExperiment {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  components: string[];
  processSteps: string[];
  telemetry: { label: string; value: string; unit: string }[];
  gradient: string;
}

export interface ControlSystemModel {
  id: string;
  title: string;
  subtitle: string;
  formula: string;
  description: string;
  parameters: { name: string; value: string; desc: string }[];
  gradient: string;
}

export interface ArsenalCategory {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
  primaryTags: string[];
  expandedTags: string[];
  depth: 'foreground' | 'midground' | 'background';
}

export interface Stat {
  value: string;
  numericValue: number;
  label: string;
  sublabel: string;
}
