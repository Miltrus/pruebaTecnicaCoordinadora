class Producto {
  constructor(codigo, nombre, precio) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio = precio;
  }
}

class Cliente {
  constructor(nit, nombre, telefono, direccion, email) {
    this.nit = nit;
    this.nombre = nombre;
    this.telefono = telefono;
    this.direccion = direccion;
    this.email = email;
  }
}

class Venta {
  constructor(producto, cliente) {
    this.producto = producto;
    this.cliente = cliente;
  }

  obtenerPrecio() {
    return this.producto.precio;
  }
}

class SistemaVentas {
  constructor() {
    this.ventas = [];
    this.clientes = [];
  }

  registrarVenta() {
    const producto = this.obtenerDatosVenta();
    const cliente = this.obtenerDatosCliente();
    const venta = new Venta(producto, cliente);
    this.ventas.push(venta);
    this.clientes.push(cliente);
  }

  obtenerDatosVenta() {
    const codigo = parseInt(prompt("Ingrese el código del producto:"));
    const nombre = prompt("Ingrese el nombre del producto:");
    const precio = parseFloat(prompt("Ingrese el precio del producto:"));
    return new Producto(codigo, nombre, precio);
  }

  obtenerDatosCliente() {
    const nit = parseInt(prompt("Ingrese el NIT del cliente:"));
    const nombre = prompt("Ingrese el nombre del cliente:");
    const telefono = parseInt(prompt("Ingrese el teléfono del cliente:"));
    const direccion = prompt("Ingrese la dirección del cliente:");
    const email = prompt("Ingrese el email del cliente:");
    return new Cliente(nit, nombre, telefono, direccion, email);
  }

  obtenerNumeroDeVentas(condicion) {
    return this.ventas.filter(condicion).length;
  }

  calcularPromedio(condicion) {
    const ventasFiltradas = this.ventas.filter(condicion);
    const total = ventasFiltradas.reduce((acumulador, venta) => acumulador + venta.obtenerPrecio(), 0);
    return total / ventasFiltradas.length;
  }

  obtenerVentas(condicion) {
    return this.ventas.filter(condicion);
  }

  encontrarMayorYMenorCompra() {
    let mayorCompra = this.ventas[0];
    let menorCompra = this.ventas[0];
    let clienteMayorCompra = this.clientes[0];
    let clienteMenorCompra = this.clientes[0];

    for (let i = 1; i < this.ventas.length; i++) {
      if (this.ventas[i].obtenerPrecio() > mayorCompra.obtenerPrecio()) {
        mayorCompra = this.ventas[i];
        clienteMayorCompra = this.clientes[i];
      }

      if (this.ventas[i].obtenerPrecio() < menorCompra.obtenerPrecio()) {
        menorCompra = this.ventas[i];
        clienteMenorCompra = this.clientes[i];
      }
    }

    return { mayorCompra, menorCompra, clienteMayorCompra, clienteMenorCompra };
  }
}

const sistema = new SistemaVentas();

const numVentas = parseInt(prompt("Ingrese el número de ventas a registrar:"));
for (let i = 0; i < numVentas; i++) {
  sistema.registrarVenta();
}

console.log("1. Ventas mayores a $550,000:", sistema.obtenerNumeroDeVentas(venta => venta.obtenerPrecio() > 550000));
console.log("2. Ventas entre $200,000 y $550,000:", sistema.obtenerNumeroDeVentas(venta => venta.obtenerPrecio() > 200000 && venta.obtenerPrecio() <= 550000));
console.log("3. Promedio de ventas mayores a $550,000:", sistema.calcularPromedio(venta => venta.obtenerPrecio() > 550000));
console.log("   Promedio de ventas entre $200,000 y $550,000:", sistema.calcularPromedio(venta => venta.obtenerPrecio() > 200000 && venta.obtenerPrecio() <= 550000));

const ventasMayores550 = sistema.obtenerVentas(venta => venta.obtenerPrecio() > 550000);
const ventasMayores200 = sistema.obtenerVentas(venta => venta.obtenerPrecio() > 200000);

console.log("4. Ventas mayores a $550,000:", ventasMayores550);
console.log("5. Ventas mayores a $200,000:", ventasMayores200);

const { mayorCompra, menorCompra, clienteMayorCompra, clienteMenorCompra } = sistema.encontrarMayorYMenorCompra();
console.log("6. Cliente con mayor compra:", clienteMayorCompra);
console.log("   Cliente con menor compra:", clienteMenorCompra);
