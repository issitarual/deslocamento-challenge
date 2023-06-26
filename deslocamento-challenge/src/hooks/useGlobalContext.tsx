import { GlobalContext } from '../helpers/GlobalContext';
import { useContext } from 'react';

export const useGlobalContext = () => useContext(GlobalContext);