import mongoose from 'mongoose';
import 'dotenv/config';
import {isExerciseValid} from './validation.mjs';

mongoose.connect(
	process.env.MONGODB_CONNECT_STRING,
	{useNewUrlParser: true}
);

const db = mongoose.connection;

const exerciseSchema = mongoose.Schema({
	name: {type: String, required: true},
	reps: {type: Number, required: true},
	weight: {type: Number, required: true},
	unit: {type: String, required: true},
	date: {type: String, required: true}
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
	const exercise = new Exercise({name: name, 
		reps: reps, 
		weight: weight, 
		unit: unit, date: date});
	return exercise.save();
};

const findAllExercises = async () => {
	const queryAll = await Exercise.find().exec();
	return queryAll;
};

const findExercise = async (filter) => {
	const query_result = await Exercise.findOne(filter).exec();
	return query_result;
};

const updateExercise = async (filter, update) => {
	const result = await Exercise.updateOne(filter, update);
	return result;
};

const deleteExercise = async (filter) => {
	const result = await Exercise.deleteOne(filter);
	return result;
};

db.once("open", () => {
	console.log("Successfully connected to MongoDB using Mongoose!");
});

export {createExercise, isExerciseValid, findAllExercises, findExercise, updateExercise, deleteExercise};
