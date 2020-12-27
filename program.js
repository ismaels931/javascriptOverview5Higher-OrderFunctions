console.log("Las funciones de orden superior, son funciones que operan en otras funciones");
console.log("ya sea tomándolas como argumentos o retornándolas e.g. ver código fuente");

let repeat = (n, action) => {
	for (let i = 0; i < n; ++i) action(i);
};

/*Se puede pasar una función como por ejemplo el método log del objeto console o bien una función anónima
 *definida con la notación arrow
 */

repeat(10, console.log)

let vector = [];
repeat(10, i => {vector.push(`Unit: ${i + 1}`)});
console.log(vector);

vector = [];
repeat(10, i => {vector.push(`Logarithm of ${i} is ${Math.log(i)}`)});
console.log(vector);

function greaterThan(n) {
	return m => m > n; //m > n representa el cuerpo de la función. Como es una sola sentencia no es necesario encerrarla entre llaves
};

let result = greaterThan(10);
console.log(result(7));

result = greaterThan(11);
console.log(result(41));

console.log();

console.log("Las funciones de orden superior son útiles para cambiar el resultado de otras funciones");
console.log("e.g. podemos personalizar el retorno de la función Math.min para que no solo retorne el número");
console.log("más pequeño de una secuencia de números si no que además incorpore un texto explicativo con el resultado.")
console.log("Ver código fuente");

function modifyFunctionOutput(action) {
	return (...args) => {
		let result = action(...args);
		console.log("Called with " + args + " returned " + result);
		return result;
	};
};

modifyFunctionOutput(Math.min)(3,2,1);

console.log();

console.log("Nuevas formas de controlar el flujo de ejecución e.g. ver código fuente");

function unless(test, then) {
	if (!test) then();
};

repeat(3, n => {
			unless(n % 2 == 1, () => console.log(n, "is even"));
});

function abstractLoop(condition, increment, body) {
	for (let i = 0; condition(i); i = increment(i)) body(i);
}

abstractLoop(i => i <= 10, i => i = i + 2, console.log);

console.log();

console.log("A continuación, en el código fuente, se puede ver el uso de un método built-in de arrays,");
console.log("que itera sobre el array y recibe como argumento una función por lo que se comporta como una función de orden superior.");

["a", "b", "c"].forEach(letter => console.log(letter));

console.log();

console.log("Representación de caracteres Unicode: https://unicode-table.com/es/");
console.log("\u0950");

console.log();

console.log("Filtering arrays e.g. ver código fuente");

//Pre: array contiene scripts de Unicode y test es una función que filtra los elementos de array
//Post: passed contiene todos los elementos de array que tienen la propiedad living: true
function filter(array, test) {
	let passed = [];
	for (let element of array) {
		if (test(element)) passed.push(element);
	}
	return passed;
}

console.log("console.log(filter(SCRIPTS, script => script.living))");

console.log("Al igual que forEach, filter es un método estándar de array e.g.");
console.log("console.log(SCRIPTS.filter(s => s.direction == ttb entre comillas dobles))");

console.log([1,2,3,4,5,6,7,8,9,10].filter(number => number % 2 == 0)); //Retorna un array solo con los elementos que cumplen la condición

console.log();

console.log("Con map se puede transformar un array en otro, mapeando todos sus elementos e.g. ver código fuente");

//Pre: array contiene scripts de Unicode y transform puede acceder a una propiedad de cada uno de los scripts u objetos que contiene array
//Post: mapped es un array que contiene los valores de la propiedad name de cada uno de los objetos
function map(array, transform) {
	let mapped = [];
	for (let element of array) mapped.push(transform(element));
	return mapped;
}

console.log("let rtlScripts = SCRIPTS.filter(s => s.direction == rtl entre comillas dobles)");
console.log("console.log(map(rtlScripts, s => s.name))");

console.log("El método map, también es una función estándar o built-in e.g.");
console.log("console.log(SCRIPTS.map(m => m.name))");

/*Al contrario que filter, map devuelve los valores de evaluar cada elemento del array: true o false*/
console.log([1,2,3,4,5,6,7,8,9,10].map(number => number % 2 == 0));

console.log();

console.log("Mediante el método reduce podemos calcular un solo valor a partir de los elementos de un array e.g. ver código fuente");

function reduce(array, combine, start) {
	let current = start;
	for (let element of array) current = combine(current, element);
	return current;
};

console.log(reduce([1,2,3,4], (a, b) => a + b, 0));

console.log("reduce también es una función built-in e.g. ver código fuente");

console.log([1,2,3,4].reduce((a,b) => a + b));

console.log("La generalización del método reduce es la siguiente: ver código fuente");

console.log([1,2,3,4].reduce((acumulador, valorActual, índiceActual, array) => {
							console.log(índiceActual); return acumulador + valorActual;}, 10));

console.log("Se le puede pasar un valor inicial al acumulador, en el caso de arriba, este valor es 10");

console.log("Podemos usar reduce (dos veces) para encontrar el script u objeto con más caracteres e.g. ver código fuente");

/*Esta función recibe como argumento un elemento del array SCRIPTS. Accede a la propiedad ranges, del elemento,
 *que a su vez es un array que contiene arrays y cada uno de estos arrays tiene dos elementos que definen un rango.
 *El límite inferior y superior de cada rango se mapea mediante el parámetro [from, to], que junto con el parámetro count
 *la función reduce calcula la cantidad de caracteres del elemento de SCRIPTS que se ha pasado como argumento.
 */
function characterCount(script) {
	return script.ranges.reduce((count, [from, to]) => {
		return count + (to - from);
	}, 0);
}

/*A continuación, usamos de nuevo reduce para hallar el elemento de SCRIPTS que tiene más caracteres. Esta vez,
 *le pasamos como argumento a reduce una función anónima que tiene dos parámetros, que representan dos elementos
 *consecutivos del array SCRIPTS. En el cuerpo de la función llamamos a characterCount dos veces, una por cada parámetro,
 *para calcular la cantidad de caracteres que tiene cada parámetro, y retornar in situ, el parámetro que tiene más caracteres,
 *a través de un operador ternario.
 */
console.log("console.log(SCRIPTS.reduce((a, b) => {return characterCount(a) < characterCount(b) ? b : a;}))");

console.log();

console.log("Las funciones de orden superior son útiles cuando es necesario componer operaciones, i.e. usar varias funciones");
console.log("e.g. ver código fuente");

function average(array) {
	return array.reduce((a, b) => a + b) / array.length;
}

console.log("Las sentencias de abajo son un ejemplo de composición de funciones. Le pasamos como argumento a la función average");
console.log("un array producto de filtrar el array de SCRIPTS meidante s.living, que es un booleano, y después simplemente");
console.log("se mapean solo los valores del campo year.");
console.log();
console.log("console.log(Math.round(average(SCRIPTS.filter(s => s.living).map(s => s.year))))");
console.log("console.log(Math.round(average(SCRIPTS.filter(s => !s.living).map(s => s.year))))");

console.log();

console.log("Despúes de calcular la media aritmética de cada array, se puede comprobar que las lenguas muertas (!s.living)");
console.log("obviamente son más antiguas.");

console.log();

console.log("El método some, es otra función de orden superior. Toma como argumento una función test (expresión booleana)");
console.log("y devuelve true cuando algún elemento cumple la condición e.g. ver código fuente");

/*Esta función retorna el elemento de SCRIPTS que cumpla que tiene un code que se encuentra dentro del rango del elemento*/
function characterScript(code) {
	for (let script of SCRIPTS) {
		if (script.ranges.some(([from, to]) => {
			return code >= from && code < to;
		})) {
			return script;
		}
	}
	return null;
}

console.log("console.log(characterScript(121))");

console.log([1,2,3,4].some(n => n > 10));

console.log();

console.log("La siguiente función cuenta los caracteres que pertenecen a cada script. Ver código fuente");

//Esta función espera que se le pase como argumentos una colección de elementos iterable y nombre de grupo
//para un elemento determinado.
//Retorna un array de objetos cada uno de lo cuales denomina un grupo e indica el nombre de elementos que
//se han encontrado para ese grupo.
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    //Cuando counts está vacío o no encuetra ningún elemento que tenga el atributo name, findIndex retorna -1
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1}); //El atributo name es la variable declarada más arriba que contiene true o false
    } else {
      counts[known].count++;
    }
  }
  return counts;
}
 //Para este array de ejemplo, countBy retorna un array informativo con dos elementos que son objetos.
 //Estos objetos informan sobre cuantos elementos del array de ejemplo son true y cuantos false.
console.log("console.log(countBy([1,2,3,4,5], n => n > 2))");

console.log("La función findIndex, toma como argumento una función test (expresión booleana) y devuelve el índice");
console.log("del primer elemento del array que cumple la condición e.g. ver código fuente");

const array1 = [5, 12, 8, 130, 44];

console.log(array1.findIndex(element => element > 13));

console.log("También la función find, que es similar a findIndex, pero en vez de devolver el índice del elemento");
console.log("que cumple la condición devuelve el elemento.");

//Usando countBy se puede escribir una función que nos diga que scripts se usan en un fragmento de texto: latin, cirílico...
//codePointAt(index) es una función built-in que retorna el código en decimal de un carácter de una cadena.
//Se le puede pasar como argumento un índice (index) para acceder directamente a un carácter de la cadena.
//Recordemos que la función characterScript retorna un objeto que pertenece al array SCRIPTS. El campo range de dicho
//objeto contiene el código del caracter que se le ha pasado como argumento a characterScript.
function textScripts(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none"; //Cualquier objeto se evalúa como verdadero. Si script está vacía (undefined), retornará none.
  }).filter(({name}) => name != "none"); //Solo retorna aquellos objetos cuyo campo name es diferente de none
  //Para que filter pueda acceder a los atributos de un objeto, la función anónima que se le pasa como argumento, debe encerrar entre
  //llaves y paréntesis el atributo(s) al que se quiere acceder

  //La variable total contiene la suma del atributo count, de cada objeto de scripts. El parámetro n, se inicializa con 0
  let total = scripts.reduce((n, {count}) => n + count, 0);
  if (total == 0) return "No scripts found";

  //Retorna el tanto por ciento que representa cada script en la cadena de entrada. La función map calcula este tanto por ciento
  //para cada script y la función join retorna un string compuesto por todos los elementos del array devuelto por map.
  return scripts.map(({name, count}) => {
    return `${Math.round(count * 100 / total)}% ${name}`;
  }).join(", ");
}

let fragmento = '英国的狗说"woof", 俄罗斯的狗说"тяв"';
console.log("console.log(textScripts(fragmento))");

console.log();

console.log("Flattening");
console.log("Crear una función que a partir de una matriz devuelva un vector")

let flattening = matrix => {
	return matrix.reduce((a, b) => a.concat(b));
}

let matrix = [[1,2], [3,4], [5,6,7]];
console.log(flattening(matrix));

console.log();

console.log("Your own loop");

function ownLoop(value, test, current, body) {
	for (value; test(value); value = current(value)) body(value);
};

ownLoop(3, n => n > 0, n => n - 1, console.log);
ownLoop(0, n => n < 10, n => n + 1, n => console.log(Math.log(n)));

//Solution: https://eloquentjavascript.net/code/#5.2

console.log();

console.log("Everything");
console.log("Al igual que la función some, los vectores tienen la función every. Esta función retorna true");
console.log("cuando todos los elementos cumple un condición determinada. La función some es al operador || lo que función every es");
console.log("es al operador &&.");

function every1(array, test) {
	for (let element of array) {
		if (!test(element)) return false;
	}
	return true;
}

function every2(array, test) {
	//Si todos los elementos no cumplen la condición negada, quiere decir que todos los elementos cumplen la condición sin negar
	//entonces se tiene que negar el retorno de some ya que ha evaluado todos los elementos
	return !array.some(element => !test(element));
}

console.log(every1([1,3,5], n => n < 10));
console.log(every1([2,4,16], n => n < 10));
console.log(every1([], n => n < 10));

console.log(every2([1,3,5], n => n < 10));
console.log(every2([2,4,16], n => n < 10));
console.log(every2([], n => n < 10));

console.log("console.log([1,2,3].every(n => n > 0))");

console.log();

console.log("Dominant writing direction");

function dominantDirection(text) {
	let scripts = countBy(text, char => {
		let script = characterScript(char.codePointAt(0));
		return script ? script.name : "none";
	}).filter(({name}) => name != "none");

	function maxim(array) {
		if (array.length == 1) return array[0];
		else {
			let objMax = array[0];
			let n = array.length;
			for (let i = 1; i < n; ++i) {
				if (array[i].count > objMax.count) objMax = array[i];
			}
			return objMax;
		}
	}
	let max = maxim(scripts);
	let result = SCRIPTS.filter(a => a.name == max.name);
	return result[0].direction;
};

//Solution: https://eloquentjavascript.net/code/#5.4
