import { useState } from 'react';
import { RootState } from '../redux/store';
import { UserDetails } from "./userDetails";
import { FacePalette } from "./facePalette";
import { UserTabs } from "./UserTabs";
import '../styles/skinDetection.css';
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from '../ThemeContext';
import { ColorAnalysis } from './colorAnalysis';
import { ProductRecommendations } from './productRecommendations';
import { MobileNav } from './MobileNav';
import { displayBoard } from '../reducers/utilSlice';
import { CategoryOut } from '../interfaces/productInterface';

const BOARD_TABS = ['Colours', 'Makeup', 'Products'];

/**
 * Main results dashboard: left panel with the user's detected tone/palette
 * and tabs, plus a content area that swaps between the ColorAnalysis and
 * ProductRecommendations boards. Also renders the mobile nav drawer, which
 * mirrors the same board switching and product filtering for small screens.
 */
export const SkinDetection = () => {
  const dispatch = useDispatch();
  const imageData = useSelector((state: RootState) => state.imageReducer.imageData);
  const showBoard = useSelector((state: RootState) => state.utilsReducer.showBoard);
  const { theme, toggleTheme } = useTheme();

  const { colorCode, skinTone, colorPalette, profile } = imageData.data;
  const activeBoard = showBoard || 'Colours';

  // Lifted so the mobile drawer can show/select product category filters
  // that would otherwise be trapped inside ProductRecommendations' local state.
  const [productFilter, setProductFilter] = useState('All');
  const [productCategories, setProductCategories] = useState<CategoryOut[]>([]);

  // Renders the currently active board (Colours/Makeup share ColorAnalysis; Products gets its own view).
  const getBoard = () => {
    if (activeBoard === 'Products') {
      return (
        <ProductRecommendations
          selectedFilter={productFilter}
          onSelectedFilterChange={setProductFilter}
          onCategoriesLoaded={setProductCategories}
        ></ProductRecommendations>
      );
    }
    return <ColorAnalysis></ColorAnalysis>;
  }

  // Builds the "All" + per-category filter list (with counts) shown in the mobile drawer,
  // only relevant once product categories have loaded on the Products board.
  const productFilters = activeBoard === 'Products'
    ? [
      { key: 'all', label: 'All', count: productCategories.reduce((sum, c) => sum + c.products.length, 0) },
      ...productCategories.map((c) => ({ key: c.key, label: c.label, count: c.products.length })),
    ]
    : undefined;

  return (
    //Use reusable cards for better structure.
    <div className="skin-detection-shell">
      <div className="left-panel-card">
        <UserDetails colorCode={colorCode} skinTone={skinTone} undertone={profile.undertone}></UserDetails>
        <FacePalette colorPalette={colorPalette}></FacePalette>
        <UserTabs></UserTabs>
        <button className="theme-toggle" onClick={toggleTheme}>
          <svg className="theme-toggle-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M9 5.8A4 4 0 1 1 5.2 2a3 3 0 0 0 3.8 3.8z"></path>
          </svg>
          <span className="theme-toggle-label">{theme === 'light' ? 'Dark' : 'Light'} mode</span>
        </button>
      </div>
      <MobileNav
        skinTone={skinTone}
        colorCode={colorCode}
        undertone={profile.undertone}
        colorPalette={colorPalette}
        boards={BOARD_TABS}
        activeBoard={activeBoard}
        onSelectBoard={(board) => dispatch(displayBoard(board))}
        theme={theme}
        onToggleTheme={toggleTheme}
        productFilters={productFilters}
        selectedProductFilter={productFilter}
        onSelectProductFilter={setProductFilter}
      ></MobileNav>
      <div className="board-content">
        {getBoard()}
      </div>
    </div>
  )
}