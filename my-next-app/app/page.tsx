'use client'

import React, { useState } from 'react';

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

const fetchDataFromAPI1 = () => {
  return new Promise((resolve, reject) => {
      fetch('https://api.example.com/data1')
          .then(response => {
              if (!response.ok) {
                  reject(new Error('Failed to fetch data from API 1'));
              }
              return response.json();
          })
          .then(data => resolve(data))
          .catch(error => reject(error));
  });
};

const fetchDataFromAPI2 = (param) => {
  return new Promise((resolve, reject) => {
      fetch(`https://api.example.com/data2?param=${param}`)
          .then(response => {
              if (!response.ok) {
                  reject(new Error('Failed to fetch data from API 2'));
              }
              return response.json();
          })
          .then(data => resolve(data))
          .catch(error => reject(error));
  });
};

const fetchDataFromAPI3 = (param1, param2) => {
  return new Promise((resolve, reject) => {
      fetch(`https://api.example.com/data3?param1=${param1}&param2=${param2}`)
          .then(response => {
              if (!response.ok) {
                  reject(new Error('Failed to fetch data from API 3'));
              }
              return response.json();
          })
          .then(data => resolve(data))
          .catch(error => reject(error));
  });
};

const fetchData = () => {
  fetchDataFromAPI1()
      .then(data1 => {
          console.log('Data from API 1:', data1);
          return fetchDataFromAPI2(data1.someValue); // 使用第一个 API 的结果作为第二个 API 的参数
      })
      .then(data2 => {
          console.log('Data from API 2:', data2);
          // 使用第二个 API 的结果和第一个 API 的结果作为第三个 API 的参数
          return fetchDataFromAPI3(data2.anotherValue, data2.extraValue); // 假设有两个参数
      })
      .then(data3 => {
          console.log('Data from API 3:', data3);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
};

// 调用函数
fetchData();

// 使用示例
const App = () => {
    return (
        <div>
            <h1>Switch Example</h1>
            <Switch initialState={false} />
        </div>
    );
};

export default App;