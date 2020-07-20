
module.exports = function() {
	this.calculate_Rank = function(Punctuality,Cleanliness,Pantry,Overall) {
		let w3=3,w2=2,w1=1;

		let rank=w3*parseFloat(Punctuality)+w2*parseFloat(Cleanliness)+w1*parseFloat(Pantry)+w2*parseFloat(Overall);

		//console.log(rank);
		return(rank/(w3+w2+w1+w2));
	};
	this.calculate_Modified_Data = function(RankSchema,data) {
		 R=JSON.parse(JSON.stringify(RankSchema));
		 data=JSON.parse(JSON.stringify(data));
	   R.PunctualityModified=(parseFloat(R.PunctualityModified)*parseFloat(R.Count))+parseFloat(data.Punctuality);
		 R.CleanlinessModified=(parseFloat(R.CleanlinessModified)*parseFloat(R.Count))+parseFloat(data.Cleanliness);
		 R.PantryModified=(parseFloat(R.PantryModified)*parseFloat(R.Count))+parseFloat(data.Pantry);
		 R.OverallModified=(parseFloat(R.OverallModified)*parseFloat(R.Count))+parseFloat(data.Overall);
		 R.Count=parseFloat(R.Count) +1;
		 //console.log(R.PunctualityModified,R.CleanlinessModified,R.PantryModified,R.OverallModified);
		 R.PunctualityModified=R.PunctualityModified/R.Count;
		 R.CleanlinessModified=R.CleanlinessModified/R.Count;
		 R.PantryModified=R.PantryModified/R.Count;
		 R.OverallModified=R.OverallModified/R.Count;
		 return R;
	};
};
