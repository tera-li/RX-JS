import { range, interval, of, concat,zip, empty, observable, from, timer, fromEvent  } from 'rxjs';
import { filter, take, combineAll, concatAll, mergeAll, mapTo, scan, timeout, map  } from 'rxjs/operators';
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

// 15
// import { Observable } from 'rxjs';

// const hello = Observable.create((msg: any) => {  // 使用给定的订阅函数来创建observable
//     let value = 0;
//     const interval = setInterval(() => {
//         if (value % 2 === 0) {
//             msg.next(value)
//         }
//         value++
//     }, 1000)
//     return () => clearInterval(interval)
// });

// const subscribe = hello.subscribe((val: any) => console.log(val))

// setTimeout(() => {
//     console.log('10秒后取消订阅');
//     subscribe.unsubscribe();
// }, 1000 * 10);

// 16    立即完成的observable
// const subscribe = empty().subscribe({         // error交互错误的信息，通知observer哪里出了问题
//     next: () => console.log('next'),          // next用来交付数据的方法
//     complete: () => console.log('Complete!')  // complete通知observer已经没有可以交付的数据了
// });

// 17 将数组、promise、或迭代器转换成observable
// const arraySource = from([1,2,3,4,5]);
// const promiseSource = from(new Promise(resolve => resolve('promise成功')))

// const mapIs = new Map();
// mapIs.set(1, 'black');
// mapIs.set(2, 'red');
// const mapSource = from(mapIs);
// const subscribe = mapSource.subscribe((val: any) => console.log(val))

// 18 
// import { fromEvent } from 'rxjs';

// // 创建发出点击事件的 observable
// const source = fromEvent(document.getElementsByTagName('h1'), 'click');
// // 映射成给定的事件时间戳
// const example = source.pipe(map(event => `Event time: ${event.timeStamp}`));
// // 输出 (示例中的数字以运行时为准): 'Event time: 7276.390000000001'
// const subscribe = example.subscribe(val => console.log(val));

// 19
// import { fromPromise } from 'rxjs/observable/fromPromise';
// import { mergeMap, catchError } from 'rxjs/operators';

// const myPromise = (writeReject: any) => {
//     return new Promise((resolve, reject) => {
//         if (writeReject) {
//             reject('失败')
//         }
//         resolve('成功')
//     })
// }
// const source = of(true, false);
// const example = source.pipe(
//     mergeMap(val => 
//         fromPromise(myPromise(val))         // 创建由promise转换而来observable，并发出promise的结果
//         .pipe(catchError(error => of(error))
//     ))
// )

// 20 抛出错误
// import { throwError } from 'rxjs';
// const source = throwError('this is error')
// const subscribe = source.subscribe({
//     next: (val) => console.log(val),
//     complete: () => console.log('已经没有数据了'),
//     error: (error: any) => console.error(error)
// })

// 21 按照timer指定时间发出值
// import { timer } from 'rxjs';
// const source = timer(1000, 2000);  // 1.1秒后输出一个值，2.然后每两秒发出一个值
// const subscribe = source.subscribe(val => console.log(val))

// 22  catchError  捕获错误
// import { throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// // 发出错误
// const source = throwError('This is an error!');
// const example = source.pipe(catchError((val: any) => of(val)))  // 捕获错误，发出错误
// const subscribe = example.subscribe(val => console.log(val))

// 23
// import { throwError } from 'rxjs';
// import { tap, mergeMap, retry, retryWhen, delayWhen } from 'rxjs/operators';

// // 每1秒发出值
// const source = interval(1000);
// const example = source.pipe(
//     mergeMap((val: number) => {
//         if (val > 5) {
//             return throwError('Error!')
//         }
//         return of(val)
//     }),
//     // retry(2)       // 如果发出错误，将以指定次数重试observable序列
//     retryWhen(error =>  // 当发生错误时，基于自定义的标准来重试 observable 序列。
//         error.pipe(
//             tap(val => console.log(`Value${val} was too high!`)),
//             delayWhen(val => timer(val * 1000))
//             )
//         )
// )
// const subscribe = example.subscribe({
//     next: val => console.log(val),
//     error: val => console.log(`${val}：Retried 2 times then quit!`)
// })

// 24  多播  publish

// import { publish, tap } from 'rxjs/operators';

// // 每1秒发出值
// const source = interval(1000);
// const example = source.pipe(
//   // 副作用只会执行1次
//   tap(_ => console.log('Do Something!')),
//   // 不会做任何事直到 connect() 被调用
//   publish()
// );

// /*
//   source 不会发出任何值直到 connect() 被调用
//   输出: (5秒后)
//   "Do Something!"
//   "Subscriber One: 0"
//   "Subscriber Two: 0"
//   "Do Something!"
//   "Subscriber One: 1"
//   "Subscriber Two: 1"
// */
// const subscribe = example.subscribe(val =>
//   console.log(`Subscriber One: ${val}`)
// );
// const subscribeTwo = example.subscribe(val =>
//   console.log(`Subscriber Two: ${val}`)
// );

// // 5秒后调用 connect，这会使得 source 开始发出值
// setTimeout(() => {
//   example.connect();   // 通过connect开始多播
// }, 5000);

// 25  多播  multicast
// RxJS v6+
// import { Subject } from 'rxjs';
// import { tap, multicast } from 'rxjs/operators';

// // 每2秒发出值并只取前5个
// const source = interval(2000).pipe(take(5));

// const example = source.pipe(
//   // 因为我们在下面进行了多播，所以副作用只会调用一次
//   tap(() => console.log('Side Effect #1')),
//   mapTo('Result!')
// );


// // 使用 subject 订阅 source 需要调用 connect() 方法
// const multi = example.pipe(multicast(() => new Subject()));
// /*
//   多个订阅者会共享 source 
//   输出:
//   "Side Effect #1"
//   "Result!"
//   "Result!"
//   ...
// */
// const subscriberOne = multi.subscribe(val => console.log(val));
// const subscriberTwo = multi.subscribe(val => console.log(val));
// // 使用 subject 订阅 source
// multi.connect();

// 26  多播  share
// import { tap, share } from 'rxjs/operators';

// // 1秒后发出值
// const source = timer(1000);
// // 输出副作用，然后发出结果
// const example = source.pipe(
//   tap(() => console.log('***SIDE EFFECT***111')),
//   mapTo('***RESULT***222')
// );

// /*
//   ***不共享的话，副作用会执行两次***
//   输出: 
//   "***SIDE EFFECT***"
//   "***RESULT***"
//   "***SIDE EFFECT***"
//   "***RESULT***"
// */
// const subscribe = example.subscribe(val => console.log(val));
// const subscribeTwo = example.subscribe(val => console.log(val));

// // 在多个订阅者间共享 observable
// const sharedExample = example.pipe(share());
// /*
//    ***共享的话，副作用只执行一次***
//   输出:
//   "***SIDE EFFECT***"
//   "***RESULT***"
//   "***RESULT***"
// */
// const subscribeThree = sharedExample.subscribe(val => console.log(val));
// const subscribeFour = sharedExample.subscribe(val => console.log(val));

// 27  多播  shareReplay
// import { Subject } from 'rxjs/Subject';
// import { ReplaySubject } from 'rxjs/ReplaySubject';
// import { pluck, share, shareReplay, tap } from 'rxjs/operators';

// const routeEnd = new Subject<{data: any, url: string}>()

// const lastUrl = routeEnd.pipe(
//     tap(_ => console.log('executed')),
//     pluck('url'),          // 选择属性来发出
//     shareReplay(1)         // 共享源 observable 并重放指定次数的发出。
// )
// // 起始订阅者是必须的
// const initialSubscriber = lastUrl.subscribe(console.log)
// // 模拟路由变化
// // 输出: 'executed', 'my-path'
// routeEnd.next({data: {}, url: 'my-path'});
// // 输出: 'my-path'
// const lastSubscriber = lastUrl.subscribe(console.log)
// lastSubscriber.unsubscribe()
// routeEnd.next({data: {}, url: 'my-path2'});
// const last2Subscriber = lastUrl.subscribe(console.log)
// const clicks = fromEvent(document.getElementsByTagName('h1'), 'click');
// clicks.subscribe(val => lastUrl.subscribe(console.log))

// 28 过滤 dedounce

// import { debounce } from 'rxjs/operators';

// // 发出四个字符串
// // const example = of('WAIT', 'ONE', 'SECOND', 'Last will display');
// // const debouncedExample = example.pipe(debounce(() => timer(1000)));
// const source = interval(1000)
// const dedounceTwo = source.pipe(debounce((val) => timer(val * 200)))

// // const subscribe = debouncedExample.subscribe(val => console.log(val))
// // const subscribeWwo = source.subscribe(val => console.log(val))
// const subscribeTwo = dedounceTwo.subscribe(val => console.log(`Example Two: ${val}`))

// import { debounceTime } from 'rxjs/operators';

// const inputTo = document.getElementsByTagName('input')[0]

// // 对于每次键盘敲击，都将映射成当前输入值
// const example = fromEvent(inputTo, 'keyup').pipe(map((i: any) => i.currentTarget.value));

// // 在两次键盘敲击之间等待0.5秒方才发出当前值，
// // 并丢弃这0.5秒内的所有其他值
// const debouncedInput = example.pipe(debounceTime(500)); // 丢弃0 - 0.5秒之间输入的值

// // 输出值
// const subscribe = debouncedInput.subscribe((val: any) => {
//   console.log(`Debounced Input: ${val}`);
// });

// 29 过滤 distinctUntilChanged
// import { distinctUntilChanged } from 'rxjs/operators';

// const myArrayWithDuplicatesInARow = from([1, 1, 2, 2, 3, 1, 2, 3]);  // 将数组，promise，Map迭代器的值转换为observable
// // distinctUntilChanged，让当前值与前一个值相比较，不相同时才发出
// const example = myArrayWithDuplicatesInARow.pipe(distinctUntilChanged()).subscribe({next: (val) => console.log(val)})

// 30 过滤 filter

// const source = of(1,2,3,4,5)
// // 发出符合给定条件的值，过滤出偶数
// const example = source.pipe(filter((val: number) => val % 2 === 0)).subscribe({next: (val: any) => console.log(val)})

// 31 过滤 first  <==>  last
// import { first } from 'rxjs/operators';

// const source = from([1, 2, 3, 4, 5]);
// // 没有参数则发出第一个值
// // const example = source.pipe(first());  // 发出第一个值，或者是给定的值
// // 输出: "First value: 1"
// // const example = source.pipe(first(num => num % 5 === 0))  // 发出符合条件表达式的值
// const example = source.pipe(first(num => num > 5, 'Nothing'))  // 不符合条件就发出默认值
// const subscribe = example.subscribe(val => console.log(`First value: ${val}`));

// 31 过滤 sample
// import { sample } from 'rxjs/operators';

// // 每秒发出一个值
// const source = interval(1000);
// // 获取每两秒对源observable 最新发出的值
// const example = source.pipe(sample(interval(2000)))
// const subscribe = example.subscribe({next: (val: any) => console.log(val)})
// let a =4;
// console.assert(a === 3, "a 的值不是3！");

// 31 过滤 single
// import { single } from 'rxjs/operators';

// const source = from([1,2,3,4,5,6])
// // 发出通过表达式的单一项
// const example = source.pipe(single(val => val === 5));
// const subscribe = example.subscribe(val => console.log(val))

// 32 过滤 skip
// import { skip,skipUntil,skipWhile  } from 'rxjs/operators';

// // 每1秒发出值
// const source = interval(1000);
// // const example = source.pipe(skip(5)) 
// // const example = source.pipe(skipUntil(timer(5000))) 
// // const example = source.pipe(skipWhile(val => val < 5))  // 跳过observable发出的值，知道提供的表达式结果为false
// //  跳过N个(由参数提供)发出值。
// // 5，6，7，8.....
// const example = source.pipe(take(2))    // 只取完成的前2个值，由参数决定
// const subscribe = example.subscribe(val => console.log(val))

// 33 过滤 throttle 节流
// import { throttle,throttleTime  } from 'rxjs/operators';

// const source = interval(1000);
// // const example = source.pipe(throttle(val => interval(2000)))
// // 抑制2秒中的值
// // 发出0,3,6,9
// const example = source.pipe(throttleTime(2000))
// // 经过2秒后发出最新值
// // 发出0,3,6,9
// const subscribe = example.subscribe(val => console.log(val))

// 34 转换
// 1 buffer
// import { buffer, bufferCount,bufferTime,bufferToggle } from 'rxjs/operators';

// const myInterval = interval(1000);
// const bufferBy = fromEvent(document, 'click');
// // const myBufferedInterval = myInterval.pipe(buffer(bufferBy));
// // buffer 收集输出值，直到调用事件执行时，输出缓存的值

// // const myBufferedInterval = myInterval.pipe(bufferCount(3));
// // bufferCount 收集输出值，达到指定数量后，输出缓存的值

// // const myBufferedInterval = myInterval.pipe(bufferTime(3000, 1000));
// // bufferTime 收集输出值，达到指定时间后，输出缓存的值.......第二个参数表示合适开启下一个缓冲区

// const subscribe = myBufferedInterval.subscribe(val => console.log(val))
// let i = 0;
// let arr: Array<number> = [];
// setInterval(() => {
//     arr.push(i);
//     if (arr.length === 3) {
//         console.log(arr);
//         arr = [];
//     };
//     i++;
// }, 1000);

// import { concatMap, delay, mergeMap } from 'rxjs/operators';

// // 发出延迟值
// const source = of(2000, 1000);
// // 将内部 observable 映射成 source，当前一个完成时发出结果并订阅下一个
// const example = source.pipe(
//   concatMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))  // 将值映射成内部 observable，并按顺序订阅和发出
// );
// // 输出: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
// const subscribe = example.subscribe(val =>
//   console.log(`With concatMap: ${val}`)
// );

// import { concatMapTo, delay } from 'rxjs/operators';

// // 每2秒发出值
// const sampleInterval = interval(500).pipe(take(5));
// const fakeRequest = of('Network request complete').pipe(delay(3000));
// // 前一个完成才会订阅下一个
// const example = sampleInterval.pipe(concatMapTo(fakeRequest));
// // 结果
// // 输出: Network request complete...3s...Network request complete'
// const subscribe = example.subscribe(val => console.log(val));

// groupBy   分组
// import { groupBy, mergeMap, toArray } from 'rxjs/operators';
// const people = [
//     { name: 'Sue', age: 25 },
//     { name: 'Joe', age: 30 },
//     { name: 'Frank', age: 25 },
//     { name: 'Sarah', age: 35 }
//   ];
// const source = from(people);
// const example = source.pipe(
//     groupBy(val => val.age)  // 按照people中每个对象的age进行分组
//     ,mergeMap(group => group.pipe(toArray()))  // 为每个分组返回一个数组
// )
// const subscribe = example.subscribe(val => console.log(val))

// partition 分割
// import { merge } from 'rxjs';
// import { partition } from 'rxjs/operators';

// const source = from([1, 2, 3, 4, 5, 6]);
// // 第一个值(events)返回 true 的数字集合，第二个值(odds)是返回 false 的数字集合
// const [evens, odds] = source.pipe(partition((val: number ) => val % 2 === 0));
// const subscribe = merge(
//     evens.pipe(map(val => `Even: ${val}`)),
//     odds.pipe(map(val => `Odds: ${val}`))
// ).subscribe(val => console.log(val))

// reduce  将多个值归并为单个值
// import { reduce } from 'rxjs/operators';

// const source = of(1, 2, 3, 4);
// const example = source.pipe(reduce((one: number,two: number) => one * two))
// const subscribe = example.subscribe(val => console.log('Sum:', val));


// switchMap 具有取消上一个observable的操作，并在之前完成前一个内部observable
// import { switchMap } from 'rxjs/operators';

// // 立即发出值， 然后每5秒发出值
// const source = timer(0, 5000);
// // 当 source 发出值时切换到新的内部 observable，发出新的内部 observable 所发出的值
// const example = source.pipe(switchMap(() => interval(500)));
// // 输出: 0,1,2,3,4,5,6,7,8,9...0,1,2,3,4,5,6,7,8
// const subscribe = example.subscribe(val => console.log(val));

// import { window } from 'rxjs/operators';

// // 立即发出值，然后每秒发出值
// const source = timer(0, 1000);
// const example = source.pipe(window(interval(3000)));
// const count = example.pipe(scan((acc, curr) => acc + 1, 0));
// const subscribe = count.subscribe(val => console.log(`Window ${val}:`));
// const subscribeTwo = example
//   .pipe(mergeAll())
//   .subscribe(val => console.log(val));

import { windowCount, tap } from 'rxjs/operators';

// // 每1秒发出值
// const source = interval(1000);
// const example = source.pipe(
//   // 每发出4个值就开启新窗口
//   windowCount(4),
//   tap(_ => console.log('NEW WINDOW!'))
// );

// const subscribeTwo = example
//   .pipe(
//     // 窗口发出嵌套的 observable
//     mergeAll()

//   )
//   .subscribe(val => console.log(val));

  const source = of(1, 2, 3, 4, 5);
// 使用 tap 透明地打印 source 中的值
const example = source.pipe(
  tap(val => console.log(`BEFORE MAP: ${val}`)),
  map(val => val + 10),
  tap(val => console.log(`AFTER MAP: ${val}`))
);

// 'tap' 并不转换值
// 输出: 11...12...13...14...15
const subscribe = example.subscribe(val => console.log(val));