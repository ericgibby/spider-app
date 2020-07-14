import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextInputForm from '../components/TextInputForm/TextInputForm';
import { setText } from '../redux/modules/play';
import { selectText } from '../redux/selectors/play';

function StartContainer() {
	const dispatch = useDispatch();
	const history = useHistory();

	const text = useSelector(selectText);

	useEffect(() => {
		if (text) {
			history.push('/play');
		}
	}, [history, text]);

	const handleSubmit = (text: string) => {
		dispatch(setText(text));
	};

	return (
		<>
			<p className="mb-2">
				Enter a word or phrase for other players to guess.
			</p>
			<TextInputForm onSubmit={handleSubmit} />
		</>
	);
}

export default StartContainer;
