import { AnyAction, Reducer } from "redux"
import { CHANGE_NUMBER_OF_DEVICES, FETCH_ERROR, FETCH_DEVICES_REQUEST, FETCH_DEVICES_SUCCESS, UPDATE_SEARCHED_DEVICES, SEARCH, SELECT_DEVICE } from "../actions/actionTypes";
import { Device, State } from "../../misc/stateInterface";

const initialState: State = {
	devices: [],
	searchedDevices: [],
	selectedDevices: [],
	unselectedDevice: [],
	numberOfDevices: 3,
	isLoading: false,
	error: '',
}

const findNextDevices = (devices: Device[], selectedDevices: Device[], amount: number) => {
	const result = [];
	for (let i = 0; i < amount; i++) {
		for (let device of devices) {
			if (selectedDevices.concat(result).every((selectedDevice) => (
				device.uid !== selectedDevice.uid
			))) {
				result.push(device)
				break;
			}
		}
	}
	return result;
}

const reducer: Reducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case CHANGE_NUMBER_OF_DEVICES:
			const difference = action.payload - state.numberOfDevices;
			if (difference === 0) {
				return state;
			} else if (difference > 0) {
				return {
					...state,
					numberOfDevices: action.payload,
					selectedDevices: state.selectedDevices.concat(findNextDevices(state.devices, state.selectedDevices, difference))
				};
			} else {
				return {
					...state,
					numberOfDevices: action.payload,
					selectedDevices: state.selectedDevices.slice(0, action.payload)
				};
			};
		case UPDATE_SEARCHED_DEVICES:
			const unselectedDevices = findNextDevices(
				state.devices,
				state.selectedDevices,
				state.devices.length - state.selectedDevices.length
			).sort((a, b) => {
				const fullNameA = a.fullName.toUpperCase();
				const fullNameB = b.fullName.toUpperCase();
				if (fullNameA < fullNameB) {
					return -1;
				}
				if (fullNameA > fullNameB) {
					return 1;
				}
				return 0;
			})
			return {
				...state,
				searchedDevices: unselectedDevices,
				unselectedDevices
			};
		case SEARCH: return {
			...state,
			searchedDevices: state.unselectedDevices.filter((device: Device) => {
				const deviceName = device.fullName.toUpperCase().split(' ');
				const querry = action.payload.toUpperCase()
				return deviceName.map(name => (
					name.search(querry) === 0
				)).some(Boolean)
			})

		};
		case SELECT_DEVICE:
			const tempSelectedDevices = [...state.selectedDevices];
			tempSelectedDevices[action.payload.selectIndex] = state.searchedDevices[action.payload.searchIndex]
			return {
				...state,
				selectedDevices: tempSelectedDevices
			}
		case FETCH_DEVICES_REQUEST: return {
			...state,
			isLoading: true
		};
		case FETCH_DEVICES_SUCCESS: return {
			...state,
			isLoading: false,
			devices: action.payload.devices,
			selectedDevices: action.payload.devices.slice(0, 3),
			numberOfDevices: action.payload.devices.length < 3 ? 2 : 3,
		};
		case FETCH_ERROR: return {
			...state,
			isLoading: false,
			error: action.payload
		}
		default: return state
	}
}

export const selectNumberOfDevices = (state: State) => state.numberOfDevices;
export const selectDevices = (state: State) => state.devices;
export const selectSelectedDevices = (state: State) => state.selectedDevices;
export const selectSearchedDevices = (state: State) => state.searchedDevices;
export const selectIsLoading = (state: State) => state.isLoading;
export const selectDeviceListLength = (state: State) => state.devices.length;

export default reducer