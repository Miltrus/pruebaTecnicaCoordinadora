let vector1 = [];
let vector2 = [];

let elementos;

while (true) {
  elementos = parseInt(prompt("¿Cuántos elementos quieres en los vectores? (max 15)"));
  if (!isNaN(elementos) && elementos <= 15 && elementos >= 0) {
    break;
  } else {
    alert("El número de elementos debe ser un número entre 1 y 15");
  }
}

for (let i = 0; i < elementos; i++) {
  let n1 = leerNum(`Ingresa el número ${i + 1} para el vector 1 (min 1 - max 30): `);
  vector1.push(n1);

  let n2 = leerNum(`Ingresa el número ${i + 1} para el vector 2 (min 1 - max 30): `);
  vector2.push(n2);
}

console.log("VECTOR 1: ", vector1);
console.log("VECTOR 2: ", vector2);

vector1.sort((a, b) => a - b);
vector2.sort((a, b) => a - b);

console.log("VECTOR 1 ordenado: ", vector1);
console.log("VECTOR 2 ordenado: ", vector2);

let sumarVectores = [];

for (let i = 0; i < elementos; i++) {
  let v1 = vector1[i] || 0;
  let v2 = vector2[i] || 0;
  let suma = v1 + v2;
  sumarVectores.push(suma);
}

console.log("Suma de vectores:", sumarVectores);

function leerNum(n) {
  while (true) {
    let numero = parseInt(prompt(n));
    if (!isNaN(numero) && numero >= 1 && numero <= 30) {
      return numero;
    } else {
      alert("El número debe estar entre 1 y 30");
    }
  }
}
