/* eslint-disable quotes */
import { getFormattedDate } from 'utils/functions';
import type { DiagnosisDataType } from '../types';

export const historyMock: DiagnosisDataType[] = [
  {
    id: 1,
    title: {
      en: 'Visit to the dentist',
      ar: 'زيارة إلى طبيب الأسنان',
    },
    date: '2022-02-01',
    isActive: false,
    heading: {
      en: 'Cavity filling',
      ar: 'حشو التجويف',
    },
    symptoms: {
      en: ['Colic stomach pain', 'Vomiting'],
      ar: ['آلام في المعدة', 'الإقياء'],
    },
    result: {
      en: 'Your symptoms appear serious a. you may require urgent care. If you cant get to an emergency department.please call an ambulance.',
      ar: 'تظهر أعراضك خطيرة وقد تحتاج إلى رعاية طبية عاجلة. إذا لم تستطع الوصول إلى قسم الطوارئ ، فيرجى الاتصال بسيارة الإسعاف.',
    },
    alarmingSymptoms: {
      en: 'Stomach pain after dropping hard on heels ',
      ar: 'ألم في المعدة بعد السقوط الشديد على الكعبين',
    },
  },
  {
    id: 2,
    title: {
      en: 'Annual Physical Examination',
      ar: 'الفحص السنوي الشامل',
    },
    date: '2021-07-01',
    isActive: true,
    heading: {
      en: 'General checkup',
      ar: 'الفحص العام',
    },
    symptoms: {
      en: ['High blood pressure', 'Mock Pain', 'Haha Pain'],
      ar: ['ارتفاع ضغط الدم', 'آلام في المعدة', 'آلام في الظهر'],
    },
    result: {
      en: 'Your symptoms appear serious a. you may require urgent care. If you cant get to an emergency department.please call an ambulance.',
      ar: 'تظهر أعراضك خطيرة وقد تحتاج إلى رعاية طبية عاجلة. إذا لم تستطع الوصول إلى قسم الطوارئ ، فيرجى الاتصال بسيارة الإسعاف.',
    },
    alarmingSymptoms: {
      en: 'Stomach pain after dropping hard on heels ',
      ar: 'ألم في المعدة بعد السقوط الشديد على الكعبين',
    },
  },
  {
    id: 3,
    title: {
      en: 'Eye check-up',
      ar: 'فحص العين',
    },
    date: '2020-05-12',
    isActive: false,
    heading: {
      en: 'Myopia',
      ar: 'قصر النظر',
    },
    symptoms: {
      en: ['Blurry vision', 'Vomiting', 'Real Pain'],
      ar: ['رؤية غير واضحة', 'الإقياء', 'آلام حقيقية'],
    },
    result: {
      en: 'Prescription for glasses provided',
      ar: 'تم توفير وصفة للنظارات',
    },
    alarmingSymptoms: {
      en: 'Stomach pain after dropping hard on heels ',
      ar: 'ألم في المعدة بعد السقوط الشديد على الكعبين',
    },
  },
  {
    id: 4,
    title: {
      en: 'Physical Therapy Session',
      ar: 'جلسة العلاج الطبيعي',
    },
    date: '2019-03-15',
    isActive: false,
    heading: {
      en: 'Back Pain',
      ar: 'آلام الظهر',
    },
    symptoms: {
      en: ['Lower back pain', 'Difficulty standing up straight'],
      ar: ['آلام أسفل الظهر', 'صعوبة الوقوف بشكل مستقيم'],
    },
    result: {
      en: 'Your back pain may be caused by poor posture or a muscle strain. Your physical therapist will work with you to develop a treatment plan to help alleviate your symptoms and improve your mobility.',
      ar: 'قد يكون ألم ظهرك ناجمًا عن وضعية جلوس سيئة أو تمزق في العضلات. سيعمل العلاج الطبيعي معك على وضع خطة علاجية للمساعدة في تخفيف الأعراض وتحسين قدرتك على الحركة.',
    },
    alarmingSymptoms: {
      en: 'Numbness in legs or difficulty controlling bowel or bladder function',
      ar: 'خدر في الساقين أو صعوبة في التحكم في وظيفة الأمعاء أو المثانة',
    },
  },
];

export const newsMock = [
  {
    title: {
      en: "Qatar's Healthcare Treated 51,809 Patients",
      ar: 'الرعاية الصحية في قطر تعالج 51809 مريضاً',
    },
    image: 'https://i.ibb.co/7kb00Bk/Rectangle-24671.png',
  },

  {
    title: {
      en: 'PHCC : 17 health centers will provide family medicine services during Eid',
      ar: 'مؤسسة الرعاية الصحية الأولية: 17 مركزاً صحياً تقدم خدمات طب الأسرة خلال العيد',
    },
    image: 'https://i.ibb.co/thjQgK6/phcc-1659010023.webp',
  },
  {
    title: {
      en: 'National Health Strategy 2023',
      ar: 'الاستراتيجية الوطنية للصحة 2023',
    },
    image: 'https://i.ibb.co/MV0phRX/Rectangle-24670.png',
  },
];

export const mockEventData = [
  {
    id: 1,
    date: {
      en: getFormattedDate(new Date('2023-06-15')),
      ar: 'الخامس عشر من يونيو 2023',
    },
    time: {
      en: '10AM - 11AM',
      ar: '10 صباحًا - 11 صباحًا',
    },
    location: {
      ar: 'افتراضي',
      en: 'Virtual',
    },
    eventName: {
      ar: 'يوم الكلى العالمي 2023',
      en: 'World Kidney Day 2023',
    },
  },
  {
    id: 2,
    date: {
      en: getFormattedDate(new Date('2023-06-15')),
      ar: 'الخامس عشر من يونيو 2023',
    },
    time: {
      en: '10AM - 11AM',
      ar: '10 صباحًا - 11 صباحًا',
    },
    location: {
      ar: 'مدينة نيويورك',
      en: 'New York City',
    },
    eventName: {
      ar: 'يوم الكلى العالمي 2023',
      en: 'World Kidney Day 2023',
    },
  },
];

export const mockFAQ = [
  {
    id: '001',
    title: {
      en: 'What is a fever?',
      ar: 'ما هي الحمى؟',
    },
    content: {
      en: "A fever is a temporary increase in your body's internal temperature, often due to an illness or infection. In most cases, a fever is a natural response to your body fighting off an infection. A fever can be measured with a thermometer and is considered to be a fever if your body temperature is above 100.4 degrees Fahrenheit or 38 degrees Celsius.",
      ar: 'الحمى هي زيادة مؤقتة في درجة حرارة الجسم الداخلية، غالبًا بسبب مرض أو عدوى. في معظم الحالات، تكون الحمى استجابة طبيعية لجسمك لمكافحة العدوى. يمكن قياس درجة الحرارة باستخدام ميزان حرارة وتعتبر الحمى إذا كانت درجة حرارة جسمك أعلى من 100.4 درجة فهرنهايت أو 38 درجة مئوية.',
    },
  },
  {
    id: '002',
    title: {
      en: 'What are the symptoms of the flu?',
      ar: 'ما هي أعراض الإنفلونزا؟',
    },
    content: {
      en: 'The flu, also known as influenza, is a respiratory illness that is caused by a virus. The symptoms of the flu can include fever, cough, sore throat, runny or stuffy nose, body aches, headache, chills, and fatigue. Some people may also experience vomiting and diarrhea, although these symptoms are more common in children than adults.',
      ar: 'الإنفلونزا، المعروفة أيضًا باسم الأنفلونزا، هي مرض تنفسي يسببه فيروس. قد تشمل أعراض الأنفلونزا الحمى والسعال والتهاب الحلق والإحتقان الأنفي أو الزكام وآلام الجسم والصداع والإرتجاف والتعب. يمكن لبعض الأشخاص أيضًا تجربة القيء والإسهال، على الرغم من أن هذه الأعراض أكثر شيوعًا في الأطفال من البالغين.',
    },
  },
  {
    id: '003',
    title: {
      en: 'What is a migraine?',
      ar: 'ما هي الصداع النصفي؟',
    },
    content: {
      en: 'A migraine is a type of headache that isoften accompanied by other symptoms such as nausea, sensitivity to light and sound, and visual disturbances. Migraines can be very painful and can last for hours or even days. They are often triggered by particular foods, stress, hormonal changes, or changes in sleep patterns. There are several treatments available for migraines, including medications, lifestyle changes, and alternative therapies such as acupuncture.',
      ar: 'الشقيقة هي نوع من الصداع يصاحبها غالبًا أعراض أخرى مثل الغثيان والحساسية للضوء والصوت والاضطرابات البصرية. يمكن أن تكون الشقيقة مؤلمة للغاية وتستمر لساعات أو حتى أيام. غالبًا ما يتم تحفيز الشقيقة بواسطة أطعمة معينة والإجهاد والتغيرات الهرمونية أو التغييرات في أنماط النوم. هناك عدة علاجات متاحة للشقيقة، بما في ذلك الأدوية وتغييرات نمط الحياة والعلاجات البديلة مثل الوخز بالإبر',
    },
  },
  {
    id: '004',
    title: {
      en: 'What is the difference between a cold and the flu?',
      ar: 'ما هو الفرق بين الزكام العادي والإنفلونزا؟',
    },
    content: {
      en: 'The common cold and the flu are both respiratory illnesses caused by viruses, and they can have similar symptoms such as cough, runny or stuffy nose, and sore throat. However, the flu is usually more severe than the common cold and can cause additional symptoms such as fever, headache, body aches, and fatigue. The flu can also lead to complications such as pneumonia, which can be life-threatening.',
      ar: 'الزكام العادي والإنفلونزا هما مرضان تنفسيان يسببهما فيروسات، ويمكن أن يكون لديهما أعراض مشابهة مثل السعال والإحتقان الأنفي والحلق الملتهب. ومع ذلك، فإن الإنفلونزا عادةً ما تكون أكثر حدة من الزكام العادي ويمكن أن تسبب أعراض إضافية مثل الحمى والصداع وآلام الجسم والإرهاق. قد يؤدي الإنفلونزا أيضًا إلى مضاعفات مثل الالتهاب الرئوي الذي يمكن أن يهدد الحياة.',
    },
  },
  {
    id: '005',
    title: {
      en: 'What is a sore throat?',
      ar: 'ما هو الحلق الملتهب؟',
    },
    content: {
      en: 'A sore throat is a common symptom of many respiratory illnesses, including the common cold, the flu, and strep throat. It is characterized by pain or discomfort in the throat that is often worse when swallowing. Other symptoms of asore throat may include swollen glands in the neck, hoarseness, and cough. In most cases, a sore throat will go away on its own within a few days, but if it persists or is accompanied by other symptoms such as fever or difficulty swallowing, it may be a sign of a more serious condition and should be evaluated by a healthcare provider.',
      ar: 'الحلق الملتهب هو أحد الأعراض الشائعة للعديد من الأمراض التنفسية، بما في ذلك الزكام العادي والإنفلونزا والتهاب الحلق الناجم عن البكتيريا Streptococcus. ويتميز بالألم أو الشعور بالتوتر في الحلق والذي غالباً ما يزداد عند البلع. وقد تشمل أعراض الحلق الملتهب الأخرى الغدد اللمفاوية المتورمة في الرقبة والضجيج الصوتي والسعال. في معظم الحالات، سيختفي الحلق الملتهب تلقائياً خلال بضعة أيام، ولكن إذا استمرت الأعراض أو ترافقت مع أعراض أخرى مثل الحمى أو صعوبة في البلع، فقد تكون علامة على حالة أكثر خطورة ويجب تقييمها من قبل مقدم الرعاية الصحية.',
    },
  },
];
