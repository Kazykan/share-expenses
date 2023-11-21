import { useState } from "react"
import { CreateProduct } from "./components/CreateProduct"
import { ErrorMessage } from "./components/ErrorMessage"
import { Loader } from "./components/Loader"
import { Modal } from "./components/Modal"
import { Product } from "./components/Product"
import { useProducts } from "./hooks/products"
import { IProduct } from "./models"

function App() {
  const { loading, error, products, addProduct } = useProducts()
  const [modal, setModal] = useState(false)

  const createHandler = (products: IProduct) => {
    setModal(false)
    addProduct(products)
  }

  return (
    <div className="container mx-auto max-w-2px pt-5">
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
      {modal && (
        <Modal title="Create new product" onClose={() => setModal(false)}>
          <CreateProduct onCreate={createHandler} />
        </Modal>
      )}
      <button
        className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4"
        onClick={() => setModal(true)}
      >
        +
      </button>
    </div>
  )
}

export default App

// const [count, setCount] = useState(0)

// return e('div', {className: 'container'}, [
//   e('h1', {className: 'font-bold', key: 1}, `Text JSX ${count}`),
//   e('button', {
//     className: 'py-2 px-4 border',
//     key: 2,
//     onClick: () => setCount(count +1)},
//     'Click me')
// ])
