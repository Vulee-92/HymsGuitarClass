/** LIBRARY */

/**
 * Validate email
 */
const validateEmail = email => {
	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return reg.test(email);
};

/**
 ** Save data to local storage
 **/
const setDataStorage = (key,data) => {
	try {
		localStorage.setItem(key,data === '' ? data : JSON.stringify(data))
	} catch (e) {
		console.log('Error: ',e);
		return null;
	}
};

/**
 ** Get data from local storage
 **/
const getDataStorage = key => {
	try {
		let res = localStorage.getItem(key);
		if (res) {
			if (res === '') return null;
			res = JSON.parse(res);
			return res;
		} else {
			return null;
		}
	} catch (e) {
		console.log('Error: ',e);
		return null;
	}
}

/**
 ** Open new tab
 **/

const openNewTab = (url) => {
	var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	if (isSafari) {
		let a = document.createElement("a");
		document.body.appendChild(a);
		a.style = "display: none";
		a.target = "_blank"
		a.href = url;
		a.click();
		document.body.removeChild(a);
	} else {
		window.open(url,'_blank')
	}
}

export const Helpers = {
	validateEmail,
	setDataStorage,
	getDataStorage,
	openNewTab
}