// const [provinces,setProvinces] = useState([]);
// const [cities,setCities] = useState([]);
// const [districts,setDistricts] = useState([]);

// // Hàm này được gọi khi người dùng chọn một tỉnh thành
// const handleProvinceChange = (event) => {
// 	const provinceCode = event.target.value;
// 	// Lấy danh sách các thành phố của tỉnh được chọn bằng cách gọi API với mã code của tỉnh
// 	axios.get(`https://api.example.com/provinces/${provinceCode}/cities`)
// 		.then((response) => {
// 			const citiesWithNames = response.data.map((city) => {
// 				return {
// 					code: city.code,
// 					name: city.name,
// 				};
// 			});
// 			// Lưu danh sách các thành phố vào state và lưu tên rõ ràng của tỉnh vào trường mới 'provinceName'
// 			setCities(citiesWithNames);
// 			setProvinces((prevProvinces) => {
// 				const updatedProvinces = [...prevProvinces];
// 				const provinceIndex = updatedProvinces.findIndex((province) => province.code === provinceCode);
// 				updatedProvinces[provinceIndex].provinceName = event.target.name;
// 				return updatedProvinces;
// 			});
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 		});
// }

// // Hàm này được gọi khi người dùng chọn một thành phố
// const handleCityChange = (event) => {
// 	const cityCode = event.target.value;
// 	// Lấy danh sách các phường xã của thành phố được chọn bằng cách gọi API với mã code của thành phố
// 	axios.get(`https://api.example.com/cities/${cityCode}/districts`)
// 		.then((response) => {
// 			const districtsWithNames = response.data.map((district) => {
// 				return {
// 					code: district.code,
// 					name: district.name,
// 				};
// 			});
// 			// Lưu danh sách các phường xã vào state và lưu tên rõ ràng của thành phố vào trường mới 'cityName'
// 			setDistricts(districtsWithNames);
// 			setCities((prevCities) => {
// 				const updatedCities = [...prevCities];
// 				const cityIndex = updatedCities.findIndex((city) => city.code === cityCode);
// 				updatedCities[cityIndex].cityName = event.target.name;
// 				return updatedCities;
// 			});
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 		});
// }

// // Hàm này được gọi khi người dùng chọn một phường xã
// const handleDistrictChange = (event) => {
// 	const districtCode = event.target.value;
// 	// Lưu tên rõ ràng của phường xã vào trường mới 'districtName'
// 	setDistricts((prevDistricts) => {
// 		const updatedDistricts = [...prevDistricts];
// 		const districtIndex = updatedDistricts.findIndex((district) => district.code === districtCode);
// 		updatedDistricts[districtIndex].districtName = event.target.name;
// 		return updatedDistricts;
// 	});
// }

// // Trong JSX, bạn có thể sử dụng tên rõ ràng của tỉnh, thành phố và phường xã để hiển thị cho người dùng
// <Select value={selectedProvince} onChange={handleProvinceChange}>
//   {provinces.map((province) => (
//     <MenuItem key={province.code} value={province.code} name={province.name}>
//       {province.name}
//     </MenuItem>
//   ))}
// </Select>

// <Select value={selectedCity} onChange={handleCityChange}>
//   {cities.map((city) => (
//     <MenuItem key={city.code} value={city.code} name={city.name}>
//       {city.name}
//     </MenuItem>
//   ))}
// </Select>

// <Select value={selectedDistrict} onChange={handleDistrictChange}>
//   {districts.map((district) => (
//     <MenuItem key={district.code} value={district.code} name={district.name}>
//       {district.name}
//     </MenuItem>
//   ))}
