import React from 'react'
import HeaderComponent from '../../components/HeaderComponents/HeaderComponent'
import FooterComponent from '../../components/FooterComponent/FooterComponent'

export const NotFoundPage = ({children}) => {
  return (
    <div>
         <HeaderComponent />
    {children}
    <FooterComponent/>
    </div>
 
  )
}
export default NotFoundPage