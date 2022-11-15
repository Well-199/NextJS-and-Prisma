import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { InputField } from '../../components/InputField'
import { useAppContext } from '../../contexts/AppContext'
import { useApi } from '../../libs/useApi'
import styles from '../../styles/Forget.module.css'
import { Tenant } from '../../types/Tenant'

const Forget = (data: Props) => {

	// useContext inicia vazio o o objeto em data.tenant é inserido em useContext
	const { tenant, setTenant } = useAppContext()

	useEffect(() => {
		setTenant(data.tenant)
	}, [])

	const router = useRouter()

	const [email, setEmail] = useState('')

	const handleSubmit = () => {
        router.push(`/${data.tenant.slug}/forget-success`)
	}

	return(
		<div className={styles.container}>
            <Head>
                <title>Esqueci a senha</title>
            </Head>

            <Header
                color={data.tenant.mainColor}
                backHref={`/${data.tenant.slug}/login`}
            />

			<div className={styles.header}>{data.tenant.name}</div>

            <div className={styles.title}>Esqueceu sua senha?</div>

			<div 
				className={styles.subtitle}
				style={{ borderBottomColor: data.tenant.mainColor }}
			>Preencha o campo com seu e-mail e receba as instruções 
            necessárias para redefinir  a sua senha.
			</div>

			<div className={styles.line}></div>

			<div className={styles.formArea}>
				<div className={styles.inputArea}>
					<InputField 
						color={data.tenant.mainColor}
						placeholder="Digite seu e-mail"
						value={email}
						onChange={setEmail}
					/>
				</div>


				<div className={styles.inputArea}>
					<Button 
						color={data.tenant.mainColor}
						label="Enviar"
						onClick={handleSubmit}
						fill={true}
					/>
				</div>
			</div>

		</div>
  	)
}

export default Forget

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
