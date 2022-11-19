import styles from './styles.module.css'
import CartIcon from './cart.svg'
import ConfigIcon from './config.svg'
import FavIcon from './fav.svg'
import LogoutIcon from './logout.svg'
import MenuIcon from './menu.svg'
import OrderIcon from './order.svg'

type Props = {
    color: string
    label: string
    icon: 'menu' | 'config' | 'fav' | 'logout' | 'cart' | 'order'
    onClick: () => void
}

export const SideBarMenuItem = ({ color, label, icon, onClick }: Props) => {

    return(
        <div className={styles.container} onClick={onClick}>
            { icon === 'menu' && <MenuIcon color={color} /> }
            { icon === 'config' && <ConfigIcon color={color} /> }
            { icon === 'fav' && <FavIcon color={color} /> }
            { icon === 'logout' && <LogoutIcon color={color} /> }
            { icon === 'cart' && <CartIcon color={color} /> }
            { icon === 'order' && <OrderIcon color={color} /> }
            <span>{ label }</span>
        </div>
    )
}
