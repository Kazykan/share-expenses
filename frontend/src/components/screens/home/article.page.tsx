// import { Link, useLoaderData, useParams } from "react-router-dom"
import { QueryClient, useQuery } from "@tanstack/react-query"

// import CommentList from "./components/comment-list"
// import ArticleActions from "./components/article-actions"
// import TagList from "../../components/tag-list"
// import { getArticle } from "../../services/article.service"
// import FormattedDate from "../../components/formatted-date"
// import Markup from "../../components/markup"
import { Expense } from "../../models/expense.model"
import { ExpenseServiceTS } from "../../../services/expense.service"

type Params = {
  id: string
}

const ExpenseQuery = (id: string) => ({
  queryKey: ["expense", id],
  queryFn: () => ExpenseServiceTS.getAll(id),
})

export const loader =
  (queryClient: QueryClient) =>
  async (id: string): Promise<Expense> => {
    const query = ExpenseQuery(id)

    return await queryClient.ensureQueryData(query)
  }

export default function ArticlePage() {
//   const initialData = useLoaderData() as Awaited<
//     ReturnType<ReturnType<typeof loader>>
//   >
//   const { id: id } = useParams<Params>() as Params

//   const { data: article } = useQuery<Expense[]>({
//     ...ExpenseQuery(id),
//     initialData: initialData,
//   })
  const { data: dataPlace } = useQuery({
    queryKey: ["places", loader],
    queryFn: () => PlaceService.getAll(),
  })

  return (
    <div className="article-page">
        {dataPlace.name}
    </div>
  )
}
