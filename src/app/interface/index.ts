export interface Post {
	id:number,
	title:string,
	body:string,
	userId:number
};

export interface Metric {
	zipcode:number,
	value:number
}

export interface Marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

export interface LatLng {
	lat: number,
	lng: number
}

export interface ZipcodePolygons {
	bounds: Array<LatLng[]>,
	country:string,
	id:string,
	longName:string
	shortName:string
	type:string
}

export interface feature {
	polygon:google.maps.Polygon,
	metric:Metric,
	type:string,
	country?:string,
	id?:string
}