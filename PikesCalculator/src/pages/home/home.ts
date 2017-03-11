import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	measurements = {bitola: 3.875};
	result: any;
  constructor(public navCtrl: NavController) {
  	
  }

  calculate(measurements) {

  	measurements = this.parseValues(measurements);

  	this.result = {
  			pike: 0,
  			constantSpace: 0,
  			remainingSpace: measurements.length
  		}

  	while(true) {
  		if(this.result.remainingSpace - measurements.bitola >= 0) {
  			this.result.remainingSpace -= measurements.bitola;
  			this.result.constantSpace++;
  		}
  		else {
  			break;
  		}
  		if(this.result.remainingSpace - measurements.pikeWidth >= 0) {
  			this.result.remainingSpace -= measurements.pikeWidth;
  			this.result.pike++;
  		}
  		else {
  			break;
  		}
  	}

  	 this.result =  this.interpretResults(this.result, measurements);

  }

  interpretResults(result, measurements) {

  	if(result.pike == result.constantSpace) {
  		result.constantSpace--;
  		result.remainingSpace = result.remainingSpace + measurements.bitola;
  	}
  	else if(result.pike < result.constantSpace) {
  		if(result.remainingSpace != 0) {  			
  			result.remainingSpace = result.remainingSpace - measurements.pikeWidth + measurements.bitola;
  			result.constantSpace--;
  			result.pike++;
  		}
  	}
  	console.log(result);
  	return result;
  }

  reset(){
  	this.measurements = {bitola: 3.875};
	this.result = null;
  }

	parseValues(measurements) {

		measurements.length = Number(measurements.length + '');
		measurements.pikeWidth = Number(measurements.pikeWidth + '');
		measurements.bitola = Number(measurements.bitola + '');

		return measurements;
	}

}
  