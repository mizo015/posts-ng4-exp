export const getZipcodeFileName = (zipcode:number) : string => {
	switch (String(zipcode).length) {
		case 3:
			return `00${zipcode}`;
		case 4:
			return `0${zipcode}`;
		default:
			return String(zipcode);
	}
}

export const isValidZipcode = (zipcode): Boolean =>{
	const zipRegex = /\b[0-9]{5}(?:-[0-9]{4})?\b/;
	return zipRegex.test(zipcode);
}