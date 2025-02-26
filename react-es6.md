# 技术范围
es6 react

# 笔试题
```bash

## 封装一个开关Switch
const useSwitch = (initialState = false) => {
    const [state, setState] = useState(initialState);

    const turnOn = () => setState(true);
    const turnOff = () => setState(false);
    const toggle = () => setState(prevState => !prevState);

    return { state, turnOn, turnOff, toggle };
};

const Switch = ({ initialState= false }) => {
    const { state, turnOn, turnOff, toggle } = useSwitch(initialState ?? false);
    return (
        <div
            onClick={toggle}
            style={{
                cursor: 'pointer',
                padding: '10px',
                backgroundColor: state ? 'green' : 'red',
                color: 'white',
                textAlign: 'center',
                borderRadius: '5px',
                transition: 'background-color 0.3s ease',
            }}
        >
            {state ? 'ON' : 'OFF'}
        </div>
    );
};

## useEffect作用及参数用途
中文官网：https://zh-hans.react.dev/reference/react/useEffect
useEffect 是 React 中的一个 Hook，用于处理副作用（side effects）。副作用是指组件渲染时需要执行的操作，例如数据获取、订阅、手动修改 DOM、设置定时器等。
参数说明
1. 第一个参数：副作用函数
功能：定义副作用逻辑的函数。该函数将在组件渲染后执行。
返回值：可选的清理函数，用于清理副作用，例如取消订阅、清除定时器等。
2. 第二个参数：依赖数组
功能：指定副作用函数的依赖项，只有在这些依赖项发生变化时，副作用函数才会重新执行。
行为：
如果没有依赖数组，副作用函数将在每次组件渲染后执行。
如果依赖数组为空 []，副作用函数只会在组件挂载和卸载时执行一次。
如果依赖数组包含特定的值，副作用函数将在这些值发生变化时执行。

const DataFetchingComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
         // 当 count 变化时执行
        const fetchData = async () => {
            const response = await fetch('https://api.example.com/data');
            const result = await response.json();
            setData(result);
        };

        fetchData();
        
    }, []); // 仅在组件挂载时执行

    return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
};

## promise 请求三个api，第一个api的结果作为第二个api的参数，第一个第二个的结果作为第三个api请求的参数，使用promise处理，typescript
// 定义数据类型
interface Api1Response {
    someValue: string; // 假设是字符串类型
}

interface Api2Response {
    anotherValue: string; // 假设是字符串类型
    extraValue: string;   // 假设是字符串类型
}

interface Api3Response {
    result: string; // 假设是字符串类型
}

// 请求第一个 API
const fetchDataFromAPI1 = (): Promise<Api1Response> => {
    return fetch('https://api.example.com/data1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data from API 1');
            }
            return response.json();
        });
};

// 请求第二个 API
const fetchDataFromAPI2 = (param: string): Promise<Api2Response> => {
    return fetch(`https://api.example.com/data2?param=${param}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data from API 2');
            }
            return response.json();
        });
};

// 请求第三个 API
const fetchDataFromAPI3 = (param1: string, param2: string): Promise<Api3Response> => {
    return fetch(`https://api.example.com/data3?param1=${param1}&param2=${param2}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data from API 3');
            }
            return response.json();
        });
};

// 主函数
const fetchData = () => {
    fetchDataFromAPI1()
        .then(data1 => {
            console.log('Data from API 1:', data1);
            return fetchDataFromAPI2(data1.someValue); // 使用第一个 API 的结果作为参数
        })
        .then(data2 => {
            console.log('Data from API 2:', data2);
            // 使用第二个 API 的结果和第一个 API 的结果作为第三个 API 的参数
            return fetchDataFromAPI3(data2.anotherValue, data2.extraValue);
        })
        .then(data3 => {
            console.log('Data from API 3:', data3);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

// 调用主函数
fetchData();

## 七个商品一行显示四个

import React from 'react';
import styles from './styles.module.css';

const Test: React.FC = () => {
  const products = [
    { name: '商品1', price: 100 },
    { name: '商品2', price: 200 },
    { name: '商品3', price: 300 },
    { name: '商品4', price: 400 },
    { name: '商品5', price: 500 },
    { name: '商品6', price: 600 },
    { name: '商品7', price: 700 },
  ];

  return (
    <div className={styles.container}>
      <h1>商品展示</h1>
      <div className={styles.productGrid}>
        {products.map((product, index) => (
          <div className={styles.product}>
            <h2>{product.name}</h2>
            <p>价格: ¥{product.price.toFixed(2)}</p>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Test;

 .container {
    text-align: center;
    padding: 20px;
  }
  
  .productGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap:10px ;
    justify-items: center;
  }
  
  .product {
    place-self: center center;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: rgb(98, 192, 199);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

## 组件有那几种传参方式
  ### props: 通过父组件将数据传递给子组件
// 父组件
const ParentComponent = () => {
  const name = "John";
  return <ChildComponent name={name} />;
};

// 子组件
const ChildComponent = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

### State: 组件可以有自己的状态，使用 useState 钩子管理状态

import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

### Context API: 通过 Context API 在组件树中传递数据
import React, { createContext, useContext } from 'react';

// 创建上下文
const MyContext = createContext();

const ParentComponent = () => {
  return (
    <MyContext.Provider value="Hello from Context">
      <ChildComponent />
    </MyContext.Provider>
  );
};

const ChildComponent = () => {
  const value = useContext(MyContext);
  return <h1>{value}</h1>;
};
### Refs: 使用 useRef 或 createRef 获取对 DOM 元素的引用
import React, { useRef } from 'react';

const FocusInput = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};

### 回调函数: 父组件将函数作为 props 传递给子组件，子组件调用该函数传递数据回父组件
const ParentComponent = () => {
  const handleData = (data) => {
    console.log("Received data:", data);
  };

  return <ChildComponent onData={handleData} />;
};

const ChildComponent = ({ onData }) => {
  return <button onClick={() => onData("Some data")}>Send Data</button>;
};

### Redux 或其他状态管理库
mport { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Redux reducer
const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
};

const store = createStore(reducer);

## promise泛型及识别类型
// 自定义的通用 Promise 接口，带泛型约束
interface CustomPromise<T, U extends string> {
  (input: U): Promise<T>;
}

// 定义新闻数据的类型
interface NewsArticle {
  title: string;
  description: string;
  url: string;
}

// 示例函数，使用自定义的 Promise 接口
const fetchNews: CustomPromise<NewsArticle[], string> = (keyword) => {
  const apiKey = 'YOUR_API_KEY'; // 替换为你的 API 密钥

  return new Promise((resolve, reject) => {
    fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&apiKey=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          return reject(new Error('Network response was not ok'));
        }
        return response.json();
      })
      .then(data => {
        const articles: NewsArticle[] = data.articles.map((article: any) => ({
          title: article.title,
          description: article.description,
          url: article.url,
        }));
        resolve(articles);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// 使用示例
const displayNews = (keyword: string) => {
  fetchNews(keyword)
    .then(articles => {
      articles.forEach(article => {
        console.log(`Title: ${article.title}`);
        console.log(`Description: ${article.description}`);
        console.log(`URL: ${article.url}`);
        console.log('---');
      });
    })
    .catch(error => {
      console.error('Error fetching news:', error);
    });
};

// 调用示例
displayNews('JavaScript');

## typescript泛型用途
 ###提高代码的可重用性
 function identity<T>(arg: T): T {
  return arg;
}

// 使用泛型
const result1 = identity<string>("Hello");
const result2 = identity<number>(123);
 ###类型安全
 interface Box<T> {
  content: T;
}

const stringBox: Box<string> = { content: "Hello" }; // 类型安全
const numberBox: Box<number> = { content: 123 }; // 类型安全
 ###约束类型
 function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

console.log(getLength("Hello")); // 输出: 5
console.log(getLength([1, 2, 3])); // 输出: 3
 ###在类中使用泛型
 class GenericList<T> {
  private items: T[] = [];

  add(item: T) {
    this.items.push(item);
  }

  get(index: number): T {
    return this.items[index];
  }
}

const list = new GenericList<number>();
list.add(1);
list.add(2);
console.log(list.get(0)); // 输出: 1
 ###在接口中使用泛型
 interface Pair<K, V> {
  key: K;
  value: V;
}

const pair: Pair<number, string> = { key: 1, value: "One" };
 ###与其他类型结合
 function combine<T, U>(a: T, b: U): T & U {
  return { ...a, ...b };
}

const combined = combine({ name: "Alice" }, { age: 30 });

## typescript = 与==与===区别
 ### = 赋值运算符 ：将右侧的值赋给左侧的变量 
 let a = 5; // 将 5 赋值给变量 a
 ### == 相等运算符（宽松相等） 比较两个值是否相等，但在比较之前会进行类型转换（强制类型转换）
 console.log(5 == '5'); // 输出: true，因为字符串 '5' 被转换为数字 5
 console.log(null == undefined); // 输出: true
 ### ===严格相等运算符 比较两个值是否相等，同时不进行类型转换。如果类型不同，返回 false

```
 ## typescript常使用
  ### 模板字符串
  let myName: string = 'Tom';
  let myAge: number = 25;
  let sentence: string = `Hellomy name is ${myName}.I'll be ${myAge + 1} years old next month.`;
  ### 联合类型
  let myFavoriteNumber: string | number;
  ### 数组泛型
  let fibonacci: Array<number> = [1, 1, 2, 3, 5];
  let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
  ### 可选参数、默认值、剩余参数
  function buildName(firstName?: string, lastName: string = 'My') {
    if (firstName) {
        return firstName + ' ' + lastName;
    } else {
        return lastName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName(undefined, 'Tom');

function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
    });
}
