
import { Dispatch } from "redux";
import { fetchError, fetchDevicesRequest, fetchDevicesSuccess } from "./actions";

const baseUrl = "http://localhost:3030/"

export const fetchDevices = () => async (dispatch: Dispatch) => {
	dispatch(fetchDevicesRequest());
	try {
		fetch(baseUrl + "devices").then(response =>
			response.json().then(result => {
				dispatch(fetchDevicesSuccess(result))
			}));

	} catch (error) {
		if (typeof error === 'string') {
			dispatch(fetchError(error));
		}
	}
}
