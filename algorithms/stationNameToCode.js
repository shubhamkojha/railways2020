module.exports = function() {
	this.stationNameToCodeResolver = (name) => {
		const additions = [ 'Central', 'Junction', 'Terminal', 'City', 'Cantt.' ];
		const capitalizeFirstLetter = (name) => {
			return name.charAt(0).toUpperCase() + name.slice(1);
		};

		try {
			for (key in additions) {
				var cname = capitalizeFirstLetter(name);

				cname = cname + ' ' + additions[key];
				const stationName = stationNameToCode[cname];
				if (stationName !== undefined) {
					return stationName;
				}
			}
		} catch (error) {
			throw error;
		}
	};
};
