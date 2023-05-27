/*** Variables. ***/
const btnCalcular = document.querySelector('#btnCalcular');
const btnGasto = document.querySelector('#btnGasto');
const btnReiniciar = document.querySelector('#btnReiniciar');
const totalPresupuesto = document.querySelector('#totalPresupuesto');
const totalGasto = document.querySelector('#totalGasto');
const totalSaldo = document.querySelector('#totalSaldo');
/* const gastoNombre = document.querySelector('#gastoNombre'); */
/* const gastoValor = document.querySelector('#gastoValor'); */
/* const gastoEliminar = document.querySelector('#gastoEliminar'); */
let arregloEntradas = [];
let arregloSalidas = [];

/*** Eventos ***/
btnCalcular.addEventListener('click', (e) => {
    e.preventDefault();

    const inputIngresoPresupuesto = document.querySelector('#inputIngresoPresupuesto').valueAsNumber;

    if (isNaN(inputIngresoPresupuesto)) {
        Swal.fire({
            icon: 'error',
            text: 'Debe agregar un numero al presupuesto inicial.',
        });
        // alert('Debe agregar un presupuesto inicial antes.')
    } else if (inputIngresoPresupuesto < 0 ) {
        Swal.fire({
            icon: 'error',
            text: 'El presupuesto no puede ser un numero negativo.',
        });
        // alert('El presupuesto no puede ser un numero negativo')
    } else {
        arregloEntradas.push(inputIngresoPresupuesto);

        agregarPresupuesto();
        limpiarInputPresupuesto();
    }
});

btnGasto.addEventListener('click', (e) => {
    e.preventDefault();

    const inputGastoNombre = document.querySelector('#inputGastoNombre').value;
    const inputGastoValor = document.querySelector('#inputGastoValor').valueAsNumber;

    if (inputGastoNombre == "") {
        Swal.fire({
            icon: 'error',
            text: 'Debe ingresar el nombre del gasto.',
        });
        // alert('Debe ingresar el nombre del gasto.')
    } else if (isNaN(inputGastoValor)) {
        Swal.fire({
            icon: 'error',
            text: 'Debe ingresar el valor del gasto.',
        });
        // alert('Debe ingresar el valor del gasto.')
    } else if (inputGastoValor < 0 ) {
        Swal.fire({
            icon: 'error',
            text: 'El valor no puede ser un numero negativo.',
        });
        // alert('El valor no puede ser un numero negativo.')
    } else {
        let objeto = {
            id: arregloSalidas.length + 1,
            nombre: inputGastoNombre,
            valor: inputGastoValor,
        }

        arregloSalidas.push(objeto);

        agregarGasto()
        limpiarInputGasto()
    }
});

btnReiniciar.addEventListener('click', () => {
    location.reload();
});


/*** Funciones ***/
function agregarPresupuesto() {
    totalPresupuesto.innerHTML = "";

    let total = arregloEntradas.reduce(function (total, presupuesto) {
        return total + presupuesto;
    }, 0);

    totalPresupuesto.innerHTML = Number(total).toLocaleString("es-CL");

    calcularSaldoFinal()
}

function agregarGasto() {

    totalGasto.innerHTML = "";

    let total = arregloSalidas.reduce(function (total, gasto) {
        return total + gasto.valor;
    }, 0);

    const gastoResultado = document.querySelector('#gastoResultado');
    gastoResultado.innerHTML = "";

    arregloSalidas.forEach(gasto => {
        const valorFormateado = Number(gasto.valor).toLocaleString("es-CL");
        gastoResultado.innerHTML += `
        <div class="detail-spent--row">
            <p id="gastoNombre">${gasto.nombre}</p>
            <p id="gastoValor">$ ${valorFormateado}</p>
            <p id="gastoEliminar" onclick="quitarGasto(${gasto.id})"><i class="fa-solid fa-trash-can"></i></p>
        </div>
        <hr class="detail-spent--line2">
        `;
    });

    totalGasto.innerHTML = Number(total).toLocaleString("es-CL");
    calcularSaldoFinal()
}

function quitarGasto(id) {
    let quitar = arregloSalidas.findIndex(gasto => gasto.id == id);
    arregloSalidas.splice(quitar, 1);

    agregarGasto()
    calcularSaldoFinal()
}

function calcularSaldoFinal() {
    let labelPresupesto = totalPresupuesto.innerHTML.replace(/[.]/g, '');
    let labelGasto = totalGasto.innerHTML.replace(/[.]/g, '');

    let labelSaldo = labelPresupesto - labelGasto
    totalSaldo.innerHTML = Number(labelSaldo).toLocaleString("es-CL");
}

function limpiarInputPresupuesto(){
    document.querySelector('#inputIngresoPresupuesto').value = "";
}

function limpiarInputGasto(){
    document.querySelector('#inputGastoNombre').value = "";
    document.querySelector('#inputGastoValor').value = "";
}