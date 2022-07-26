import React from 'react';
import {TiEdit, TiDelete} from 'react-icons/ti';
import {useState} from 'react'; 

function ExerciseCell({exercise, onDelete, onEdit}) {
	const [visibleStatus, setVisibleStatus] = useState('visible');

	const deleteExtended = () => {
		onDelete(exercise._id);
		setVisibleStatus('not_visible');
	};

return (
	<tr className={visibleStatus}>
		<td>{exercise.name}</td>
		<td>{exercise.reps}</td>
		<td>{exercise.weight}</td>
		<td>{exercise.unit}</td>
		<td>{exercise.date}</td>
		<td><TiEdit className='color-icon' onClick={() => onEdit(exercise)}/></td>
		<td><TiDelete className='color-icon' onClick= {deleteExtended} /></td>
	</tr>
);
}

export default ExerciseCell;
