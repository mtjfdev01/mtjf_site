/** Static CEO complaint portal options (no meta API). */

export const ORGANIZATION_OPTIONS = [
  {
    value: 'mtj_foundation',
    label: { en: 'MTJ Foundation', ur: 'ایم ٹی جے فاؤنڈیشن' },
  },
  { value: 'aslab', label: { en: 'Aas Lab', ur: 'آس لیب' } },
  {
    value: 'education_system',
    label: { en: 'Education System', ur: 'تعلیمی نظام' },
  },
]

export const COMPLAINANT_TYPE_OPTIONS = [
  { value: 'employee', label: { en: 'Employee', ur: 'ملازم' } },
  { value: 'patient', label: { en: 'Patient', ur: 'مریض' } },
  { value: 'visitor', label: { en: 'Visitor', ur: 'زائر' } },
]

export const CATEGORY_OPTIONS = [
  {
    value: 'staff_behavior',
    label: { en: 'Staff behaviour', ur: 'عملے کا رویہ' },
  },
  { value: 'report_delay', label: { en: 'Report delay', ur: 'رپورٹ میں تاخیر' } },
  { value: 'test_quality', label: { en: 'Test quality', ur: 'ٹیسٹ کا معیار' } },
  {
    value: 'wrong_test_billing',
    label: { en: 'Wrong test billing', ur: 'غلط ٹیسٹ بلنگ' },
  },
  { value: 'overcharging', label: { en: 'Overcharging', ur: 'زیادہ چارجنگ' } },
  { value: 'cleanliness', label: { en: 'Cleanliness', ur: 'صفائی' } },
  {
    value: 'system_software',
    label: { en: 'System or software', ur: 'سسٹم یا سافٹ ویئر' },
  },
  { value: 'other', label: { en: 'Other', ur: 'دیگر' } },
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
      'Share your concern with MTJ Foundation. You will receive a complaint number after submission. You may write in English or Urdu.',
    selectOrg: 'Select organization',
    selectBranch: 'Select Aas Lab branch',
    chooseBranch: 'Choose branch',
    complainingAs: 'I am complaining as',
    contactTitle: 'Your contact details',
    contactHint: 'Optional — you may skip this step.',
    name: 'Name',
    namePh: 'Your name',
    contact: 'Contact number',
    contactPh: 'Phone number',
    categoryTitle: 'Complaint regarding',
    selectCategory: 'Select category',
    otherSpecify: 'Please specify',
    otherPh: 'Describe the category',
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
    errOther: 'Please describe the other category.',
    errSubmit: 'Failed to submit complaint',
  },
  ur: {
    eyebrow: 'سی ای او آفس',
    title: 'شکایت پورٹل',
    lead:
      'ایم ٹی جے فاؤنڈیشن کے ساتھ اپنی شکایت شیئر کریں۔ جمع کرانے کے بعد آپ کو شکایت نمبر ملے گا۔ آپ انگریزی یا اردو میں لکھ سکتے ہیں۔',
    selectOrg: 'ادارہ منتخب کریں',
    selectBranch: 'آس لیب برانچ منتخب کریں',
    chooseBranch: 'برانچ منتخب کریں',
    complainingAs: 'میں شکایت کر رہا/رہی ہوں بطور',
    contactTitle: 'آپ کی رابطہ تفصیلات',
    contactHint: 'اختیاری — آپ اس مرحلے کو چھوڑ سکتے ہیں۔',
    name: 'نام',
    namePh: 'آپ کا نام',
    contact: 'رابطہ نمبر',
    contactPh: 'فون نمبر',
    categoryTitle: 'شکایت کس بارے میں ہے',
    selectCategory: 'زمرہ منتخب کریں',
    otherSpecify: 'براہ کرم وضاحت کریں',
    otherPh: 'زمرہ کی وضاحت لکھیں',
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
    errOther: 'براہ کرم دیگر زمرہ کی وضاحت لکھیں۔',
    errSubmit: 'شکایت جمع نہیں ہو سکی',
  },
}

export const optionLabel = (option, lang = 'en') =>
  option?.label?.[lang] || option?.label?.en || ''
