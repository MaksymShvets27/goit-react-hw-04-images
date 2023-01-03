import PropsTypes from 'prop-types';
import { useState } from 'react';
import css from './Seachbar.module.css';

const Seachbar = ({ onSubmit }) => {
  const [currentSeachValue, setCurrentSeachValue] = useState('');

  const seachbarSubmit = event => {
    event.preventDefault();
    onSubmit(currentSeachValue);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SeacrhForm}>
        <button type="submit" className={css.Button} onClick={seachbarSubmit}>
          <span className={css.ButtonLabel}>Search</span>
        </button>

        <input
          className={css.Input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={event => setCurrentSeachValue(event.target.value)}
        />
      </form>
    </header>
  );
};

Seachbar.propTypes = { onSubmit: PropsTypes.func.isRequired };

export default Seachbar;
