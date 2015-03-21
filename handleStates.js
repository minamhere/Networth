exports.handleState = function handleState(stateInfo, callback){
	//stateInfo = {jurisdiction_id:stateID, income:income, retirement:retirement, taxyear: taxyear, filingStatus: filingStatus};
	switch(stateInfo.jurisdiction_id){
		case "3": // Virginia
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "6": // Colorado
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "7": // Alabama
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "8": // Alaska
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "9": // Arizona 
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "10": // Arkansas
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "11": // California
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "12": // Connecticut
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "13": // Delaware
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "14": // Florida
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "15": // Georgia
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "16": // Hawaii
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "17": // Idaho
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "18": // Illinois
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "19": // Indiana
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "20": // Iowa
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "21": // Kansas
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "22": // Kentucky
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "23": // Louisiana
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "24": // Maine
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "25": // Maryland
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "26": // Massachusetts
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "27": // Michigan
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "28": // Minnesota
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "29": // Mississippi
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "30": // Missouri
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "31": // Montana
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "32": // Nebraska
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "33": // Nevada
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "34": // New Hampshire
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "35": // New Jersey
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "36": // New Mexico
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "37": // New York
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "38": // North Carolina
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "39": // North Dakota
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "40": // Ohio
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "41": // Oklahoma
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "42": // Oregon
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "43": // Pennsylvania
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "44": // Rhode Island
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "45": // South Carolina
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "46": // South Dakota
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "47": // Tennessee
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "48": // Texas
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "49": // Utah
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "50": // Vermont
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "51": // Washington
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "52": // West Virginia
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "53": // Wisconsin
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "54": // Wyoming
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "55": // American Samoa
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "56": // District of Columbia
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "57": // Federated States of Micronesia
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "58": // Guam
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "59": // Marshall Islands
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "60": // Northern Mariana Islands
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "61": // Palau
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "62": // Puerto Rico
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		case "63": // Virgin Islands
			async.waterfall([
				function getDedExempt(callback){
					getDeductionsExemptions(stateInfo.jurisdiction_id,stateInfo.taxyear,stateInfo.filingStatus, function (err,data){
						for (var deductionIndex in data){
							switch(data[deductionIndex].deduction_exemption_type){
								case 1: // 1 = Standard Deduction
									stateStandardDeduction = data[deductionIndex].amount;
									break;
								case 2:// 2 = Personal Exemption
									statePersonalExemption = data[deductionIndex].amount;
									break;
							};
						};
						callback(null,stateStandardDeduction, statePersonalExemption);
					});
					
				},
				function calcAGI(stateStandardDeduction, statePersonalExemption, callback) {
					stateAGI = stateInfo.income-stateInfo.retirement-stateStandardDeduction-statePersonalExemption;
					if (stateAGI<0) stateAGI = 0;
					callback(null, stateAGI);
				}
				],
				function calcTaxDue(err, stateAGI) {
					stateBracket = {jurisdiction_id:stateInfo.jurisdiction_id, agi:stateAGI, taxyear: stateInfo.taxyear, filingStatus: stateInfo.filingStatus};
					getTaxDue(stateBracket,callback);
				}
			);
			break;
		default: 
			console.log('Default state case');

	}

}