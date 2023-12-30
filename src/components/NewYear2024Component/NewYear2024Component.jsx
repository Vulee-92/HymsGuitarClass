// import { Fireworks } from 'fireworks-js';
// import { useEffect,useState } from 'react';

// const NewYear2024Component = () => {
// 	const [fireworks,setFireworks] = useState(null);
// 	const [isFireworksActive,setIsFireworksActive] = useState(false);

// 	useEffect(() => {
// 		const container = document.getElementById('fireworks-container');

// 		const options = {
// 			maxRockets: 3,
// 			rocketSpawnInterval: 1500,
// 			numParticles: 100,
// 			explosionMinHeight: 0.2,
// 			explosionMaxHeight: 0.9,
// 			explosionChance: 0.08,
// 			traceSpeed: 1
// 		};

// 		const fireworksInstance = new Fireworks(container,options);
// 		setFireworks(fireworksInstance);

// 		return () => {
// 			if (fireworksInstance) {
// 				fireworksInstance.stop();
// 			}
// 		};
// 	},[]);

// 	useEffect(() => {
// 		let timer;

// 		if (isFireworksActive) {
// 			fireworks.start();

// 			// Đặt thời gian bắt đầu hiệu ứng pháo hoa
// 			const startTime = Date.now();

// 			// Sử dụng requestAnimationFrame để cập nhật thời gian và kiểm tra khi nào nên kết thúc
// 			const update = () => {
// 				const elapsedTime = Date.now() - startTime;

// 				if (elapsedTime < 10000) { // Kiểm tra nếu đã đạt đến thời gian giới hạn (10 giây)
// 					requestAnimationFrame(update);
// 				} else {
// 					setIsFireworksActive(false); // Dừng hiệu ứng pháo hoa khi hết thời gian
// 					fireworks.stop();
// 				}
// 			};

// 			timer = setTimeout(update,0);
// 		}

// 		return () => clearTimeout(timer);
// 	},[isFireworksActive,fireworks]);

// 	const handleStartFireworks = () => {
// 		setIsFireworksActive(true);
// 	};

// 	return (
// 		<div id="fireworks-container" style={{ position: 'absolute',top: 0,left: 0,width: '100%',height: '100vh' }}>
// 			<button onClick={handleStartFireworks}>Start Fireworks</button>
// 		</div>
// 	);
// };

// export default NewYear2024Component;
