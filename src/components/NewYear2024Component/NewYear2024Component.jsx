import { Fireworks } from 'fireworks-js';
import { useEffect } from 'react';

const NewYear2024Component = () => {
	useEffect(() => {
		const container = document.getElementById('fireworks-container');

		const options = {
			maxRockets: 3,        // Số lượng pháo bông tối đa
			rocketSpawnInterval: 1500, // Khoảng thời gian giữa việc tạo ra các pháo bông (ms)
			numParticles: 100,    // Số lượng hạt pháo bông
			explosionMinHeight: 0.2,  // Độ cao tối thiểu của pháo bông
			explosionMaxHeight: 0.9,  // Độ cao tối đa của pháo bông
			explosionChance: 0.08,
			traceSpeed: 1

		};

		const fireworks = new Fireworks(container,options);
		fireworks.start();

		return () => fireworks.stop();
	},[]);

	return <div id="fireworks-container" style={{ position: 'absolute',top: 0,left: 0,width: '100%',height: '100vh' }} />;
};

export default NewYear2024Component;
