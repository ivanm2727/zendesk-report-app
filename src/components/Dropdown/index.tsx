import React, { useRef, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { Item, Menu, Label, Field, Dropdown, Autocomplete, Multiselect } from '@zendeskgarden/react-dropdowns';
import { Col } from '@zendeskgarden/react-grid';
import { Tag } from '@zendeskgarden/react-tags';

interface IDropdownProps {
  title: string,
  options: string[],
  isMultiselectField: boolean,
  handleOnSelectItem?: any,
  handleOnSelectItems?: any
}


const DropdownField = (props: IDropdownProps) => {
  const { title, options } = props;
  const [selectedItem, setSelectedItem] = useState(options[0]);
  const [selectedItems, setSelectedItems] = useState([options[0]]);
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

  const renderOptions = () => {

    if (matchingOptions.length === 0) {
      return <Item disabled>No matches found</Item>;
    }

    return matchingOptions.map(option => (
      <Item key={option} value={option}>
        <span>{option}</span>
      </Item>
    ));
  };
  
  useEffect(() => {
    filterMatchingOptionsRef.current(inputValue);
  }, [inputValue]);

  const renderDrodpwon = () => {
    return (
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
    )
  }
  const renderMultiselectField = () => {
    return (
      <Dropdown
        inputValue={inputValue}
        selectedItems={selectedItems}
        onSelect={items => {
          setSelectedItems(items)
          props.handleOnSelectItems(items)
        }}
        downshiftProps={{ defaultHighlightedIndex: 0 }}
        onInputValueChange={value => setInputValue(value)}
      >
        <Field>
          <Label>{props.title}</Label>
          <Multiselect
            renderItem={({ value, removeValue }: any) => (
              <Tag>
                <span>{value}</span>
                <Tag.Close onClick={() => removeValue()} />
              </Tag>
            )}
          />
        </Field>
        <Menu>{renderOptions()}</Menu>
      </Dropdown>
    )
  }

  return (
    //<Row justifyContent="end">
      <Col size={3}>

        {props.isMultiselectField && renderMultiselectField() 
          ||
          renderDrodpwon()
        } 
        

      
    </Col>
    //</Row>
  );
};

export default DropdownField;