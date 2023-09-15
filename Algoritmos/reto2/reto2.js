let VACAS;

while (true) {
  VACAS = parseInt(prompt("¿Cuántas vacas tiene la hacienda? (min 3 - max 50)"));
  if (!isNaN(VACAS) && VACAS >= 3 && VACAS <= 50) {
    break;
  } else {
    alert("El número de vacas debe estar entre 3 y 50.");
  }
}


let matrizProduccion = [];

for (let i = 0; i < 7; i++) {
  let produccionDia = [];
  for (let j = 0; j < VACAS; j++) {
    while (true) {
      let leche = parseFloat(prompt(`Día ${i + 1}: ¿Cuántos litros de leche produce la vaca ${j + 1} ? (min 0.0 - max 11.9)`));
      if (leche >= 0.0 && leche <= 11.9) {
        produccionDia.push(leche);
        break;
      } else {
        alert("El número de litros debe estar entre 0.0 y 11.9.");
      }
    }
  }
  matrizProduccion.push(produccionDia);
}


console.log('Producción total del hato en cada uno de los siete días.')

for (let i = 0; i < 7; i++) {
  let produccionTotalDia = 0;
  for (let j = 0; j < VACAS; j++) {
    produccionTotalDia += matrizProduccion[i][j];
  }
  console.log(`Día ${i + 1}: ${produccionTotalDia} litros.`);
}



let mayorProduccion = -1;
let menorProduccion = 12;
let diaMayorProduccion;
let diaMenorProduccion;

for (let i = 0; i < 7; i++) {
  let produccionTotalDia = 0;
  for (let j = 0; j < VACAS; j++) {
    produccionTotalDia += matrizProduccion[i][j];
  }

  if (produccionTotalDia > mayorProduccion) {
    mayorProduccion = produccionTotalDia;
    diaMayorProduccion = i + 1;
  }

  if (produccionTotalDia < menorProduccion) {
    menorProduccion = produccionTotalDia;
    diaMenorProduccion = i + 1;
  }
}

console.log('Día de la semana con mayor y menor producción.')
console.log(`Mayor producción: Día ${diaMayorProduccion}.`);
console.log(`Menor producción: Día ${diaMenorProduccion}.`);


console.log('El número de la vaca que dio más leche en cada día.')

for (let i = 0; i < 7; i++) {
  let vacaMayorProduccion;
  let mayorProduccionVaca = -1;

  for (let j = 0; j < VACAS; j++) {
    if (matrizProduccion[i][j] > mayorProduccionVaca) {
      mayorProduccionVaca = matrizProduccion[i][j];
      vacaMayorProduccion = j + 1;
    }
  }

  console.log(`Día ${i + 1}: Vaca ${vacaMayorProduccion} - (${mayorProduccionVaca} litros).`);
}
