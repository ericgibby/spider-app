const API_KEY = process.env.REACT_APP_DICTIONARY_API_KEY;
const BASE_URL = process.env.REACT_APP_DICTIONARY_API_URL;

type DictionaryItem = {
	meta?: { stems: string[] };
};

export async function lookupWord(word: string) {
	const response = await fetch(
		`${BASE_URL}/${encodeURIComponent(word)}?key=${API_KEY}`
	);
	if (!response.ok) {
		throw response;
	}
	const json = await response.json();
	return json as DictionaryItem[];
}
