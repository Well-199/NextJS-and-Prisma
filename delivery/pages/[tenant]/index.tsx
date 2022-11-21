import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { Banner } from '../../components/Banner'
import { ProductItem } from '../../components/ProductItem'
import { SearchInput } from '../../components/SearchInput'
import { Sidebar } from '../../components/Sidebar'
import { useAppContext } from '../../contexts/app'
import { useAuthContext } from '../../contexts/auth'
import { useApi } from '../../libs/useApi'
import styles from '../../styles/Home.module.css'
import { Product } from '../../types/Product'
import { Tenant } from '../../types/Tenant'
import { User } from '../../types/User'

const Home = (data: Props) => {

	const { setToken, setUser } = useAuthContext()

	// useContext inicia vazio o o objeto em data.tenant é inserido em useContext
	const { tenant, setTenant } = useAppContext()

	useEffect(() => {
		setTenant(data.tenant)
		setToken(data.token)

		if(data.user) {
			setUser(data.user)
		}
		
	}, [])

	const [products, setProducts] = useState<Product[]>(data.products)
	const [sidebarOpen, setSidebarOpen] = useState(false)

	const handleSearch = (searchValue: string) => {
		console.log(`Voçe esta buscando por ${searchValue}`)
	}

	return(
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.headerTop}>
					<div className={styles.headerTopLeft}>
						<div className={styles.headerTitle}>Seja Bem Vindo (a) 👋</div>
						<div className={styles.headerSubtitle}>O que deseja pra hoje?</div>
					</div>
					<div className={styles.headerTopRight}>
						<div 
							className={styles.menuButton}
							onClick={() => setSidebarOpen(true)}
						>
							<div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
							<div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
							<div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
						</div>
						<Sidebar 
							tenant={data.tenant}
							open={sidebarOpen}
							onClose={() => setSidebarOpen(false)}
						/>
					</div>
				</div>
				<div className={styles.headerBotton}>
					<SearchInput 
						onSearch={handleSearch}
					/>
				</div>
			</header>

			<Banner />

			<div className={styles.grid}>

				{products.map((item, index) => (
					<ProductItem 
						key={index}
						data={{
							id: item.id,
							image: item.image,
							categoryName: item.categoryName,
							name: item.name,
							price: item.price
						}}
					/>
				))}
				
			</div>
		</div>
  	)
}

export default Home

type Props = {
	tenant: Tenant
	products: Product[]
	token: string
	user: User | null
}

export const getServerSideProps: GetServerSideProps = async (context) => {

	// PEGA O NOME DO COMÉRCIO NA URL 
	const { tenant: tenantSlug } = context.query

	const api = useApi(tenantSlug as string)

	// GET TENANT SÓ RETORNA A PAGINA SE ENCONTRAR O COMÉCIO CADASTRADO
	const tenant = await api.getTenant()

	// SE NÃO ENCONTRAR O COMÉCIO CADASTRADO REDIRECIONA PARA PAGINA INICIAL
	if(!tenant){
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	// Pega dados do usuario logado
	const token = getCookie('token', context)
	const user = await api.authorizeToken(token as string)

	// Retorna os produtos
	const products = await api.getAllProducts()

	// o objeto props é retornado para essa mesma tela Home em (data:  Props)
	return {
		props: {
			tenant: tenant,
			products: products,
			user: user,
			token: token
		}
	}

}
