import { useRouter } from 'next/router'
import { useAuthContext } from '../../contexts/auth'
import { Tenant } from '../../types/Tenant'
import { Button } from '../Button'
import { SideBarMenuItem } from '../SideBarMenuItem'
import styles from './styles.module.css'

type Props = {
    tenant: Tenant
    open: boolean
    onClose: () => void
}

export const Sidebar = ({ tenant, open, onClose }: Props) => {

    const { user } = useAuthContext()
    const router = useRouter()

    return(
        <div 
            className={styles.container}
            style={{ width: open ? '100vw' : '0'}}
        >
            <div className={styles.area}>
                <div className={styles.header}>
                    <div className={styles.loginArea} style={{borderBottomColor: tenant.mainColor}}>

                        {user &&
                            <div className={styles.userInfo}>
                                <strong>{user.name}</strong>
                                Último pedido há 3 semanas
                            </div>
                        }

                        {!user &&
                            <Button 
                                color={tenant.mainColor}
                                label="Fazer Login"
                                onClick={() => router.push(`/${tenant.slug}/login`)}
                                fill={true}
                            />
                        }

                    </div>
                    <div 
                        className={styles.closeBtn} 
                        style={{color: tenant.mainColor}}
                        onClick={onClose}
                    >X</div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.menu}>
                    
                    <SideBarMenuItem 
                        color={'#6A7D8B'}
                        icon="menu"
                        label="Cardápio"
                        onClick={() => {}}
                        disabled={false}
                    />

                    <SideBarMenuItem 
                        color={'#6A7D8B'}
                        icon="cart"
                        label="Sacola"
                        onClick={() => {}}
                        disabled={false}
                    />

                    <SideBarMenuItem 
                        color={'#6A7D8B'}
                        icon="fav"
                        label="Favoritos"
                        onClick={() => {}}
                        disabled={true}
                    />

                    <SideBarMenuItem 
                        color={'#6A7D8B'}
                        icon="order"
                        label="Meus Pedidos"
                        onClick={() => {}}
                        disabled={false}
                    />

                    <SideBarMenuItem 
                        color={'#6A7D8B'}
                        icon="config"
                        label="Configurações"
                        onClick={() => {}}
                        disabled={true}
                    />

                </div>

                {user && 
                    <div className={styles.menuButton}>

                        <SideBarMenuItem 
                            color={'#6A7D8B'}
                            icon="logout"
                            label="Sair"
                            onClick={() => {}}
                            disabled={false}
                        />

                    </div>
                }

            </div>
        </div>
    )
}
