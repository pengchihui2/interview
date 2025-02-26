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