import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Button } from '../../components/Button'
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

	const router = useRouter()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = () => {

	}

	const handleSignUp = () => {
		router.push(`/${data.tenant.slug}/signup`)
	}

	return(
		<div className={styles.container}>
            <Head>
                <title>Login</title>
            </Head>

            <Header
                color={data.tenant.mainColor}
                backHref={`/${data.tenant.slug}`}
            />

			<div className={styles.header}>{data.tenant.name}</div>

			<div 
				className={styles.subtitle}
				style={{ borderBottomColor: data.tenant.mainColor }}
			>Use suas credenciais para realizar o login.
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
					<InputField 
						color={data.tenant.mainColor}
						placeholder="Digite sua senha"
						value={password}
						onChange={setPassword}
						password={true}
					/>
				</div>

				<div className={styles.inputArea}>
					<Button 
						color={data.tenant.mainColor}
						label="Entrar"
						onClick={handleSubmit}
						fill={true}
					/>
				</div>
			</div>

			<div 
				className={styles.forgetArea}
				style={{ borderBottomColor: data.tenant.mainColor }}
			>
				Esqueceu sua senha? 
				<Link 
					className={styles.link} href={`/${data.tenant.slug}/forget`}
					style={{ color: data.tenant.mainColor }}
				>
					Clique aqui
				</Link>
			</div>

			<div className={styles.line}></div>

			<div className={styles.signupArea}>
				<Button 
					color={data.tenant.mainColor}
					label="Quero me cadastrar"
					onClick={handleSignUp}
					fill={false}
				/>
			</div>

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

	// o objeto props é retornado para essa mesma tela Home em (data:  Props)
	return {
		props: {
			tenant: tenant
		}
	}

}
