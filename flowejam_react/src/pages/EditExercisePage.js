import React from 'react';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

function EditExercisePage({exerciseToEdit}) {
	const history = useHistory();

	const [excName, setExcName] = useState(exerciseToEdit.name);
	const [excReps, setExcReps] = useState(exerciseToEdit.reps);
	const [excWeight, setExcWeight] = useState(exerciseToEdit.weight);
	const [excUnit, setExcUnit] = useState(exerciseToEdit.unit);
	const [excDate, setExcDate] = useState(exerciseToEdit.date);
	

	function getOtherUnit(val) {
		if (val === 'lbs') {
			return 'kgs';
		} else {
			return 'lbs';
		}
	}

	const [otherUnit, setOtherUnit] = useState(getOtherUnit(excUnit));

	function formatUnit(val) {
		if (val === 'lbs') { 
			return 'Pounds';
		} else {
			return 'Kilograms';
		}
	}

	const saveEditedExercise = async () => {
		let editedExercise = {name: excName, 
			reps: parseInt(excReps), 
			weight: parseInt(excWeight), 
			unit: excUnit,
			date: excDate};

		editedExercise = JSON.stringify(editedExercise);

		const response = await fetch(`/exercises/${exerciseToEdit._id}`, 
			{method: 'PUT',
				headers: {'Accept': 'application/json',
				'Content-type': 'application/json'
			},
				body: editedExercise
			});
		if (response.status === 200) {
			alert('Changes have been saved');
		} else {
			alert('Error: failed to save changes');
		}
		history.push('/');
	};

	return (
		<>
			<h2>Edit an exercise</h2>

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
				<option value={excUnit} onClick={e => setExcUnit(e.target.value)}>{formatUnit(excUnit)}</option>
				<option value={otherUnit} onClick={e => setExcUnit(e.target.value)}>{formatUnit(otherUnit)}</option>
			</select>

			<label htmlFor='e-date'>Date (MM-DD-YY):</label>
			<input id='e-date' type='text' value={excDate} onChange={e => setExcDate(e.target.value)}/>

			<button onClick={() => saveEditedExercise()}>Save changes</button>
		</>
	);
}

export default EditExercisePage;
