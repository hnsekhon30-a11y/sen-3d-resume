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
    id: 'ai',
    no: '01',
    title: 'AI & GenAI',
    tagline: 'Applied AI · Product Thinking',
    items: [
      { name: 'ShadeAI', meta: 'AI beauty assistant', tags: ['Computer Vision', 'Recommendations'], slug: 'shade-ai' },
      { name: 'Predictive Lead Scoring & Enrichment Agent', meta: 'AI workflow', tags: ['LLM', 'Automation'], slug: 'lead-scoring-agent' },
      { name: 'Manifestation Garden', meta: 'Interactive AI product concept', tags: ['Product', 'AI'], slug: 'manifestation-garden' },
    ],
    footer: 'AI product design · prompt engineering · automation · data-driven decision systems',
  },
  {
    id: 'analytics',
    no: '02',
    title: 'Data & Analytics',
    tagline: 'SQL · Power BI · GA4 · Python',
    items: [
      { name: 'Google Ads Keyword Performance Auditor', meta: 'Streamlit application', tags: ['Python', 'Google Ads API', 'Groq'], slug: 'google-ads-auditor' },
      { name: 'AI Traffic Analytics Dashboard', meta: 'GA4 + Looker Studio', tags: ['GA4', 'Looker Studio'], slug: 'ai-traffic-dashboard' },
      { name: 'Campaign Analytics & ROI Analysis', meta: 'SQL analytics', tags: ['MySQL', 'SQL'], slug: 'campaign-analytics' },
    ],
    footer: 'Data modeling · KPI design · dashboarding · campaign analytics · business insights',
  },
  {
    id: 'automation',
    no: '03',
    title: 'Automation',
    tagline: 'n8n · APIs · Operational Workflows',
    items: [
      { name: 'SEO Audit Automation', meta: 'n8n workflow', tags: ['n8n', 'SEO', 'AI'], slug: 'seo-automation' },
      { name: 'Forging Factory Operations App', meta: 'AppSheet + Google Sheets', tags: ['AppSheet', 'Operations'], slug: 'forging-operations' },
      { name: 'Google Ads Audit Workflow', meta: 'API + AI automation', tags: ['Google Ads API', 'Streamlit'], slug: 'ads-workflow' },
    ],
    footer: 'Workflow automation · API integration · operational analytics · process improvement',
  },
  {
    id: 'webgl',
    no: '04',
    title: 'Creative Tech',
    tagline: 'Three.js · WebGL · Interactive Experiences',
    items: [
      { name: 'Interactive 3D Portfolio', meta: 'This website', tags: ['React Three Fiber', 'Three.js', 'Vercel'], slug: '3d-portfolio' },
      { name: 'Love Letter Interactive Invitation', meta: 'Web experience', tags: ['React', 'Animation'], slug: 'love-letter' },
      { name: 'Manifestation Garden Prototype', meta: 'Interactive experience', tags: ['Web', 'Animation'], slug: 'garden-prototype' },
    ],
    footer: 'Creative coding · 3D interfaces · interactive storytelling · rapid prototyping',
  },
  {
    id: 'ml',
    no: '05',
    title: 'Machine Learning',
    tagline: 'Predictive Analytics · Applied ML',
    items: [
      { name: 'Customer Churn Prevention', meta: 'Predictive modeling', tags: ['Python', 'ML'], slug: 'churn-prevention' },
      { name: 'Store Sales Prediction', meta: 'Forecasting', tags: ['Python', 'Machine Learning'], slug: 'store-sales' },
      { name: 'Customer Segmentation', meta: 'Unsupervised learning', tags: ['Python', 'Clustering'], slug: 'segmentation' },
    ],
    footer: 'Feature engineering · predictive modeling · segmentation · business applications',
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
