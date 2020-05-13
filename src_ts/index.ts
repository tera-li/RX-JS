import { range, interval, of, concat,zip, empty  } from "rxjs";
import { map, filter, take, combineAll, concatAll, mergeAll, mapTo, scan, timeout  } from "rxjs/operators";

// 1
// const source = interval(1000).pipe(take(2))
// const example = source.pipe(map(val => interval(1000).pipe(map(i => `Result (${val}): ${i}`),take(5))));
// const combined = example.pipe(combineAll())
// const subscribe = combined.subscribe(val => console.log(val)
// )

// 2
// RxJS v6+
// import { timer, combineLatest } from 'rxjs';

// // timerOne 在1秒时发出第一个值，然后每4秒发送一次
// const timerOne = timer(1000, 4000);
// // timerTwo 在2秒时发出第一个值，然后每4秒发送一次
// const timerTwo = timer(2000, 4000);
// // timerThree 在3秒时发出第一个值，然后每4秒发送一次
// const timerThree = timer(3000, 4000);

// // 当一个 timer 发出值时，将每个 timer 的最新值作为一个数组发出
// const combined = combineLatest(timerOne, timerTwo, timerThree);

// const subscribe = combined.subscribe(latestValues => {
//   // 从 timerValOne、timerValTwo 和 timerValThree 中获取最新发出的值
//   console.log(latestValues);
//     const [timerValOne, timerValTwo, timerValThree] = latestValues;
//   /*
//       示例:
//     timerOne first tick: 'Timer One Latest: 1, Timer Two Latest:0, Timer Three Latest: 0
//     timerTwo first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 0
//     timerThree first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 1
//   */
//     console.log(
//       `Timer One Latest: ${timerValOne},
//      Timer Two Latest: ${timerValTwo},
//      Timer Three Latest: ${timerValThree}`
//     );
//   }
// );

// 3
// // of按顺序发出任意数量的值
// // 发出 1,2,3
// const sourceOne = of(1, 2, 3);
// // 发出 4,5,6
// const sourceTwo = of(4, 5, 6);
// // 当前一个observable订阅完后再订阅下一个observable发出的值
// const example = concat(sourceOne,sourceTwo)
// const subscribe = example.subscribe( data => console.log(data))

// 4
// // 每2秒发出值
// const source = interval(2000);
// const example = source.pipe(
//   // 为了演示，增加10并作为 observable 返回
//   map(val => of(val + 10)),
//   // 合并内部 observables 的值
//   concatAll()
// );
// // 输出: 'Example with Basic Observable 10', 'Example with Basic Observable 11'...
// const subscribe = example.subscribe(val =>
//   console.log('Example with Basic Observable:', val)
// );

// 5
// import { mergeMap } from 'rxjs/operators';
// import { forkJoin } from 'rxjs/observable/forkJoin';

// const myPromise = (val: any) =>
//   new Promise(resolve =>
//     setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000)
//   );
// const source = of([1, 2, 3, 4, 5]);
// // 发出数组的全部5个结果
// const example = source.pipe(mergeMap(q => forkJoin(...q.map(myPromise))));
// /*
//   输出:
//   [
//    "Promise Resolved: 1",
//    "Promise Resolved: 2",
//    "Promise Resolved: 3",
//    "Promise Resolved: 4",
//    "Promise Resolved: 5"
//   ]
// */
// const subscribe = example.subscribe(val => console.log(val));

// 6
// import { mapTo } from 'rxjs/operators';
// import { merge } from 'rxjs';

// const first = interval(2500);
// const second = interval(2000);
// const third = interval(1500);
// const fourth = interval(1000);

// // 静态方法合并observable
// const example = merge(
//   first.pipe(mapTo('FIRST')),
//   second.pipe(mapTo('SECOND')),
//   third.pipe(mapTo('THIRD')),
//   fourth.pipe(mapTo('FOURTH')),
// );

// const subscribe = example.subscribe((val: any) => console.log(val)
// );

// 7
// const myPromise = (val: any) => new Promise((resolve, reject) => 
//   setTimeout(() => {
//     resolve(`Result${val}`)  
//   }, 2000)
// );

// const source = of(1,2,3)
// const example = source.pipe(
//   map(val => myPromise(val)),
//   mergeAll()
// )

// const subscribe = example.subscribe(val =>console.log(val))

// const soucre = interval(500).pipe(take(5))

// // const exmaple = soucre.pipe(
// //   map(val => 
// //     soucre.pipe(
// //       delay(1000),
// //       take(3)
// //       )
// //     ),
// //     mergeAll(2)
// // )

// const subscribe = soucre.subscribe(val => console.log(val))

// 8 
// import { pairwise } from 'rxjs/operators';

// interval(1000).pipe(
//   pairwise(),  // 将前一个值和当前值组成一个数组发出
//   take(6)
// ).subscribe(console.log);

// 9
// import { race } from 'rxjs/observable/race';

// const example = race(   //只使用最先发出的值
//   interval(1500),
//   interval(1000).pipe(mapTo('1s Won')),
//   interval(2000),
//   interval(2500)
// ).pipe(delay(1000))
// const subscribe = example.subscribe(val => console.log(val))

// 10
// import { startWith } from 'rxjs/operators';
// const soucre = of(1,2,3)
// const example = soucre.pipe(startWith('00000'),scan((acc, curr) => `${acc} ${curr}`))  // 发出0开头的初始值
// const subscribe = example.subscribe(val => console.log(val))

// 11
// import { withLatestFrom } from 'rxjs/operators';
// const source = interval(5000);
// // 每1秒发出值
// const secondSource = interval(1000);
// const example = source.pipe(
//   withLatestFrom(secondSource), // 合并另一个新值，可以作为map的第二个参数
//   map(([first, second]) => {
//     return `First Source (5s): ${first} Second Source (1s): ${second}`;
//   })
// );
// /*
//   输出:
//   "First Source (5s): 0 Second Source (1s): 4"
//   "First Source (5s): 1 Second Source (1s): 9"
//   "First Source (5s): 2 Second Source (1s): 14"
//   ...
// */
// const subscribe = example.subscribe(val => console.log(val));

// 12
// const sourceOne = of('Hello');
// const sourceTwo = of('World!');
// const sourceThree = of('Goodbye');
// const sourceFour = of('World!');
// // 等所有的observables都发出一个值，才将所有值合并作为数组发出
// const example = zip(
//   sourceOne,
//   sourceTwo.pipe(timeout(1000)),
//   sourceThree.pipe(timeout(2000)),
//   sourceFour.pipe(timeout(3000)),
// )
// const subscribe = example.subscribe(val => console.log(val))

// 13
// import { defaultIfEmpty } from 'rxjs/operators';

// const exampleOne = empty().pipe(defaultIfEmpty('weq'))   // 当源observable为空时，发出默认空值
// const subscribe = exampleOne.subscribe(val => console.log(val)
// )

// 14
// import { every } from 'rxjs/operators';

// const soucre = of(1,2,3,4,5);
// const example = soucre.pipe(
//   every(val => val % 2 === 0)    //  只有全部值符合要求才返回为true
// );
// const subscribe = example.subscribe(val => console.log(val))

import { fromEvent } from 'rxjs';

// 创建发出点击事件的 observable
const source = fromEvent(document.getElementsByTagName('h1'), 'click');
// 映射成给定的事件时间戳
const example = source.pipe(map(event => `Event time: ${event}`));
// 输出 (示例中的数字以运行时为准): 'Event time: 7276.390000000001'
const subscribe = example.subscribe(val => console.log(val));