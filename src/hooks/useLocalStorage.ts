import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useLocalStorage = <T>(
	key: string,
	defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
	const [value, setValue] = useState<T>(() => {
		const jsonValue =
			typeof window !== 'undefined' ? localStorage.getItem(key) : null;

		if (jsonValue != null) return JSON.parse(jsonValue);

		if (typeof defaultValue === 'function') {
			return defaultValue();
		} else {
			return defaultValue;
		}
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};

export default useLocalStorage;
