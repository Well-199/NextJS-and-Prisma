import { useState } from 'react'
import EyeOn from './EyeOn.svg'
import EyeOff from './EyeOff.svg'
import styles from './styles.module.css'

type Props = {
    color: string
    placeholder: string
    value: string
    onChange: (newValue: string) => void
    password?: boolean
}

export const InputField = ({ color, placeholder, value, onChange, password }: Props) => {

    const [focused, setFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    // Um if dentro do if {password ? (showPassword ? 'text' : 'password') : 'text'}
    // Primeiro verifica se password existe se é true, se sim 
    // Verifica se showPassword é true tambem e esse sera o retorno da primeira condição

    return (
        <div 
            className={styles.container}
            style={{ 
                borderColor: focused ? color : '#F9F9FB',
                backgroundColor: focused ? '#FFF' : '#F9F9FB'
            }}
        >
            <input 
                type={password ? (showPassword ? 'text' : 'password') : 'text'}
                className={styles.input}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            {password &&
            <div className={styles.showPassword}
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword && <EyeOn color="#BBB" />}
                {!showPassword && <EyeOff color="#BBB" />}
            </div>
            }
        </div>
    )
}
