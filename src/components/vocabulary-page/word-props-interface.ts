/* eslint-disable no-unused-vars */
import { paginatedWord } from '../../constants/interfaces';

interface IwordProps {
  obj: paginatedWord,
  isLanguageRU: boolean,
  choise: (res: string) => void,
}

export default IwordProps;
