import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { useAppContext } from '../../contexts/app'
import { useAuthContext } from '../../contexts/auth'
import { useApi } from '../../libs/useApi'
import styles from '../../styles/Cart.module.css'
import { Product } from '../../types/Product'
import { Tenant } from '../../types/Tenant'
import { User } from '../../types/User'
import Head from 'next/head'
import { Header } from '../../components/Header'

const Cart = (data: Props) => {

	const { setToken, setUser } = useAuthContext()
	const { tenant, setTenant } = useAppContext()

	useEffect(() => {
		setTenant(data.tenant)
		setToken(data.token)		

		if(data.user) {
			setUser(data.user)
		}
	}, [])

	return(
		<div className={styles.container}>
			<Head>
                <title>Sacola | {data.tenant.name}</title>
            </Head>

            <Header 
                backHref={`/${data.tenant.slug}`}
                color={data.tenant.mainColor}
                title="Sacola"
            />

            <div className={styles.productsQuantity}>x itens</div>

            <div className={styles.productsList}>

            </div>
		</div>
  	)
}

export default Cart

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
			//user: user,
			//token: token
		}
	}

}
