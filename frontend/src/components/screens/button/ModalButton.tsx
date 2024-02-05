import { setIsModalFormProps } from "../../models/props.model";

export function ModalButton ({setIsModalForm}: setIsModalFormProps) {
    return (
        <div className="mt-8 text-right space-x-6">
        <button
          className="rounded px-4 py-2 text-sm font-medium text-[#262019] hover:text-[#79a54f]"
          onClick={() => setIsModalForm((prev) => !prev)}
        >
          Отмена
        </button>
        <button className="inline-flex justify-center rounded border border-transparent dark:bg-[#B7D29F] bg-[#D0EFB3] px-4 py-2 text-sm font-medium text-[#111827] hover:bg-[#79a54f] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          Ok
        </button>
      </div>
    )
}