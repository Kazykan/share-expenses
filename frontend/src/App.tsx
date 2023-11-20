import { CreateProduct } from "./components/CreateProduct"
import { ErrorMessage } from "./components/ErrorMessage"
import { Loader } from "./components/Loader"
import { Modal } from "./components/Modal"
import { Product } from "./components/Product"
import { useProducts } from "./hooks/products"

function App() {
  const { loading, error, products } = useProducts()

  return (
    <div className="container mx-auto max-w-2px pt-5">
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
      <Modal title="Create new product">
        <CreateProduct />
      </Modal>
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
