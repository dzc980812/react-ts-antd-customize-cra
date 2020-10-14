export interface propType {
	match: {
		isExact: boolean;
		params: any;
		path: string;
		url: string;
	};
}

export interface propRouterType {
	name: string;
	path: string;
	component?: any;
	children?: any;
}
