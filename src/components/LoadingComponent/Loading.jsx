import { Spin } from 'antd'
import React from 'react'
import electric from '../../assets/electric-guitar.svg'

const Loading = ({ children, isLoading, deday = 10 }) => {
  const antIcon = <div style={{
    fontSize: 24,
    background: `url(${electric}) no-repeat 50% 50%`,
    backgroundSize: '5em',
    pointerEvents: 'none',
    opacity: 0.4,
    color: '#000',
    content: '',
    position: 'fixed',
    zIndex: 100000,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    animation: 'loaderAnim 1s linear infinite alternate forwards'
  }}></div>;

  return (
    <Spin indicator={antIcon} spinning={isLoading} delay={deday}>
      {children}
    </Spin>
  )
}

export default Loading
