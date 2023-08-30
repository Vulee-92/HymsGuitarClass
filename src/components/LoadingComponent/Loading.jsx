import { Spin } from 'antd'
import React from 'react'
import electric from '../../assets/hymnss.gif'
import styles from "./stylemui";
import Typical from 'react-typical';
const Loading = ({ children, isLoading, deday = 10 }) => {
  const classes = styles();
  const antIcon = <div style={{
    fontSize: 50,
    background: `url(${electric}) no-repeat 50% 50%`,
    backgroundSize: '5em',
    pointerEvents: 'none',
    opacity: 1,
    position: 'fixed',
    zIndex: 100000,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    animation: 'loaderAnim 1s linear infinite alternate forwards'
  }}></div>;

  return (
    <Spin className={classes.spinner} indicator={antIcon} spinning={isLoading} delay={deday} >

      {children}
    </Spin>

  )
}

export default Loading
