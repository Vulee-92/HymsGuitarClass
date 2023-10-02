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
	bankOrder: require("../assets/images/bank.png"),
	hymns_1: require("../assets/hymnsAbout/hymns_1.jpg"),
	hymns_2: require("../assets/hymnsAbout/hymns_2.jpg"),
	hymns_3: require("../assets/hymnsAbout/hymns_3.jpg"),
	hymns_4: require("../assets/hymnsAbout/hymns_4.jpg"),
	hymns_5: require("../assets/hymnsAbout/hymns_5.jpg"),
	bgSheet: require("../assets/images/background/sheet.jpg"),
	bgLogin: require("../assets/images/background/bgLogin.jpg"),
	bgSignUp: require("../assets/images/background/bgSignIn.jpg"),
	bgProduct: require("../assets/images/background/bgproduct.jpg"),
	bgHome: require("../assets/images/background/index.jpg"),
	usFlag: require("../assets/images/flag/united-kingdom.png"),
	vnFlag: require("../assets/images/flag/vietnam.png"),
	defaultAvatar: require("../assets/images/defaultAvatar.png"),
	logoUser: require("../assets/images/logo/user.png"),
	class: require("../assets/class.jpg"),
	bgBlog: require("../assets/shape-avatar.svg"),

	// /** ICON */
};

export const Keys = {
	dataToken: "dataToken",
	language: "language",
};
