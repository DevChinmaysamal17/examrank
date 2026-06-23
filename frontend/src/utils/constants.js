export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7000'
export const EXAMS = {
  JEE: {
    key: 'jee',
    name: 'JEE Main',
    shortName: 'JEE Main',
    path: '/jee',
    endpoint: '/predict/jee',
    maxMarks: 300,
    minMarks: -75,
    resultType: 'percentile',
    color: 'blue',
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgClass: 'bg-blue-50 dark:bg-blue-950',
    borderClass: 'border-blue-100 dark:border-blue-900',
    badgeClass: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    description: 'Estimate your percentile from your marks out of 300.',
    fullDescription:
      'JEE Main is conducted by the National Testing Agency (NTA) across multiple sessions. Marks are normalized across sessions and converted to a percentile score. Enter your expected marks to estimate your percentile based on historical cutoff trends.',
    metaTitle: 'JEE Main Marks vs Percentile Estimator 2027 – ExamRank',
    metaDesc:
      'Estimate your JEE Main percentile using historical normalization trends. Free tool for JEE 2027 aspirants.',
    inputLabel: 'Your Marks (out of 300)',
    inputPlaceholder: 'e.g. 145',
    seoKeywords: 'JEE Main percentile calculator, JEE marks vs percentile, JEE Main 2027 cutoff estimator',
  },
  MHTCET: {
    key: 'mhtcet',
    name: 'MHT-CET',
    shortName: 'MHT-CET',
    path: '/mhtcet',
    endpoint: '/predict/mhtcet',
    maxMarks: 200,
    minMarks: 0,
    resultType: 'percentile',
    color: 'violet',
    colorClass: 'text-violet-600 dark:text-violet-400',
    bgClass: 'bg-violet-50 dark:bg-violet-950',
    borderClass: 'border-violet-100 dark:border-violet-900',
    badgeClass: 'bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300',
    description: 'Estimate your percentile from your PCM or PCB marks.',
    fullDescription:
      'MHT-CET is Maharashtra\'s state entrance exam for engineering and pharmacy admissions. Scores are normalized across multiple shifts. Enter your raw marks (out of 200) to estimate your expected percentile based on previous years\' data.',
    metaTitle: 'MHT-CET Marks vs Percentile Estimator 2027 – ExamRank',
    metaDesc:
      'Estimate your MHT-CET percentile from your marks using historical trends. Free tool for Maharashtra engineering aspirants.',
    inputLabel: 'Your Marks (out of 200)',
    inputPlaceholder: 'e.g. 155',
    seoKeywords: 'MHT CET percentile calculator, MHT CET marks vs percentile 2027, Maharashtra CET estimator',
  },
  NEET: {
    key: 'neet',
    name: 'NEET UG',
    shortName: 'NEET',
    path: '/neet',
    endpoint: '/predict/neet',
    maxMarks: 720,
    minMarks: -180,
    resultType: 'rank',
    color: 'emerald',
    colorClass: 'text-emerald-600 dark:text-emerald-400',
    bgClass: 'bg-emerald-50 dark:bg-emerald-950',
    borderClass: 'border-emerald-100 dark:border-emerald-900',
    badgeClass: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300',
    description: 'Estimate your All India Rank from your NEET marks.',
    fullDescription:
      'NEET UG is the national entrance test for MBBS, BDS, and other medical courses in India. Rank is determined by marks out of 720. Enter your expected marks to estimate your All India Rank (AIR) based on historical result patterns.',
    metaTitle: 'NEET Marks vs Rank Estimator 2027 – ExamRank',
    metaDesc:
      'Estimate your NEET UG All India Rank from your marks using historical cutoff trends. Free tool for NEET 2027 aspirants.',
    inputLabel: 'Your Marks (out of 720)',
    inputPlaceholder: 'e.g. 580',
    seoKeywords: 'NEET rank predictor 2027, NEET marks vs rank, NEET UG rank estimator',
  },
  JEEADV: {
    key: 'jeeadv',
    name: 'JEE Advanced',
    shortName: 'JEE Adv',
    path: '/jee-advanced',
    endpoint: '/predict/jeeadv',
    maxMarks: 360,
    minMarks: 0,
    resultType: 'rank',
    color: 'amber',
    colorClass: 'text-amber-600 dark:text-amber-400',
    bgClass: 'bg-amber-50 dark:bg-amber-950',
    borderClass: 'border-amber-100 dark:border-amber-900',
    badgeClass: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300',
    description: 'Estimate your IIT rank from your JEE Advanced marks.',
    fullDescription:
      'JEE Advanced is conducted for admission to IITs. The exam has two papers with varying mark schemes. Enter your total marks (out of 360 combined) to estimate your All India Rank among JEE Advanced qualified candidates.',
    metaTitle: 'JEE Advanced Marks vs Rank Estimator 2027 – ExamRank',
    metaDesc:
      'Estimate your JEE Advanced rank and IIT branch eligibility from your marks using historical data. Free tool for IIT aspirants.',
    inputLabel: 'Your Marks (out of 360)',
    inputPlaceholder: 'e.g. 210',
    seoKeywords: 'JEE Advanced rank predictor, JEE Advanced marks vs rank 2027, IIT rank estimator',
  },
}

export const EXAM_STATS = [
  { label: 'JEE Main 2024 Applicants', value: '12.3L+', sub: 'Registered candidates' },
  { label: 'NEET 2024 Applicants', value: '24L+', sub: 'Registered candidates' },
  { label: 'MHT-CET 2024 Applicants', value: '4.5L+', sub: 'Registered candidates' },
  { label: 'JEE Advanced 2024', value: '1.8L+', sub: 'Qualified candidates' },
]

export const FAQS = [
  {
    q: 'How accurate are these estimates?',
    a: 'Our estimates are based on 3+ years of historical trends from official NTA and state board result data. Accuracy is typically within ±2 percentile for JEE Main/MHT-CET and ±500 ranks for NEET/JEE Advanced. Results are indicative, not guaranteed.',
  },
  {
    q: 'Are these official results?',
    a: 'No. ExamRank is an independent estimation tool and has no affiliation with NTA, IIT, or any exam authority. Always refer to the official websites for actual results.',
  },
  {
    q: 'Does normalization affect the percentile significantly?',
    a: 'Yes, especially for JEE Main and MHT-CET which are conducted in multiple shifts. Our model accounts for expected normalization adjustments based on historical shift difficulty patterns.',
  },
  {
    q: 'Which year\'s data is this based on?',
    a: 'Our models are trained on result data from 2021–2024. The estimates reflect combined historical patterns and are updated after each year\'s results are officially announced.',
  },
  {
    q: 'Can I use this to decide which college to apply to?',
    a: 'You can use it as a rough guide, but always cross-reference with official opening/closing rank data on JoSAA, MHT-CET CAP, or MCC websites before finalizing your college choices.',
  },
  {
    q: 'What does the Confidence label mean?',
    a: '"High" confidence means your marks fall in a well-sampled range with consistent historical data. "Medium" or "Low" confidence typically means fewer data points exist for that score range, usually extreme ends of the distribution.',
  },
]

export const DISCLAIMER =
  'This tool provides estimates based on historical trends and is not an official source. Results may vary due to normalization, difficulty shifts, and changes in exam patterns. Do not make critical academic decisions based solely on these estimates.'

export const SITE_URL = 'https://examrank.in'
