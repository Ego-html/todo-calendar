class Temperature {
  private _celsius: number = 0;

  get fahrenheit() : number {
    return (this._celsius * 9/5) + 32;
  }

  set fahrenheit(value: number) {
     this._celsius = (value - 32) * 5/9;
  }

  get celsius() : number {
    return this._celsius;
  }

  set celsius(value: number) {
    this._celsius = value;
  }
}

const temp1 = new Temperature();
const temp2 = new Temperature();
temp1.celsius = 25;
console.log('25°C in Fahrenheit:', temp1.fahrenheit);
temp2.fahrenheit = 32;
console.log('32°F in Celsius:', temp2.celsius);
