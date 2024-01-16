import type {ListBoxItemProps, SelectProps, ValidationResult} from 'react-aria-components';
import {Button, FieldError, Label, ListBox, ListBoxItem, Popover, Select, SelectValue, Text} from 'react-aria-components';

interface MySelectProps<T extends object>
  extends Omit<SelectProps<T>, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function MySelect<T extends object>(
  { label, description, errorMessage, children, items, ...props }:
    MySelectProps<T>
) {
  return (
    <Select {...props}
    className="peer mt-1 mb-5 py-2 ps-3 block w-full bg-[#EFEAE4] border-transparent rounded  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-[#262019] dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
    // className='mt-1 mb-5 w-full cursor-default rounded bg-white py-2 px-3 text-left shadow focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'
    >
    {/* <Select {...props} className='mt-1 mb-5 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'> */}
      <Label>{label}</Label>
      <Button
    //   className='mt-1 mb-5 w-full border cursor-default rounded bg-white py-2 px-3 text-left shadow focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'
      >
      <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover 
    //   className='mt-1 py-2 px-3 rounded bg-white text-base shadow ring-1 ring-black/5 focus:outline-none sm:text-sm'
      
      >
        <ListBox className='mt-1 py-1 px-3 rounded bg-white text-base shadow focus:outline-none sm:text-sm' items={items}>
          {children}
        </ListBox>
      </Popover>
    </Select>
  );
}

function MyItem(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocused, isSelected }) =>
        `my-item ${isFocused ? 'focused' : ''} ${isSelected ? 'selected' : ''}`}
    />
  );
}

<MySelect label="Ice cream flavor">
  <MyItem>Chocolate</MyItem>
  <MyItem>Mint</MyItem>
  <MyItem>Strawberry</MyItem>
  <MyItem>Vanilla</MyItem>
</MySelect>