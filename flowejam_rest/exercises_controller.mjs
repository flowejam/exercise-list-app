import 'dotenv/config'; 
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

function getExerciseFromBody(req) {
	const exercise = {name: req.body.name, 
		reps: req.body.reps, 
		weight: req.body.weight, 
		unit: req.body.unit, 
		date: req.body.date};
	return exercise;
}

app.post('/exercises', asyncHandler(async (req, res) => {
	const exercise = getExerciseFromBody(req);

	if (exercises.isExerciseValid(exercise)) {
		const exerciseToSave = await exercises.createExercise(req.body.name, 
			req.body.reps, 
			req.body.weight, 
			req.body.unit, 
			req.body.date);

		res.status(201).json(exerciseToSave);
	} else {
		res.status(400).json({Error: "Invalid request"});
	}
}));

app.get('/exercises', asyncHandler(async (req, res) => {
	const allExercises = await exercises.findAllExercises();
	res.status(200).json(allExercises);
}));

app.get('/exercises/:id', asyncHandler(async (req, res) => {
	let filter = {};
	if (req.params.id !== undefined) {
		filter._id = req.params.id;
	}
	const anExercise = await exercises.findExercise(filter);
	if (anExercise !== null) {
		res.status(200).json(anExercise);
	} else {
		res.status(404).json({Error: "Not found"});
	}
}));

app.put('/exercises/:id', asyncHandler(async (req, res) => {

	let filter = {};
	if (req.params.id !== undefined) {
		filter._id = req.params.id;
	}

	let exercise = getExerciseFromBody(req);

	if (!exercises.isExerciseValid(exercise)) {
		res.status(400).json({Error: "Invalid request"});
	} else {
		try {
			const result = await exercises.updateExercise(filter, exercise);

			if (result.matchedCount > 0) {
				const anExercise = await exercises.findExercise(filter);
				res.status(200).json(anExercise);
			} else {
				res.status(404).json({Error: "Not found"});
			}
		} catch (BSONTypeError) {
				res.status(404).json({Error: "Not found"});
		}
	}
}));


app.delete('/exercises/:id', asyncHandler(async (req, res) => {
	let filter = {};
	if (req.params.id !== undefined) {
		filter._id = req.params.id;
	}
	try {
		const deletedResult = await exercises.deleteExercise(filter);

		if (deletedResult.deletedCount > 0) {
			res.status(204).send();
		} else {
			res.status(404).json({Error: "Not found"});
		}
	} catch (error) {
		console.error(error);
	}
}));

// ========= error middleware =====================
app.use((error, req, res, next) => {
	console.error(error);
	res.status(500).json({Error: "Server error"});
});
// ========= error middleware =====================

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
