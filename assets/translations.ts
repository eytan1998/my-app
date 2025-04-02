import { languages } from "./LanguageConfig";
import { Prisha } from "./Prisha";
import { EventType } from "./Events/Events";

export const Translations = {
  [languages.en]: {
    main: "Main",
    app_name: "Seven Hearts",
    home: "Home",
    profile: "Profile",
    settings: "Settings",
    help: "Help",
    welcome: "Welcome to the app!",
    hebrewDate: "Hebrew Date",

    //zmanim
    sunrise: "Sunrise",
    plag_mincha: "Plag Mincha",
    tzet_kochavim: "Tzet Kochavim",
    sunset: "Sunset",

    daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

    // Event descriptions
    [EventType.FIRST_DAY_OF_VESET_IN_DAY]: "The first day of Veset during the day.",
    [EventType.FIRST_DAY_OF_VESET_IN_NIGHT]: "The first day of Veset during the night.",
    [EventType.STAIN]: "A stain event.",
    [EventType.VESET]: "A Veset event.",
    [EventType.VESET_TO_STAIN]: "Transition from Veset to Stain.",
    [EventType.VESET_TO_CLEAN]: "Transition from Veset to Clean.",
    [EventType.CLEAN]: "A clean event.",
    [EventType.MIKVE]: "Mikve event.",
    [EventType.STAIN_TO_CLEAN]: "Transition from Stain to Clean.",
    
    // Prisha descriptions
    [Prisha.VESET_HACHODESH_BEFORE_SUNRISE]: "Monthly Veset before sunrise.",
    [Prisha.VESET_HACHODESH_DAY]: "Monthly Veset during the day.",
    [Prisha.VESET_HACHODESH_AFTER_SUNSET]: "Monthly Veset after sunset.",
    [Prisha.VESET_HAFLAGA_BEFORE_SUNRISE]: "Interval Veset before sunrise.",
    [Prisha.VESET_HAFLAGA_DAY]: "Interval Veset during the day.",
    [Prisha.VESET_HAFLAGA_AFTER_SUNSET]: "Interval Veset after sunset.",
    [Prisha.ONAA_BENONIT_BEFORE_SUNRISE]: "Intermediate Veset before sunrise.",
    [Prisha.ONAA_BENONIT_DAY]: "Intermediate Veset during the day.",
    [Prisha.ONAA_BENONIT_AFTER_SUNSET]: "Intermediate Veset after sunset.",
    [Prisha.OT_ZARIHA_VESET_HACHODESH_BEFORE_SUNRISE]: "Special Monthly Veset before sunrise.",
    [Prisha.OT_ZARIHA_VESET_HACHODESH_DAY]: "Special Monthly Veset during the day.",
    [Prisha.OT_ZARIHA_VESET_HACHODESH_AFTER_SUNSET]: "Special Monthly Veset after sunset.",
    [Prisha.OT_ZARIHA_VESET_HAFLAGA_BEFORE_SUNRISE]: "Special Interval Veset before sunrise.",
    [Prisha.OT_ZARIHA_VESET_HAFLAGA_DAY]: "Special Interval Veset during the day.",
    [Prisha.OT_ZARIHA_VESET_HAFLAGA_AFTER_SUNSET]: "Special Interval Veset after sunset.",
    [Prisha.OT_ZARIHA_ONAA_BENONIT_BEFORE_SUNRISE]: "Special Intermediate Veset before sunrise.",
    [Prisha.OT_ZARIHA_ONAA_BENONIT_DAY]: "Special Intermediate Veset during the day.",
    [Prisha.OT_ZARIHA_ONAA_BENONIT_AFTER_SUNSET]: "Special Intermediate Veset after sunset.",
 },
  [languages.he]: {
    app_name: "שבע לב",
    main: "ראשי",
    home: "בית",
    profile: "פרופיל",
    settings: "הגדרות",
    help: "עזרה",
    welcome: "ברוכים הבאים לאפליקציה!",
    hebrewDate: "תאריך עברי",

    //zmain
    sunrise: "זריחה",
    plag_mincha: "פלג מנחה",
    tzet_kochavim: "צאת הכוכבים",
    sunset: "שקיעה",

    daysOfWeek: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],

    // Event descriptions
    [EventType.FIRST_DAY_OF_VESET_IN_DAY]: "היום הראשון של וסת במהלך היום.",
    [EventType.FIRST_DAY_OF_VESET_IN_NIGHT]: "היום הראשון של וסת במהלך הלילה.",
    [EventType.STAIN]: "אירוע כתם.",
    [EventType.VESET]: "אירוע וסת.",
    [EventType.VESET_TO_STAIN]: "מעבר מווסת לכתם.",
    [EventType.VESET_TO_CLEAN]: "מעבר מווסת לנקי.",
    [EventType.CLEAN]: "שבעה נקיים.",
    [EventType.MIKVE]: "אירוע מקווה.",
    [EventType.STAIN_TO_CLEAN]: "מעבר מכתם לשבעה נקיים.",

    // Prisha descriptions
    [Prisha.VESET_HACHODESH_BEFORE_SUNRISE]: "וסת החודש לפני הזריחה.",
    [Prisha.VESET_HACHODESH_DAY]: "וסת החודש במהלך היום.",
    [Prisha.VESET_HACHODESH_AFTER_SUNSET]: "וסת החודש אחרי השקיעה.",
    [Prisha.VESET_HAFLAGA_BEFORE_SUNRISE]: "וסת ההפלגה לפני הזריחה.",
    [Prisha.VESET_HAFLAGA_DAY]: "וסת ההפלגה במהלך היום.",
    [Prisha.VESET_HAFLAGA_AFTER_SUNSET]: "וסת ההפלגה אחרי השקיעה.",
    [Prisha.ONAA_BENONIT_BEFORE_SUNRISE]: "וסת בינונית לפני הזריחה.",
    [Prisha.ONAA_BENONIT_DAY]: "וסת בינונית במהלך היום.",
    [Prisha.ONAA_BENONIT_AFTER_SUNSET]: "וסת בינונית אחרי השקיעה.",
    [Prisha.OT_ZARIHA_VESET_HACHODESH_BEFORE_SUNRISE]: "וסת מיוחד של החודש לפני הזריחה.",
    [Prisha.OT_ZARIHA_VESET_HACHODESH_DAY]: "וסת מיוחד של החודש במהלך היום.",
    [Prisha.OT_ZARIHA_VESET_HACHODESH_AFTER_SUNSET]: "וסת מיוחד של החודש אחרי השקיעה.",
    [Prisha.OT_ZARIHA_VESET_HAFLAGA_BEFORE_SUNRISE]: "וסת מיוחד של ההפלגה לפני הזריחה.",
    [Prisha.OT_ZARIHA_VESET_HAFLAGA_DAY]: "וסת מיוחד של ההפלגה במהלך היום.",
    [Prisha.OT_ZARIHA_VESET_HAFLAGA_AFTER_SUNSET]: "וסת מיוחד של ההפלגה אחרי השקיעה.",
    [Prisha.OT_ZARIHA_ONAA_BENONIT_BEFORE_SUNRISE]: "וסת מיוחד בינונית לפני הזריחה.",
    [Prisha.OT_ZARIHA_ONAA_BENONIT_DAY]: "וסת מיוחד בינונית במהלך היום.",
    [Prisha.OT_ZARIHA_ONAA_BENONIT_AFTER_SUNSET]: "וסת מיוחד בינונית אחרי השקיעה.",
 
  },
  // [languages.fr]: {
  //   app_name: "Sept Coeurs",
  //   home: "Accueil",
  //   profile: "Profil",
  //   settings: "Paramètres",
  //   help: "Aide",
  //   welcome: "Bienvenue dans l'application !",
  //   hebrewDate: "Date Hébraïque",
  //   sunrise: "Lever du soleil",
  //   sunset: "Coucher du soleil",
  // },
  // [languages.es]: {
  //   app_name: "Siete Corazones",
  //   home: "Inicio",
  //   profile: "Perfil",
  //   settings: "Configuraciones",
  //   help: "Ayuda",
  //   welcome: "¡Bienvenido a la aplicación!",
  //   hebrewDate: "Fecha Hebrea",
  //   sunrise: "Amanecer",
  //   sunset: "Atardecer",
  //   },
  //   [languages.ar]: {
  //     app_name: "سبعة قلوب",
  //     home: "الصفحة الرئيسية",
  //     profile: "الملف الشخصي",
  //     settings: "الإعدادات",
  //     help: "مساعدة",
  //     welcome: "مرحبًا بك في التطبيق!",
  //     hebrewDate: "التاريخ العبري",
  //     sunrise: "شروق الشمس",
  //     sunset: "غروب الشمس",
  //   }
};