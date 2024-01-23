// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      Home: 'Home',
      About: 'About',
      Contact: 'Contact',
      English: 'English',
      Arabic: 'Arabic',
      login: 'Login',
      buildingInfo: 'Building Info',
      loginHeader: 'Login',
      loginMethodOne: 'Omani ID / Resident ID',
      loginMethodTwo: 'Mobile ID',
      loginMethodOneDescription: 'To use this login method, you need a civil ID card and ID card reader.',
      loginMethodTwoDescription: 'Enter Your Mobile Number',
      loginButton: 'Login',
      mobileNumberRequired: 'Mobile number is required.',
      buildingInfoHeader: 'Customer House Building Information',
      plotInfoHeader: 'Plot Information',
      plotNumberLabel: 'Plot Number',
      krookieNumberLabel: 'KROOKIE Number',
      plotAddressLabel: 'Plot Address',
      consultantCodeLabel: 'Consultant Code',
      consultantNameLabel: 'Consultant Name',
      constructionDetailsHeader: 'Construction Details',
      advertisementTypeLabel: 'Advertisement Type',
      stagesHeader: 'Stages',
      addStageButton: 'Add',
      buildingsDetailsHeader: 'Buildings Details',
      addBuildingButton: 'Add',
      buildingNumberLabel: 'Building Number',
      totalSizeLabel: 'Total Size',
      numberOfFloorsLabel: 'Number of Floors',
      deleteLabel: 'Delete',
      nextButton: 'Next',
      Required:'Required'
    },
  },
  ar: {
    translation: {
      Home: 'الرئيسية',
      About: 'حول',
      Contact: 'اتصل',
      English: 'الإنجليزية',
      Arabic: 'العربية',
      login: 'تسجيل الدخول',
      buildingInfo: 'معلومات المبنى',
      loginHeader: 'تسجيل الدخول',
      loginMethodOne: 'الهوية العمانية / هوية المقيم',
      loginMethodTwo: 'الهوية المحمولة',
      loginMethodOneDescription: 'لاستخدام هذا الطريقة، تحتاج إلى بطاقة هوية مدنية وقارئ بطاقات الهوية.',
      loginMethodTwoDescription: 'أدخل رقم هاتفك المحمول',
      loginButton: 'تسجيل الدخول',
      mobileNumberRequired: 'الرقم المحمول مطلوب.',
      buildingInfoHeader: 'معلومات بناء العميل',
      plotInfoHeader: 'معلومات القطعة',
      plotNumberLabel: 'رقم القطعة',
      krookieNumberLabel: 'رقم الكروكي',
      plotAddressLabel: 'عنوان القطعة',
      consultantCodeLabel: 'كود الاستشاري',
      consultantNameLabel: 'اسم الاستشاري',
      constructionDetailsHeader: 'تفاصيل البناء',
      advertisementTypeLabel: 'نوع الإعلان',
      stagesHeader: 'المراحل',
      addStageButton: 'إضافة',
      buildingsDetailsHeader: 'تفاصيل المباني',
      addBuildingButton: 'إضافة',
      buildingNumberLabel: 'رقم المبنى',
      totalSizeLabel: 'المساحة الكلية',
      numberOfFloorsLabel: 'عدد الطوابق',
      deleteLabel: 'حذف',
      nextButton: 'التالي',
      Required:'مطلوب'
    },
  },
};


i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
