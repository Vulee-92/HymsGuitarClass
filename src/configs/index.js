export const Configs = {
  // baseUrl: 'https://smart-v2.schoolcento.com/portal',
  meetingPath: "/meeting/join",
  isProduction: false,
  pH: 16,
  br: 16,
  dateTimeFormat: "HH:mm DD/MM/YYYY",
  dateFormat: "DD/MM/YYYY",
  pageSize: 25,
  language: {
    vi: "vi",
    en: "en",
  },
  role: {
    teacher: "TEACHER",
    student: "STUDENT",
    admin: "ADMIN",
    ta: "TA",
  },
  client: {
    clientId: "sen",
    clientSecret: "Admin@123",
    defaultToken: "mir6Ddko7ghHniFGFaHnhJ4n5yA",
  },
  meetingStatus: {
    inProgress: "IN_PROGRESS",
    ended: "ENDED",
  },
  sidebarWidth: {
    full: 320,
    semi: 100,
    off: 0,
  },
};

export const Assets = {
  /** IMAGE */
  logo: require("../assets/images/logo/Hymnslogo.png"),
  bankOrder: require("../assets/images/bank.png"),
  bgClass: require("../assets/images/background/class.jpg"),
  bgBanner: require("../assets/images/background/banner.jpg"),
  bgLogin: require("../assets/images/background/bgLogin.jpg"),
  bgSignUp: require("../assets/images/background/bgSignIn.jpg"),
  bgHome: require("../assets/images/background/index.jpg"),
  bgJoinClass: require("../assets/images/background/bgJoinClass.png"),
  logoGoogle: require("../assets/images/logo/logoGoogle.png"),
  usFlag: require("../assets/images/flag/usFlag.png"),
  vnFlag: require("../assets/images/flag/vnFlag.png"),
  defaultAvatar: require("../assets/images/defaultAvatar.png"),
  logoApollo: require("../assets/images/logo/logoApollo.png"),
  logoUser: require("../assets/images/logo/user.png"),

  iconDefaultAvatar: require("../assets/images/icon/iconDefaultAvatar.png"),
  // /** ICON */
  raiseHand: require("../assets/images/icon/raiseHand.png"),
  mic: require("../assets/images/icon/mic.png"),
  star: require("../assets/images/icon/star.png"),
  cameraOn: require("../assets/images/icon/cameraOn.png"),
  timeOnline: require("../assets/images/icon/timeOnline.png"),
};

export const Keys = {
  dataToken: "dataToken",
  language: "language",
};
