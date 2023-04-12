import React, { MutableRefObject } from "react";

const useOutsideClick = <T extends HTMLElement | null = HTMLElement | null>(
	ref: MutableRefObject<T[]>,
	callback: () => void
) => {

	React.useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (ref.current.every((ref) => !ref?.contains(event.target as Node))) {
				callback();
			}
		};

		document.addEventListener('click', handleClick, true);

		return () => {
			document.removeEventListener('click', handleClick, true);
		};
	}, [ref, callback]);

	return ref;
};

export default useOutsideClick;