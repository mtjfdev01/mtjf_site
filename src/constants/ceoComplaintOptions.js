/** Static CEO complaint portal options (no meta API). */

/** First-step choice — Complaint (default) vs Issue. */
export const ENTRY_KIND_OPTIONS = [
  {
    value: 'complaint',
    label: { en: 'Complaint', ur: 'شکایت' },
  },
  {
    value: 'issue',
    label: { en: 'Issue', ur: 'مسئلہ' },
  },
]

export const ORGANIZATION_OPTIONS = [
  {
    value: 'mtj_foundation',
    label: { en: 'MTJ Foundation', ur: 'ایم ٹی جے فاؤنڈیشن' },
  },
  { value: 'aslab', label: { en: 'Aas Lab', ur: 'آس لیب' } },
  {
    value: 'education_system',
    label: {
      en: 'Al Hasanain College',
      ur: 'الحسنین کالج',
    },
  },
]

export const COMPLAINANT_TYPE_OPTIONS = [
  { value: 'employee', label: { en: 'Employee', ur: 'ملازم' } },
  { value: 'visitor', label: { en: 'Visitor', ur: 'وزیٹر' } },
]

export const DEPARTMENT_OPTIONS = [
  {
    value: 'hr',
    label: { en: 'Human Resources (HR)', ur: 'انسانی وسائل (HR)' },
  },
  {
    value: 'finance_accounts',
    label: { en: 'Finance / Accounts', ur: 'فنانس / اکاؤنٹس' },
  },
  { value: 'it', label: { en: 'IT', ur: 'آئی ٹی' } },
  { value: 'admin', label: { en: 'Admin', ur: 'انتظامیہ (Admin)' } },
  { value: 'operations', label: { en: 'Operations', ur: 'آپریشنز' } },
  { value: 'marketing', label: { en: 'Marketing', ur: 'مارکیٹنگ' } },
  {
    value: 'procurement',
    label: { en: 'Procurement / Purchasing', ur: 'پروکیورمنٹ / خریداری' },
  },
  {
    value: 'legal_compliance',
    label: { en: 'Legal / Compliance', ur: 'قانونی / تعمیل' },
  },
  {
    value: 'internal_audit',
    label: { en: 'Internal Audit', ur: 'اندرونی آڈٹ' },
  },
  { value: 'audio_video', label: { en: 'Audio Video', ur: 'آڈیو وڈیو' } },
  {
    value: 'customer_service',
    label: { en: 'Customer Service', ur: 'کسٹمر سروس' },
  },
  { value: 'other', label: { en: 'Other', ur: 'دیگر' } },
  { value: 'unknown', label: { en: 'Unknown', ur: 'معلوم نہیں' } },
]

export const PRIORITY_OPTIONS = [
  {
    value: 'critical_high',
    label: { en: 'Critical / High', ur: 'نہایت اہم / اعلیٰ' },
  },
  { value: 'critical', label: { en: 'Critical', ur: 'نہایت اہم' } },
  { value: 'high', label: { en: 'High', ur: 'اعلیٰ' } },
  {
    value: 'medium_high',
    label: { en: 'Medium / High', ur: 'درمیانہ / اعلیٰ' },
  },
  { value: 'medium', label: { en: 'Medium', ur: 'درمیانہ' } },
  {
    value: 'high_critical',
    label: { en: 'High / Critical', ur: 'اعلیٰ / نہایت اہم' },
  },
  {
    value: 'low_medium',
    label: { en: 'Low / Medium', ur: 'کم / درمیانہ' },
  },
]

/** Complaint type (کمپلینٹ ٹائپ) with mapped ترجیح (Priority). */
export const CATEGORY_OPTIONS = [
  {
    value: 'harassment_discrimination',
    label: {
      en: 'Harassment and Discrimination',
      ur: 'ہراسانی اور امتیازی سلوک',
    },
    priority: 'critical_high',
  },
  {
    value: 'ethics_fraud_corruption',
    label: {
      en: 'Ethics, Fraud and Corruption Reporting',
      ur: 'اخلاقیات، فراڈ اور بدعنوانی کی اطلاع دینا',
    },
    priority: 'critical',
  },
  {
    value: 'abuse_of_authority',
    label: {
      en: 'Abuse of Authority / Leadership Misconduct',
      ur: 'اختیارات کا غلط استعمال / قیادت کی بدسلوکی',
    },
    priority: 'high',
  },
  {
    value: 'unfair_employment',
    label: {
      en: 'Unfair Employment Practices',
      ur: 'غیر منصفانہ ملازمت کے طریقے',
    },
    priority: 'medium_high',
  },
  {
    value: 'compensation_benefits_payroll',
    label: {
      en: 'Compensation, Benefits and Payroll',
      ur: 'معاوضہ، مراعات اور پے رول',
    },
    priority: 'medium',
  },
  {
    value: 'workplace_safety_health',
    label: {
      en: 'Workplace Safety, Health and Environment',
      ur: 'کام کی جگہ کی حفاظت، صحت اور ماحول',
    },
    priority: 'high_critical',
  },
  {
    value: 'working_conditions_facilities',
    label: {
      en: 'Working Conditions and Facilities',
      ur: 'کام کے حالات اور سہولیات',
    },
    priority: 'low_medium',
  },
  {
    value: 'policy_compliance',
    label: {
      en: 'Policy and Compliance Violations',
      ur: 'پالیسی اور تعمیل کی خلاف ورزیاں',
    },
    priority: 'high',
  },
  {
    value: 'it_data_cybersecurity',
    label: {
      en: 'IT, Data and Cyber Security',
      ur: 'آئی ٹی، ڈیٹا اور سائبر سیکیورٹی',
    },
    priority: 'high_critical',
  },
  {
    value: 'retaliation_victimization',
    label: {
      en: 'Retaliation and Victimization',
      ur: 'انتقامی کارروائی اور شکار بنانا',
    },
    priority: 'critical_high',
  },
  {
    value: 'employee_relations',
    label: {
      en: 'Interpersonal / Employee Relations',
      ur: 'باہمی تعلقات / ملازمین کے تعلقات',
    },
    priority: 'low_medium',
  },
  {
    value: 'other_general',
    label: { en: 'Other / General', ur: 'دیگر / عمومی' },
    priority: 'medium',
  },
]

export const ASLAB_BRANCH_OPTIONS = [
  { value: 'lahore', label: { en: 'Lahore', ur: 'لاہور' } },
  { value: 'multan', label: { en: 'Multan', ur: 'ملتان' } },
  { value: 'bahawalpur', label: { en: 'Bahawalpur', ur: 'بہاولپور' } },
  {
    value: 'rahim_yar_khan',
    label: { en: 'Rahim Yar Khan', ur: 'رحیم یار خان' },
  },
  { value: 'sahiwal', label: { en: 'Sahiwal', ur: 'ساہیوال' } },
  { value: 'faisalabad', label: { en: 'Faisalabad', ur: 'فیصل آباد' } },
  { value: 'sargodha', label: { en: 'Sargodha', ur: 'سرگودھا' } },
  { value: 'gujranwala', label: { en: 'Gujranwala', ur: 'گوجرانوالہ' } },
  { value: 'sialkot', label: { en: 'Sialkot', ur: 'سیالکوٹ' } },
  { value: 'rawalpindi', label: { en: 'Rawalpindi', ur: 'راولپنڈی' } },
  { value: 'islamabad', label: { en: 'Islamabad', ur: 'اسلام آباد' } },
  { value: 'other', label: { en: 'Other', ur: 'دیگر' } },
]

export const UI_COPY = {
  en: {
    eyebrow: 'CEO Office',
    title: 'Complaint Portal',
    lead:
      'Share your concern with MTJ Foundation. You will receive a complaint number after submission. You may write in English or Urdu. Your identity will be kept secret.',
    selectEntryKind: 'What would you like to submit?',
    selectOrg: 'Select organization',
    selectBranch: 'Select Aas Lab branch',
    chooseBranch: 'Choose branch',
    complainingAs: 'I am complaining as',
    contactTitle: 'Your contact details',
    contactHint: 'Name and an 11-digit contact number are required.',
    name: 'Name *',
    namePh: 'Your name',
    contact: 'Contact number *',
    contactPh: '11-digit phone number',
    errContact: 'Please enter your name and contact number.',
    errPhone: 'Please enter a valid 11-digit phone number.',
    selectDepartment: 'Select department',
    errDepartment: 'Please select a department.',
    categoryTitle: 'Complaint type',
    selectCategory: 'Select complaint type',
    priorityLabel: 'Priority (Tarjih)',
    errCategory: 'Please select a complaint type.',
    detailsTitle: 'Complaint details',
    detailsLabel: 'Describe your complaint',
    detailsPh: 'Please share what happened (English or Urdu)',
    back: 'Back',
    continue: 'Continue',
    skip: 'Skip',
    submit: 'Submit complaint',
    submitting: 'Submitting...',
    successTitle: 'Complaint submitted',
    successHint: 'Please save your complaint number for future reference.',
    submitAnother: 'Submit another',
    backHome: 'Back to home',
    errDetails: 'Please enter at least a short complaint description.',
    errSubmit: 'Failed to submit complaint',
  },
  ur: {
    eyebrow: 'سی ای او آفس',
    title: 'شکایت پورٹل',
    lead:
      'ایم ٹی جے فاؤنڈیشن کے ساتھ اپنی شکایت شیئر کریں۔ جمع کرانے کے بعد آپ کو شکایت نمبر ملے گا۔ آپ انگریزی یا اردو میں لکھ سکتے ہیں۔ آپ کی شناخت خفیہ رکھی جائے گی۔',
    selectEntryKind: 'آپ کیا جمع کرانا چاہتے ہیں؟',
    selectOrg: 'ادارہ منتخب کریں',
    selectBranch: 'آس لیب برانچ منتخب کریں',
    chooseBranch: 'برانچ منتخب کریں',
    complainingAs: 'میں شکایت کر رہا/رہی ہوں بطور',
    contactTitle: 'آپ کی رابطہ تفصیلات',
    contactHint: 'نام اور گیارہ ہندسوں کا رابطہ نمبر لازمی ہیں۔',
    name: 'نام *',
    namePh: 'آپ کا نام',
    contact: 'رابطہ نمبر *',
    contactPh: '۱۱ ہندسوں کا فون نمبر',
    errContact: 'براہ کرم اپنا نام اور رابطہ نمبر درج کریں۔',
    errPhone: 'براہ کرم درست گیارہ ہندسوں کا فون نمبر درج کریں۔',
    selectDepartment: 'محکمہ منتخب کریں',
    errDepartment: 'براہ کرم محکمہ منتخب کریں۔',
    categoryTitle: 'کمپلینٹ ٹائپ',
    selectCategory: 'کمپلینٹ ٹائپ منتخب کریں',
    priorityLabel: 'ترجیح (Priority)',
    errCategory: 'براہ کرم کمپلینٹ ٹائپ منتخب کریں۔',
    detailsTitle: 'شکایت کی تفصیل',
    detailsLabel: 'اپنی شکایت بیان کریں',
    detailsPh: 'کیا ہوا بیان کریں (انگریزی یا اردو)',
    back: 'واپس',
    continue: 'آگے بڑھیں',
    skip: 'چھوڑیں',
    submit: 'شکایت جمع کرائیں',
    submitting: 'جمع ہو رہی ہے...',
    successTitle: 'شکایت جمع ہو گئی',
    successHint: 'براہ کرم مستقبل کے حوالے کے لیے اپنا شکایت نمبر محفوظ رکھیں۔',
    submitAnother: 'ایک اور جمع کرائیں',
    backHome: 'ہوم پیج',
    errDetails: 'براہ کرم شکایت کی مختصر تفصیل لکھیں۔',
    errSubmit: 'شکایت جمع نہیں ہو سکی',
  },
}

/** Issue-mode copy overrides (titles / labels only). Complaint copy stays default. */
export const ISSUE_UI_COPY = {
  en: {
    title: 'Issue Portal',
    lead:
      'Share your issue with MTJ Foundation. You will receive a reference number after submission. You may write in English or Urdu. Your identity will be kept secret.',
    complainingAs: 'I am reporting as',
    detailsTitle: 'Issue details',
    detailsLabel: 'Describe your issue',
    detailsPh: 'Please share what the issue is (English or Urdu)',
    submit: 'Submit issue',
    successTitle: 'Issue submitted',
    successHint: 'Please save your issue number for future reference.',
    submitAnother: 'Submit another',
    errDetails: 'Please enter at least a short issue description.',
    errSubmit: 'Failed to submit issue',
  },
  ur: {
    title: 'مسئلہ پورٹل',
    lead:
      'ایم ٹی جے فاؤنڈیشن کے ساتھ اپنا مسئلہ شیئر کریں۔ جمع کرانے کے بعد آپ کو حوالہ نمبر ملے گا۔ آپ انگریزی یا اردو میں لکھ سکتے ہیں۔ آپ کی شناخت خفیہ رکھی جائے گی۔',
    complainingAs: 'میں اطلاع دے رہا/رہی ہوں بطور',
    detailsTitle: 'مسئلہ کی تفصیل',
    detailsLabel: 'اپنا مسئلہ بیان کریں',
    detailsPh: 'مسئلہ بیان کریں (انگریزی یا اردو)',
    submit: 'مسئلہ جمع کرائیں',
    successTitle: 'مسئلہ جمع ہو گیا',
    successHint: 'براہ کرم مستقبل کے حوالے کے لیے اپنا مسئلہ نمبر محفوظ رکھیں۔',
    submitAnother: 'ایک اور جمع کرائیں',
    errDetails: 'براہ کرم مسئلہ کی مختصر تفصیل لکھیں۔',
    errSubmit: 'مسئلہ جمع نہیں ہو سکا',
  },
}

export const resolveUiCopy = (lang = 'en', entryKind = 'complaint') => {
  const base = UI_COPY[lang] || UI_COPY.en
  if (entryKind !== 'issue') return base
  const overrides = ISSUE_UI_COPY[lang] || ISSUE_UI_COPY.en
  return { ...base, ...overrides }
}

export const optionLabel = (option, lang = 'en') =>
  option?.label?.[lang] || option?.label?.en || ''

export const priorityForCategory = (categoryValue) => {
  const hit = CATEGORY_OPTIONS.find((c) => c.value === categoryValue)
  return hit?.priority || ''
}

export const priorityLabel = (priorityValue, lang = 'en') => {
  const hit = PRIORITY_OPTIONS.find((p) => p.value === priorityValue)
  return hit ? optionLabel(hit, lang) : priorityValue || '-'
}
