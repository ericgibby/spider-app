import { RootStateOrAny } from 'react-redux';

export function selectMaxIncorrect(state: RootStateOrAny) {
	return state.play.maxIncorrect as number;
}

export function selectText(state: RootStateOrAny) {
	return state.play.text as string;
}

export function selectUsedLetters(state: RootStateOrAny) {
	return state.play.usedLetters as string[];
}
