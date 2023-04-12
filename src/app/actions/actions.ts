import { Device } from "../../misc/stateInterface"
import { CHANGE_NUMBER_OF_DEVICES, FETCH_ERROR, FETCH_DEVICES_REQUEST, FETCH_DEVICES_SUCCESS, UPDATE_SEARCHED_DEVICES, SEARCH, SELECT_DEVICE } from "./actionTypes"

export const changeNumberOfDevices = (num: number) => {
	return {
		type: CHANGE_NUMBER_OF_DEVICES,
		payload: num
	}
}

export const updateSearchedDevices = () => {
	return {
		type: UPDATE_SEARCHED_DEVICES,
	}
}

export const search = (querry: string) => {
	return {
		type: SEARCH,
		payload: querry
	}
}

export const selectDevice = (selectIndex: number, searchIndex: number) => {
	return {
		type: SELECT_DEVICE,
		payload: {
			selectIndex,
			searchIndex
		}
	}
}

export const fetchDevicesRequest = () => {
	return {
		type: FETCH_DEVICES_REQUEST
	}
}

export const fetchDevicesSuccess = (devices: Device[]) => {
	return {
		type: FETCH_DEVICES_SUCCESS,
		payload: devices
	}
}

export const fetchError = (error: string) => {
	return {
		type: FETCH_ERROR,
		payload: error
	}
}