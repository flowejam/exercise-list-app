
function isNameValid(name) {
	if (typeof(name) === 'string' && name.length > 0) {
		return true;
	} else {
		return false;
	}
}

function isRepsValid(reps) {
	if (typeof(reps) === 'number' && reps > 0) {
		return true;
	} else {
		return false;
	}
}

function isWeightValid(weight) {
	if (typeof(weight) === 'number' && weight > 0) {
		return true;
	} else {
		return false;
	}
}

function isUnitValid(unit) {
	if (unit === 'lbs' || unit === 'kgs') {
		return true;
	} else {
		return false;
	}
}

function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function isExerciseValid(exerciseObj) {
	const ex = exerciseObj;
	if (isNameValid(ex.name) && 
		isRepsValid(ex.reps) && 
		isWeightValid(ex.weight) && 
		isUnitValid(ex.unit) &&
		isDateValid(ex.date)) {

		return true;

	} else {
		return false;
	}

}

export {isExerciseValid};
