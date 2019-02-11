module.exports = {
	getDuplicates: array => {
		const duplicates = array.reduce((acc, cur, idx, arr) => {
			if (arr.indexOf(cur) !== idx && acc.indexOf(cur) < 0) {
				acc.push(cur);
			}
			return acc;
		}, []);

		return duplicates;
	}
}
