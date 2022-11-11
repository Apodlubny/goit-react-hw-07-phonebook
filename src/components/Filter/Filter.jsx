import {
  FilterWrapper,
  FilterInput,
  FilterLabel,
} from 'components/Filter/Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from 'redux/filterSlice';
import { selectStatusFilter } from 'redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectStatusFilter);

  const onFilterChange = e => {
    dispatch(updateFilter(e.currentTarget.value));
  };
  return (
    <FilterWrapper>
      <FilterLabel htmlFor="text">Find contacts by name</FilterLabel>
      <FilterInput
        type="text"
        name="filter"
        value={filter}
        onChange={onFilterChange}
      />
    </FilterWrapper>
  );
};
