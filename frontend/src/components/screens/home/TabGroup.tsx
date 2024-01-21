import { Tab } from "@headlessui/react"
import { BiTransfer } from "react-icons/bi"
import { BsCashCoin } from "react-icons/bs"
import { FaMoneyBillTransfer } from "react-icons/fa6"
import { IoPeopleSharp } from "react-icons/io5"
import ExpenseList from "../../itemList/ExpenseList"
import DeptAdviceList from "../../itemList/DeptAdviceList"
import MemberList from "../../itemList/MemberList"
import MoneyTransferList from "../../itemList/MoneyTransferList"
import { TabGroupsProps } from "../../../interface"

export function TabGroup({
  selectedIndex,
  setSelectedIndex,
  placeId,
}: TabGroupsProps) {
  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List className="fixed bottom-0 left-0 z-50 w-full h-14 bg-white border-t border-gray-200 dark:bg-[#3D3A37] dark:border-[#A7A29D]">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium text-xs text-gray-500 dark:text-[#262019]">
          <Tab
            key="0"
            className="hover:transition-all duration-300 inline-block p-1 rounded ui-not-selected:hover:text-[#111827] ui-not-selected:dark:hover:text-[#A7A29D] ui-selected:text-[#111827] ui-selected:active ui-selected:dark:text-[#A7A29D]"
          >
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-2 group"
            >
              <BsCashCoin className="text-xl" />
              <span>Расходы</span>
            </button>
          </Tab>
          <Tab
            key="1"
            className="hover:transition-all duration-300 inline-block p-1 rounded ui-not-selected:hover:text-[#111827] ui-not-selected:dark:hover:text-[#A7A29D] ui-selected:text-[#111827] ui-selected:active ui-selected:dark:text-[#A7A29D]"
          >
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-2"
            >
              <FaMoneyBillTransfer className="text-xl " />
              <span>Долг</span>
            </button>
          </Tab>
          <Tab
            key="2"
            className="hover:transition-all duration-300 inline-block p-1 rounded ui-not-selected:hover:text-[#111827] ui-not-selected:dark:hover:text-[#A7A29D] ui-selected:text-[#111827] ui-selected:active ui-selected:dark:text-[#A7A29D]"
          >
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-2"
            >
              <IoPeopleSharp className="text-xl" />
              <span>Участники</span>
            </button>
          </Tab>
          <Tab
            key="3"
            className="hover:transition-all duration-300 inline-block p-1 rounded ui-not-selected:hover:text-[#111827] ui-not-selected:dark:hover:text-[#A7A29D] ui-selected:text-[#111827] ui-selected:active ui-selected:dark:text-[#A7A29D]"
          >
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-2"
            >
              <BiTransfer className="text-xl" />
              <span>Переводы</span>
            </button>
          </Tab>
        </div>
      </Tab.List>
      {/* <Tab.List className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          {tableName.map((tabName, index) => (
            <Tab
              key={index}
              className="inline-block p-4 border-b-2 ui-not-selected:border-transparent rounded-t-lg ui-not-selected:hover:text-gray-600 ui-not-selected:hover:border-gray-300 ui-not-selected:dark:hover:text-gray-300 ui-selected:text-blue-600 ui-selected:border-blue-600 ui-selected:active ui-selected:dark:text-blue-500 ui-selected:dark:border-blue-500"
            >
              {tabName}
            </Tab>
          ))}
        </Tab.List> */}
      <Tab.Panels>
        <Tab.Panel>
          <ExpenseList placeId={placeId} />
        </Tab.Panel>
        <Tab.Panel>
          <DeptAdviceList placeId={placeId} />
        </Tab.Panel>
        <Tab.Panel>
          <MemberList placeId={placeId} />
        </Tab.Panel>
        <Tab.Panel>
          <MoneyTransferList placeId={placeId} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
