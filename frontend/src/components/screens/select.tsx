import { ChevronDown } from "lucide-react"
import {
  Select as AriaSelect,
  SelectProps as AriaSelectProps,
  Button,
  Label,
  ListBox,
  SelectValue,
  ValidationResult,
} from "react-aria-components"
import { tv } from "tailwind-variants"
// import { Description, FieldError, Label } from './Field';
// import { composeTailwindRenderProps, focusRing } from './utils';
import { Popover } from "./Popover"
import { Description, FieldError } from "./react-aria/Field"
import { composeTailwindRenderProps, focusRing } from "./react-aria/utils"

const styles = tv({
  extend: focusRing,
  base: "flex items-center text-start gap-4 w-full cursor-default dark:border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-none rounded pl-3 pr-2 py-2 min-w-[150px] transition bg-[#EFEAE4] dark:bg-[#262019]",
  variants: {
    isDisabled: {
      false:
        "text-gray-800 dark:text-zinc-300 hover:bg-gray-100 pressed:bg-gray-200 dark:hover:bg-zinc-600 dark:pressed:bg-zinc-500 group-invalid:border-red-600 forced-colors:group-invalid:border-[Mark]",
      true: "text-gray-200 dark:text-zinc-600 forced-colors:text-[GrayText] dark:bg-zinc-800 dark:border-white/5 forced-colors:border-[GrayText]",
    },
  },
})

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "children"> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  items?: Iterable<T>
  children: React.ReactNode | ((item: T) => React.ReactNode)
}

export function Select<T extends object>({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group flex flex-col gap-1"
      )}
    >
      {label && <Label>{label}</Label>}
      <Button className={styles}>
        <SelectValue className="flex-1 text placeholder-shown:italic" />
        <ChevronDown
          aria-hidden
          className="w-4 h-4 text-gray-600 dark:text-zinc-400 forced-colors:text-[ButtonText] group-disabled:text-gray-200 dark:group-disabled:text-zinc-600 forced-colors:group-disabled:text-[GrayText]"
        />
      </Button>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="min-w-[--trigger-width]">
        <ListBox
          items={items}
          className="outline-none p-1 max-h-[inherit] overflow-auto [clip-path:inset(0_0_0_0_round_.75rem)]"
        >
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  )
}

// import type {
//   ListBoxItemProps,
//   SelectProps,
//   ValidationResult,
// } from "react-aria-components"
// import {
//   Button,
//   FieldError,
//   Label,
//   ListBox,
//   ListBoxItem,
//   Popover,
//   Select,
//   SelectValue,
//   Text,
// } from "react-aria-components"

// interface MySelectProps<T extends object>
//   extends Omit<SelectProps<T>, "children"> {
//   label?: string
//   description?: string
//   errorMessage?: string | ((validation: ValidationResult) => string)
//   items?: Iterable<T>
//   children: React.ReactNode | ((item: T) => React.ReactNode)
// }

// export function MySelect<T extends object>({
//   label,
//   description,
//   errorMessage,
//   children,
//   items,
//   ...props
// }: MySelectProps<T>) {
//   return (
//     <Select
//       {...props}
//       className="block w-full rounded border-0 py-2 shadow ring-0 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 dark:bg-[#262019]"
//     >
//       <Label>{label}</Label>
//       <Button>
//         <SelectValue />
//         <span aria-hidden="true">▼</span>
//       </Button>
//       {description && <Text slot="description">{description}</Text>}
//       <FieldError>{errorMessage}</FieldError>
//       <Popover>
//         <ListBox items={items}>{children}</ListBox>
//       </Popover>
//     </Select>
//   )
// }

// function MyItem(props: ListBoxItemProps) {
//   return (
//     <ListBoxItem
//       {...props}
//       className={({ isFocused, isSelected }) =>
//         `my-item ${isFocused ? "focused" : ""} ${isSelected ? "selected" : ""}`
//       }
//     />
//   )
// }

// ;<MySelect label="Ice cream flavor">
//   <MyItem>Chocolate</MyItem>
//   <MyItem>Mint</MyItem>
//   <MyItem>Strawberry</MyItem>
//   <MyItem>Vanilla</MyItem>
// </MySelect>
