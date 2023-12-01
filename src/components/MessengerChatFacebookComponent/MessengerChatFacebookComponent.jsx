import React,{ useEffect } from 'react';

const MessengerChatFacebookComponent = () => {
	useEffect(() => {
		// Gọi mã script của Facebook Messenger
		const script = document.createElement('script');
		script.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
		script.async = true;

		// Cấu hình thuộc tính cho customer chat
		const chatbox = document.createElement('div');
		chatbox.id = 'fb-customer-chat';
		chatbox.className = 'fb-customerchat';
		chatbox.setAttribute('page_id','112317098534585');
		chatbox.setAttribute('attribution','biz_inbox');

		// Thêm script và chatbox vào head của trang
		document.head.appendChild(script);
		document.head.appendChild(chatbox);

		// Cleanup khi component unmount
		return () => {
			document.head.removeChild(script);
			document.head.removeChild(chatbox);
		};
	},[]);

	useEffect(() => {
		// Khởi tạo Facebook SDK khi component mount
		window.fbAsyncInit = function () {
			window.FB.init({
				xfbml: true,
				version: 'v17.0',
			});
		};

		// Nạp script SDK vào trang
		(function (d,s,id) {
			var js,fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
			fjs.parentNode.insertBefore(js,fjs);
		}(document,'script','facebook-jssdk'));
	},[]);

	return null; // Facebook Customer Chat sẽ được quản lý bởi SDK và không cần hiển thị gì trong React component
};

export default MessengerChatFacebookComponent;
