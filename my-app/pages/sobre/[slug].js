import { useRouter } from "next/router"

const PaginaDinamica  = () => {

    const router = useRouter()
    const { slug } = router.query

    return(
        <div>........{slug}</div>
    )
}

export default PaginaDinamica
