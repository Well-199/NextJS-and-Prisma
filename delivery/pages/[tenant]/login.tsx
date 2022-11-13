import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Header } from '../../components/Header'
import { InputField } from '../../components/InputField'
import { useAppContext } from '../../contexts/AppContext'
import { useApi } from '../../libs/useApi'
import styles from '../../styles/Login.module.css'
import { Tenant } from '../../types/Tenant'

const Login = (data: Props) => {

	// useContext inicia vazio o o objeto em data.tenant é inserido em useContext
	const { tenant, setTenant } = useAppContext()

	useEffect(() => {
		setTenant(data.tenant)
	}, [])

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return(
		<div className={styles.container}>
            <Head>
                <title>Login | { tenant?.name }</title>
            </Head>

            <Header
                color={data.tenant.mainColor}
                backHref={`/${data.tenant.slug}`}
            />

			<InputField 
				color={data.tenant.mainColor}
				placeholder="Digite seu e-mail"
				value={email}
				onChange={setEmail}
			/>

			<InputField 
				color={data.tenant.mainColor}
				placeholder="Digite sua senha"
				value={password}
				onChange={setPassword}
				password={true}
			/>
		</div>
  	)
}

export default Login

type Props = {
	tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {

	// PEGA O NOME DO COMÉRCIO NA URL 
	const { tenant: tenantSlug } = context.query

	const api = useApi()

	// GET TENANT SÓ RETORNA A PAGINA SE ENCONTRAR O COMÉCIO CADASTRADO
	const tenant = await api.getTenant(tenantSlug as string)

	// SE NÃO ENCONTRAR O COMÉCIO CADASTRADO REDIRECIONA PARA PAGINA INICIAL
	if(!tenant){
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	// o objeto props é retornado para essa mesma tela Home em (data:  Props)
	return {
		props: {
			tenant: tenant
		}
	}

}
