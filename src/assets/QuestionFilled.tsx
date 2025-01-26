import React from 'react'

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string // Color del icono (se definirá desde el componente que lo use)
}

const QuestionFilled: React.FC<CustomIconProps> = ({
  color = '#6F757B',
  ...props
}) => {
  return (
    <svg
      width='111'
      height='17'
      viewBox='0 0 111 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M1.23295 14V3.81818H7.37784V4.91193H2.46591V8.35227H7.05966V9.44602H2.46591V12.9062H7.45739V14H1.23295Z'
        fill={color}
      />
      <path
        d='M102.832 2.5C101.546 2.5 100.29 2.88122 99.2208 3.59545C98.1519 4.30968 97.3188 5.32484 96.8268 6.51256C96.3348 7.70028 96.2061 9.00721 96.4569 10.2681C96.7077 11.529 97.3268 12.6872 98.2358 13.5962C99.1449 14.5052 100.303 15.1243 101.564 15.3751C102.825 15.6259 104.132 15.4972 105.319 15.0052C106.507 14.5132 107.522 13.6801 108.237 12.6112C108.951 11.5423 109.332 10.2856 109.332 9C109.33 7.27665 108.645 5.62441 107.426 4.40582C106.208 3.18722 104.555 2.50182 102.832 2.5Z'
        fill={color}
      />
    </svg>
  )
}

export default QuestionFilled
