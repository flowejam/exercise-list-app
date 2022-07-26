import React from 'react';
import ExerciseCell from './ExerciseCell'; 

function ExerciseList({exercises, onDelete, onEdit}) {
	return (
		<table id="exercises">
			<thead>
				<tr>
					<th>Name</th>
					<th>Reps</th>
					<th>Weight</th>
					<th>Unit</th>
					<th>Date</th>
					<th>Edit</th>
					<th>Delete</th>
				</tr>
			</thead>

			<tbody>
				{exercises.map((exercise, i) => <ExerciseCell exercise={exercise} onDelete={onDelete} onEdit={onEdit} key={i}/>)}
			</tbody>
		</table>
	);
}

export default ExerciseList;
