import { setIsModalFormProps } from "../models/props.model";
import PlusLogo from "../svg/plus";

export default function Navbars({setIsModalForm}: setIsModalFormProps) {
  return (
    <nav className="bg-gray-50 dark:bg-gray-800">
      <div className="container flex items-center justify-center p-0 mx-auto text-gray-600 dark:text-gray-300">
        Разделите расходы в поездках. &emsp;
        <button
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={() => setIsModalForm((prev) => !prev)}
        >
          add<PlusLogo />
        </button>
      </div>
    </nav>
  )
}