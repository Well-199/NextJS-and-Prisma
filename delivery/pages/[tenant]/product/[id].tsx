import { getCookie, hasCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Button } from '../../../components/Button'
import { Header } from '../../../components/Header'
import { Quantity } from '../../../components/Quantity'
import { useAppContext } from '../../../contexts/app'
import { useApi } from '../../../libs/useApi'
import { useFormatter } from '../../../libs/useFormatter'
import styles from '../../../styles/Product-id.module.css'
import { CartCookie } from '../../../types/CartCookie'
import { Product } from '../../../types/Product'
import { Tenant } from '../../../types/Tenant'

const Product = (data: Props) => {

	// useContext inicia vazio o o objeto em data.tenant é inserido em useContext
	const { tenant, setTenant } = useAppContext()

	useEffect(() => {
		setTenant(data.tenant)
	}, [])

	const [qtCount, setQtCount] = useState(1)

	const formatter = useFormatter()

	const handleAddToCart = () => {

		let cart: CartCookie[] = []

		// verifica se existe itens no carrinho
		if(hasCookie('cart')){
			const cartCookie = getCookie('cart')
			const cartJson: CartCookie[] = JSON.parse(cartCookie as string)
			
			for(let i in cartJson){

				if(cartJson[i].qt && cartJson[i].id){
					cart.push(cartJson[i])
				}

			}
		}

		// Procura um item no carrinho

	}

	const handleUpdateQt = (newCount: number) => {
		setQtCount(newCount)
	}

	return(
		<div className={styles.container}>
			<Head>
                <title>{data.tenant.name}</title>
            </Head>

            <div className={styles.headerArea}>
                <Header 
                    color={data.tenant.mainColor}
                    backHref={`/${data.tenant.slug}`}
                    title="Produto"
                    invert={true}
                />
            </div>

            <div 
                className={styles.headerBg} 
                style={{ backgroundColor: data.tenant.mainColor }}
            >

            </div>

            <div className={styles.productImage}>
                <img src={data.product.image} alt="" />
            </div>

			<div className={styles.category}>{data.product.categoryName}</div>
			<div 
				className={styles.title} 
				style={{ borderBottomColor: data.tenant.mainColor }}
			>
				{data.product.name}
			</div>
			<div className={styles.line}></div>

			<div className={styles.description}>{data.product.description}</div>

			<div className={styles.qtText}>Quantidade</div>
			<div className={styles.area}>
				<div className={styles.areaLeft}>
					<Quantity 
						color={data.tenant.mainColor}
						count={qtCount}
						onUpdateCount={handleUpdateQt}
						min={1}
						max={0}
						small={false}
					/>
				</div>
				<div 
					className={styles.areaRight}
					style={{ color: data.tenant.mainColor }}
				>
					{formatter.formatPrice(data.product.price)}
				</div>
			</div>

			<div className={styles.buttonArea}>
				<Button 
					color={data.tenant.mainColor}
					label={"Adicionar ao carrinho"}
					onClick={handleAddToCart}
					fill={true}
				/>
			</div>

		</div>
  	)
}

export default Product

type Props = {
	tenant: Tenant,
	product: Product
}

export const getServerSideProps: GetServerSideProps = async (context) => {

	// PEGA O NOME DO COMÉRCIO NA URL 
	const { tenant: tenantSlug, id } = context.query

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

	// RETORNA UM PRODUTO 
	const product = await api.getProduct(id as string)

	// o objeto props é retornado para essa mesma tela Home em (data:  Props)
	return {
		props: {
			tenant: tenant,
			product: product
		}
	}

}
