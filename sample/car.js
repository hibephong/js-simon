class Car {
   #brand; #model;
   constructor(parameter) {
      this.#brand = parameter.brand;
      this.#model = parameter.model;
      this.speed = 0;
      this.topSpeed = 200;
      this.acceleration = 5;
      this.isTrunkOpen = false;
   }
   displayInfo() {
      console.log(`${this.#brand}: ${this.#model}, Speed: ${this.speed} km/h`);
   }
   go() {
      if (this.isTrunkOpen == false)
         this.speed = Math.min(this.topSpeed, this.speed + this.acceleration);
      else
         console.log("The trunk is still open");
   }
   brake() {
      this.speed = Math.max(0, this.speed - this.acceleration);
   }
   openTrunk() {
      if (this.speed === 0)
         this.isTrunkOpen = true;
      else
         console.log("The car is moving");
   }
   closeTrunk() {
      this.isTrunkOpen = false;
   }
}

class RaceCar extends Car {
   constructor (parameter) {
      super(parameter);
      this.topSpeed = 300;
      this.acceleration = parameter.acceleration;
   }
   openTrunk() { console.log ('Race cars do not have a trunk'); }
   closeTrunk() { console.log ('Race cars do not have a trunk'); }

}
let first = new Car({brand: 'Toyota', model: 'Corolla'}), second = new RaceCar({brand:'Tesla', model: 'Model 3', acceleration: 20});
first.displayInfo();
second.brand = 'McLaren';
second.model = 'F1';
second.go();
second.closeTrunk();
second.displayInfo();