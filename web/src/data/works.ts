export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

const PROJECTS: WorkSection[] = [
  {
    id: 'featured',
    no: '01',
    title: 'Featured Projects',
    tagline: 'AI · Marketing Analytics · Product',
    items: [
      { name: 'Google Ads Health Checker', meta: 'AI-powered advertising diagnostics', tags: ['Google Ads API', 'Python', 'Streamlit', 'Groq'], slug: 'google-ads-health-checker' },
      { name: 'AI Makeup Shade Finder', meta: 'AI beauty & color analysis', tags: ['AI', 'Computer Vision', 'Recommendations'], slug: 'ai-makeup-shade-finder' },
    ],
    footer: 'Featured work highlighted on my resume',
  },
  {
    id: 'analytics',
    no: '02',
    title: 'Data & Analytics',
    tagline: 'Power BI · SQL · Marketing Analytics',
    items: [
      { name: 'AI Traffic Analytics Dashboard', meta: 'GA4 + Looker Studio', tags: ['GA4', 'Looker Studio'], slug: 'ai-traffic-dashboard' },
      { name: 'Campaign Analytics & ROI Analysis', meta: 'Marketing analytics', tags: ['SQL', 'MySQL', 'KPIs'], slug: 'campaign-analytics' },
    ],
    footer: 'Dashboards · KPI tracking · marketing performance · reporting',
  },
  {
    id: 'automation',
    no: '03',
    title: 'AI & Automation',
    tagline: 'AI Workflows · APIs · Process Automation',
    items: [
      { name: 'SEO Audit Automation', meta: 'n8n workflow', tags: ['n8n', 'SEO', 'AI'], slug: 'seo-automation' },
      { name: 'Forging Factory Operations App', meta: 'AppSheet + Google Sheets', tags: ['AppSheet', 'Operations'], slug: 'forging-operations' },
      { name: 'Google Ads Audit Workflow', meta: 'API + AI automation', tags: ['Google Ads API', 'Python'], slug: 'ads-workflow' },
    ],
    footer: 'Automation · API integration · operational workflows',
  },
  {
    id: 'creative',
    no: '04',
    title: 'Creative Tech',
    tagline: 'Interactive Web · 3D · Product Experiments',
    items: [
      { name: 'Interactive 3D Portfolio', meta: 'This website', tags: ['React Three Fiber', 'Three.js', 'Vercel'], slug: '3d-portfolio' },
      { name: 'Manifestation Garden', meta: 'Interactive product concept', tags: ['Product', 'AI', 'Animation'], slug: 'manifestation-garden' },
      { name: 'Love Letter Interactive Invitation', meta: 'Web experience', tags: ['React', 'Animation'], slug: 'love-letter' },
    ],
    footer: 'Creative coding · interactive storytelling · rapid prototyping',
  },
]

export const WORKS: Record<'zh' | 'en', WorksLang> = {
  en: {
    title: 'Projects',
    closeLabel: 'Close',
    openLabel: 'Explore project',
    hint: 'Keep scrolling',
    awardsLabel: 'Highlights',
    visitLabel: 'Open project',
    detailPlaceholder: 'Project details coming soon. This project demonstrates applied data, AI and automation work.',
    phImageLabel: 'Project preview',
    phButtonLabel: 'Project link',
    countLabel: (n) => `${n} projects`,
    sections: PROJECTS,
  },
  zh: {
    title: '项目',
    closeLabel: '返回',
    openLabel: '查看项目',
    hint: '继续下滑',
    awardsLabel: '亮点',
    visitLabel: '打开项目',
    detailPlaceholder: '项目详情即将上线。',
    phImageLabel: '项目预览',
    phButtonLabel: '项目链接',
    countLabel: (n) => `${n} 个项目`,
    sections: PROJECTS,
  },
}

export const SECTION_COVERS: Record<string, string> = {
  ai: `${import.meta.env.BASE_URL}works/covers/ai.svg`,
  analytics: `${import.meta.env.BASE_URL}works/covers/analytics.svg`,
  automation: `${import.meta.env.BASE_URL}works/covers/automation.svg`,
  webgl: `${import.meta.env.BASE_URL}works/covers/webgl.svg`,
  ml: `${import.meta.env.BASE_URL}works/covers/ml.svg`,
}

export function sectionCount(section: WorkSection): number {
  if (section.items) return section.items.length
  if (section.groups) return section.groups.reduce((n, g) => n + g.items.length, 0)
  return 0
}
