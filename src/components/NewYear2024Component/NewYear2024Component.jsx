import { Fireworks } from 'fireworks-js';
import { useEffect } from 'react';

const NewYear2024Component = () => {
	useEffect(() => {
		const container = document.getElementById('fireworks-container');

		const options = {
			maxRockets: 3,
			rocketSpawnInterval: 2000,
			numParticles: 20,
			explosionMinHeight: 0.2,
			explosionMaxHeight: 0.9,
			explosionChance: 0.01
		};

		const fireworks = new Fireworks(container,options);

		// Bắt đầu hiệu ứng sau 10 giây
		const timeoutId = setTimeout(() => {
			fireworks.start();
		},500); // 10 giây

		// Dừng hiệu ứng sau 20 giây (10 giây thời gian chờ và 10 giây thời gian chạy hiệu ứng)
		const stopTimeoutId = setTimeout(() => {
			fireworks.stop();
		},10000); // 20 giây

		// Xóa các timeout khi component unmount
		return () => {
			clearTimeout(timeoutId);
			clearTimeout(stopTimeoutId);
		};
	},[]);

	return <div id="fireworks-container" style={{ position: 'absolute',top: 0,left: 0,width: '100%',height: '100%' }} />;
};

export default NewYear2024Component;
