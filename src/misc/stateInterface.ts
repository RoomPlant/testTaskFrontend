export interface State {
	numberOfDevices: number,
	devices: Device[],
	searchedDevices: Device[],
	unselectedDevice: Device[],
	selectedDevices: Device[],
	isLoading: boolean,
	error: string,
}

export interface Device {
	fullName: string,
	manufacturer: string,
	releasYear: string,
	diagonal: string,
	manufactureCountry: string,
	memory: string,
	screenFrequancy: string,
	nfc: false,
	esim: true,
	wirlessCharge: true,
	cost: string,
	uid: string,
	image: string
}