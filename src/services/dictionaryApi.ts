import { from, Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

const API_KEY = process.env.REACT_APP_DICTIONARY_API_KEY;
const BASE_URL = process.env.REACT_APP_DICTIONARY_API_URL;

type DictionaryItem = {
	meta?: { stems: string[] };
};

export function lookupWord(word: string) {
	return fromFetch(
		`${BASE_URL}/${encodeURIComponent(word)}?key=${API_KEY}`
	).pipe(
		switchMap(response => {
			if (!response.ok) {
				throw response;
			}
			return from(response.json()) as Observable<DictionaryItem[]>;
		})
	);
}
