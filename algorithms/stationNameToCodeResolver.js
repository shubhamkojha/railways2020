const stationNameToCode = require('../data/stationNametoCode.json');
module.exports = function() {
	this.stationNameToCodeResolver = (name) => {
		const additions = [ '', ' Central', ' Junction', ' Terminal', ' City', ' Cantt.' ];
		//keep the spacing after interted comma as it is
		var capitalizeFirstLetter = (name) => {
			const splitName = name.split(' ');

			var nameOfStation = '';

			for (var key in splitName) {
				var capitalizeFirstLetter = splitName[key].charAt(0).toUpperCase() + splitName[key].slice(1);
				nameOfStation += capitalizeFirstLetter + ' ';
			}
			return nameOfStation;
		};
		try {
			name = capitalizeFirstLetter(name);
			name = name.slice(0, name.length - 1);
			for (var key in additions) {
				var localname = name;
				localname = localname + '' + additions[key];
				var stationName = stationNameToCode[localname];
				if (stationName !== undefined) {
					return stationName;
				}
			}
		} catch (error) {
			res.status(500).json(error);
		}
	};
};
