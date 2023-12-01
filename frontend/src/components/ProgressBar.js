const ProgressBar = ({
  progressPercentage,
  progressColor,
  progressName,
  progressCost,
}) => {
  return (
    <>
      {progressColor === true && (
        <>
          <tr>
            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-right">
              <div>
                <h2 className="font-medium text-gray-800 dark:text-white ">
                  {progressName}
                </h2>
              </div>
              <div>
                <h4 className="text-gray-700 dark:text-gray-200">
                  {progressCost}
                </h4>
              </div>
            </td>

            <td className="px-1 py-1 text-sm whitespace-nowrap">
              <div
                className={`w-48 h-2 bg-blue-200 overflow-hidden rounded-full ${
                  progressColor ? "" : "rotate-180"
                }`}
              >
                <div
                  style={{ width: `${progressPercentage}%` }}
                  className={`h-full ${
                    progressColor ? "bg-blue-500" : "bg-red-500"
                  }`}
                ></div>
              </div>
            </td>
          </tr>
        </>
      )}
      {progressColor === false && (
        <>
          <tr>
            <td className="px-1 py-1 text-sm whitespace-nowrap">
              <div
                className={`w-48 h-2 bg-blue-200 overflow-hidden rounded-full ${
                  progressColor ? "" : "rotate-180"
                }`}
              >
                <div
                  style={{ width: `${progressPercentage}%` }}
                  className={`h-full ${
                    progressColor ? "bg-blue-500" : "bg-red-500"
                  }`}
                ></div>
              </div>
            </td>
            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-left">
              <div>
                <h2 className="font-medium text-gray-800 dark:text-white ">
                  {progressName}
                </h2>
              </div>
              <div>
                <h4 className="text-gray-700 dark:text-gray-200">
                  {progressCost}
                </h4>
              </div>
            </td>
          </tr>
        </>
      )}
    </>
  )
}

export default ProgressBar
