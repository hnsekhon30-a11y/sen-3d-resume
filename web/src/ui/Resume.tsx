import { motion } from 'framer-motion'
import { FOCUS_POINTS } from '../data/focusPoints'

interface ResumeEntry {
  period: string
  place: string
  role?: string
  points?: string[]
}

const RESUME: Record<'en' | 'zh', { title: string; entries: ResumeEntry[] }> = {
  en: {
    title: 'Résumé',
    entries: [
      {
        period: 'Feb 2025 – Now',
        place: 'Growth Natives · Mohali, India',
        role: 'Data Analyst',
        points: [
          'Design and maintain 15+ Power BI, Tableau, and Looker Studio dashboards.',
          'Analyze multiple marketing channels and track 20+ KPIs for business and campaign performance.',
          'Deliver recurring weekly, monthly, and quarterly reporting to 10+ stakeholders.',
          'Partner with SEO, PPC, and marketing teams on Google Ads and paid advertising analytics.',
          'Develop AI and automation solutions, including a Google Ads Health Checker that automates account diagnostics.',
        ],
      },
      {
        period: 'Jun 2024 – Jan 2025',
        place: 'The Future University · Mohali, India',
        role: 'Entrepreneur in Residence (Business Analyst)',
        points: [
          'Conducted market research and business analysis across 5+ industries.',
          'Defined 10+ KPIs and developed Excel-based reports for leadership teams.',
          'Improved KPI visibility and access to decision-relevant information for 20+ stakeholders.',
        ],
      },
      {
        period: 'Oct 2025 – Now',
        place: 'BITS Pilani',
        role: 'MBA in AI for Business',
      },
      {
        period: '2020 – 2024',
        place: 'Thapar Institute of Engineering and Technology · Patiala, India',
        role: 'Bachelor of Technology (Biotechnology)',
      },
      {
        period: 'Jul 2026',
        place: 'Microsoft',
        role: 'Microsoft Certified: Fabric Analytics Engineer Associate',
        points: [
          'Microsoft Certified: Power BI Data Analyst Associate.',
        ],
      },
    ],
  },
  zh: {
    title: 'Résumé',
    entries: [
      {
        period: '2025 年 2 月 – 至今',
        place: 'Growth Natives · Mohali, India',
        role: 'Data Analyst',
        points: [
          '维护 15+ 个 Power BI、Tableau 和 Looker Studio 仪表板。',
          '分析多个营销渠道并追踪 20+ 个 KPI。',
          '为 10+ 位利益相关者提供周报、月报和季度报告。',
          '与 SEO、PPC 和营销团队合作进行 Google Ads 与付费广告分析。',
          '开发 AI 与自动化解决方案，包括 Google Ads Health Checker。',
        ],
      },
      {
        period: '2024 年 6 月 – 2025 年 1 月',
        place: 'The Future University · Mohali, India',
        role: 'Entrepreneur in Residence (Business Analyst)',
        points: [
          '覆盖 5+ 个行业开展市场研究与商业分析。',
          '定义 10+ 个 KPI 并开发 Excel 报告。',
          '提升 20+ 位利益相关者对关键业务信息的可见性。',
        ],
      },
      {
        period: '2025 年 10 月 – 至今',
        place: 'BITS Pilani',
        role: 'MBA in AI for Business',
      },
      {
        period: '2020 – 2024',
        place: 'Thapar Institute of Engineering and Technology · Patiala, India',
        role: 'Bachelor of Technology (Biotechnology)',
      },
      {
        period: '2026 年 7 月',
        place: 'Microsoft',
        role: 'Microsoft Certified: Fabric Analytics Engineer Associate',
        points: ['Microsoft Certified: Power BI Data Analyst Associate。'],
      },
    ],
  },
}

const POINT_ORDER = FOCUS_POINTS
const EASE = [0.22, 1, 0.36, 1]
const containerV = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } } }
const itemV = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } } }

function Entry({ entry, index }: { entry: ResumeEntry; index: number }) {
  return (
    <motion.div className="tl-entry" data-point={POINT_ORDER[index]} variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-12% 0px -12% 0px' }}>
      <motion.span className="tl-dot" variants={itemV} aria-hidden="true" />
      <div className="tl-body">
        <motion.div className="tl-period" variants={itemV}>{entry.period}</motion.div>
        <motion.div className="tl-head" variants={itemV}><h3 className="tl-place">{entry.place}</h3></motion.div>
        {entry.role && <motion.div className="tl-role" variants={itemV}>{entry.role}</motion.div>}
        {entry.points && <motion.ul className="tl-points" variants={itemV}>{entry.points.map((p, i) => <li key={i}>{p}</li>)}</motion.ul>}
      </div>
    </motion.div>
  )
}

export default function Resume({ lang }: { lang: 'en' | 'zh' }) {
  const data = RESUME[lang]
  return (
    <section className="resume" lang={lang}>
      <motion.h2 className="resume-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.7, ease: EASE }}>
        {data.title}
      </motion.h2>
      <div className="timeline">{data.entries.map((e, i) => <Entry key={i} entry={e} index={i} />)}</div>
    </section>
  )
}
