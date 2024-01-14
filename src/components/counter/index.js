import React, { useContext } from 'react';
import './style.css';
import './style_camp.css';
import CampIcon from '../counter/camp-table.png';
import GoodsContext from '../../context/goods.context';
import GoodsComponent from '../goods';

const CounterComponent = () => {
  const { removeAllGoods, selectedGoods, removeGoods } = useContext(GoodsContext);

  const sum = selectedGoods.reduce((acc, cur) => acc + cur.cost, 0);

  const campClick = () => {
    if (sum >= 40) {
      removeAllGoods();
    }
  };

  const findBestCombination = (data) => {
    let bestSum = Infinity;
    let bestCombination = [];

    const generateCombinations = (startIndex, currentCombination, currentSum) => {
      if (currentSum >= 40 && currentSum <= bestSum) {
        bestSum = currentSum;
        bestCombination = currentCombination.slice();
      }

      if (currentSum >= 40 || startIndex >= data.length) {
        return;
      }

      for (let i = startIndex; i < data.length; i++) {
        const newCombination = currentCombination.concat(data[i]);
        const newSum = currentSum + data[i];
        generateCombinations(i + 1, newCombination, newSum);
      }
    };

    generateCombinations(0, [], 0);
    return bestCombination;
  };

  const autoDetectBestCombination = () => {
    const data = selectedGoods.map(item => item.cost);
    const bestCombination = findBestCombination(data);
    console.log('Найкраща комбінація:', bestCombination);

    if (bestCombination.length > 0) {
      const itemsToRemove = selectedGoods.filter(item => !bestCombination.includes(item.cost));
      itemsToRemove.forEach(item => removeGoods(item));
    }
  };



  const handleAutoDetect = () => {
    autoDetectBestCombination();
  };

  return (
    <>
      <div className='cost-wrapper'>
        <div>{sum}/40</div>
        <div className='auto-detect' onClick={handleAutoDetect}>auto-detect</div>
        <div className='selected-goods'>
          {selectedGoods.map(el => <GoodsComponent {...el} key={'selected' + el.id} />)}
        </div>
      </div>
      <div className="camp">
        <img src={CampIcon} onClick={campClick} />
      </div>
    </>
  );
};

export default CounterComponent;
