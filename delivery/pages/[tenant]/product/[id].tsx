import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Header } from '../../../components/Header'
import { useAppContext } from '../../../contexts/AppContext'
import { useApi } from '../../../libs/useApi'
import styles from '../../../styles/Product-id.module.css'
import { Product } from '../../../types/Product'
import { Tenant } from '../../../types/Tenant'

const Product = (data: Props) => {

	// useContext inicia vazio o o objeto em data.tenant é inserido em useContext
	const { tenant, setTenant } = useAppContext()

	useEffect(() => {
		setTenant(data.tenant)
	}, [])

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