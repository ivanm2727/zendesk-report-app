import React, { useRef, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { Item, Menu, Label, Field, Dropdown, Autocomplete } from '@zendeskgarden/react-dropdowns';
import { Col } from '@zendeskgarden/react-grid';

interface IDropdownProps {
  title: string,
  options: string[],
  handleOnSelectItem: any
}


const DropdownField = (props: IDropdownProps) => {
  const { title, options } = props;
  const [selectedItem, setSelectedItem] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');
  const [matchingOptions, setMatchingOptions] = useState(options);

  /**
   * Debounce filtering
   */
  const filterMatchingOptionsRef = useRef(
    debounce((value: string) => {
      const matchedOptions = options.filter(
        option => option.trim().toLowerCase().indexOf(value.trim().toLowerCase()) !== -1
      );

      setMatchingOptions(matchedOptions);
    }, 300)
  );
  
  useEffect(() => {
    filterMatchingOptionsRef.current(inputValue);
  }, [inputValue]);

  return (
    //<Row justifyContent="end">
      <Col size={3}>
        <Dropdown
          inputValue={inputValue}
          selectedItem={selectedItem}
          onSelect={(item: string) => {
            setSelectedItem(item)
            props.handleOnSelectItem(item)
          }}
          onInputValueChange={value => setInputValue(value)}
          downshiftProps={{ defaultHighlightedIndex: 0 }}
        >
          <Field>
            <Label>{title}</Label>
            <Autocomplete>{selectedItem}</Autocomplete>
          </Field>
          <Menu>
            {matchingOptions.length ? (
              matchingOptions.map(option => (
                <Item key={option} value={option}>
                  <span>{option}</span>
                </Item>
              ))
            ) : (
              <Item disabled>No matches found</Item>
            )}
          </Menu>
        </Dropdown>
      </Col>
    //</Row>
  );
};

export default DropdownField;