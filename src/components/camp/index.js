import { useContext } from 'react';
import CampIcon from './camp-table.png';
import './style.css';
import GoodsContext from '../../context/goods.context';

const CampComponent = () => {
 const { removeAllGoods } = useContext(GoodsContext);

 const campClick = () => {
  removeAllGoods();
 };

 return (
  <div className="camp">
   <img src={CampIcon} onClick={campClick} />
  </div>
 );
};

export default CampComponent;