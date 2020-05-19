// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from'; // 这里我需要使用from 操纵符(operator)
import myTest from './component/test.js';
import { myClass } from './component/testTwo.js'

console.log(process.env.NODE_ENV); // 环境
// class index {
//     constructor(a, b, test) {
//         this.a = a;
//         this.b = b;
//         this.dataService = test;
//     }
//     print() {
//         console.log(this.a + ' ' + this.b);
//     }
// }
const mytest = new myTest.Demo('Array', 'year is 41');
console.log(mytest.print());
console.log(myClass.a);
