import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';


function HomePage({setExerciseToEdit}) {
	const [exercises, setExercises] = useState([]);

	const loadExercises = async () => {
		const response = await fetch('/exercises');
		const data = await response.json();
		setExercises(data);
	};

	const onDelete = async (_id) => {
		const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
		if (response.status === 204) {
			const editedExercises = exercises.filter((ex) => ex._id !== _id);
			setExercises(editedExercises)
		} else {
			console.log(`Response status code from REST API was not 204. Status code: ${response.status}`);
		}
	};

	const history = useHistory();

	const onEdit = async (exercise) => {
		setExerciseToEdit(exercise);
		history.push('/edit-exercises');
	};

	useEffect(() => {
		loadExercises();
	}, []);

    return (
        <>
            <h2>List of Exercises</h2>
			<ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit} />
        </>
    );
}

export default HomePage;
