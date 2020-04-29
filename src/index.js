import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/from'; // 这里我需要使用from 操纵符(operator)

console.log(process.env.NODE_ENV);   // 环境
let persons = [
    { name: 'Dave', age: 34, salary: 2000 },
    { name: 'Nick', age: 37, salary: 32000 },
    { name: 'Howie', age: 40, salary: 26000 },
    { name: 'Brian', age: 40, salary: 30000 },
    { name: 'Kevin', age: 47, salary: 24000 },
];

let index = 1;
Observable.from(persons)
    .subscribe(person => {
            console.log(index++, person);
        },err => {
            console.log(err);
        },() => console.log('Streaming is over.')
    )

function getData() {
    return Observable.create(
        observer => {   // 相当于subscribe function,每当有人订阅的时候，会为他提供一个observer
            persons.forEach( p => observer.next(p));
            observer.complete();
        }
    )
}

getData().subscribe(
    person => console.log(person.name),
    err => console.error(err),
    () => console.log('Streaming is over.')
)