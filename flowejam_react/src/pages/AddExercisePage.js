import React from 'react';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

function AddExercisePage() {
	const history = useHistory();

	const [excName, setExcName] = useState();
	const [excReps, setExcReps] = useState();
	const [excWeight, setExcWeight] = useState();
	const [excUnit, setExcUnit] = useState('lbs');
	const [excDate, setExcDate] = useState();

	const addExercise = async () => {
		let addedExercise = {name: excName, 
			reps: parseInt(excReps), 
			weight: parseInt(excWeight), 
			unit: excUnit,
			date: excDate};

		addedExercise = JSON.stringify(addedExercise);

		const response = await fetch(`/exercises/`, 
			{method: 'POST',
				headers: {'Accept': 'application/json',
				'Content-type': 'application/json'
			},
				body: addedExercise
			});
		if (response.status === 201) {
			alert('Added data has been saved');
		} else {
			alert('Error: failed to save changes');
		}
		history.push('/');
	};

	return (
		<>
			<h2>Add an exercise</h2>

			<label htmlFor='e-name'>Name of exercise:</label>
			<input id='e-name' type='text' value={excName} onChange={e => setExcName(e.target.value)}/>
			<br >
			</br>

			<label htmlFor='e-reps'>Number of repetitions:</label>
			<input id='e-reps' type='number' value={excReps} onChange={e => setExcReps(e.target.value)}/>
			<br >
			</br>

			<label htmlFor='e-weight'>Weight used:</label>
			<input id='e-weight' type='number' value={excWeight} onChange={e => setExcWeight(e.target.value)}/>

			<label htmlFor='e-unit'>Units:</label>
			<select id='e-unit'>
				<option value={'lbs'} onClick={e => setExcUnit(e.target.value)}>Pounds</option>
				<option value={'kgs'} onClick={e => setExcUnit(e.target.value)}>Kilograms</option>
			</select>

			<label htmlFor='e-date'>Date (MM-DD-YY):</label>
			<input id='e-date' type='text' value={excDate} onChange={e => setExcDate(e.target.value)}/>

			<button onClick={() => addExercise()}>Save changes</button>
		</>
	);
}

export default AddExercisePage;
