import { ButtonHTMLAttributes } from 'react'
import { Button } from './styles'

interface ButtonComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  size: number
}
export function ButtonComponent({ text, size, ...rest }: ButtonComponentProps) {
  return (
    <Button {...rest} size={size}>
      <span>{text}</span>
    </Button>
  )
}
