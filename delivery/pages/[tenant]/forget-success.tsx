import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Icon } from '../../components/Icon'
import { useAppContext } from '../../contexts/AppContext'
import { useApi } from '../../libs/useApi'
import styles from '../../styles/ForgetSuccess.module.css'
import { Tenant } from '../../types/Tenant'

const ForgetSuccess = (data: Props) => {

	// useContext inicia vazio o o objeto em data.tenant é inserido em useContext
	const { tenant, setTenant } = useAppContext()

	useEffect(() => {
		setTenant(data.tenant)
	}, [])

	const router = useRouter()

	const handleSubmit = () => {
        router.push(`/${data.tenant.slug}/login`)
	}

	return(
		<div className={styles.container}>
            <Head>
                <title>Esqueci a senha | Sucesso</title>
            </Head>

            <Header
                color={data.tenant.mainColor}
                backHref={`/${data.tenant.slug}/forget`}
            />

			<div className={styles.iconArea}>
				<Icon 
					icon='mailSend'
					color={data.tenant.mainColor}
					width={99}
					height={81}
				/>
			</div>

            <div className={styles.title}>Verifique seu e-mail</div>

			<div className={styles.subtitle}>
				Enviamos as instruções para recuperação de senha para o seu e-mail.
			</div>

			<div className={styles.formArea}>
				<div className={styles.inputArea}>
					<Button 
						color={data.tenant.mainColor}
						label="Fazer Login"
						onClick={handleSubmit}
						fill={true}
					/>
				</div>
			</div>

		</div>
  	)
}

export default ForgetSuccess

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
