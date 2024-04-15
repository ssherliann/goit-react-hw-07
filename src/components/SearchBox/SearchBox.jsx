import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice'; 
import styles from "./SearchBox.module.css";

export default function SearchBox() {
    const dispatch = useDispatch();
    const inputValue = useSelector(selectNameFilter);

    const handleChange = (event) => {
        dispatch(changeFilter({ inputValue: event.currentTarget.value }));
    };

    return (
        <div className={styles.searchForm}>
            <label>Find contacts by name</label>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
}



