function HeaderNavButtons(setHeaderButton, headerButton) {
    console.log(setHeaderButton.headerButton)
  return (
    <>
      <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
        <button
          className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
            setHeaderButton.headerButton === "expenses"
              ? "bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
              : "dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => setHeaderButton("expenses")}
        >
          Расходы
        </button>

        <button
          className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
            setHeaderButton.headerButton === "balance"
              ? "bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
              : "dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => setHeaderButton((prev) => "balance")}
        >
          Баланс
        </button>

        <button
          className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
            setHeaderButton.headerButton === "debt"
              ? "bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
              : "dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => setHeaderButton(setHeaderButton((prev) => "debt"))}
        >
          Задолженость
        </button>
      </div>
    </>
  )
}

export default HeaderNavButtons
