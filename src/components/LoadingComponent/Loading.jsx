import { Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import electric from '../../assets/hymnss.gif';
import styles from "./stylemui";
import Typical from 'react-typical';

const Loading = ({ children, isLoading, deday = 10 }) => {
  const classes = styles();
  const [typicalVisible, setTypicalVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setTypicalVisible(false);
      document.body.classList.remove('loading');
    } else {
      document.body.classList.add('loading');
    }
  }, [isLoading]);

  return (
    <>
      {typicalVisible && (
        <div className={classes.loading}>
          <div className={classes.overlay}></div>
          <div className={classes.text}>
            <Typical
              className={classes.textLoading}
              steps={['Hymns...', 2000, 'Please wait...', 1000]}
              loop={Infinity}
              wrapper="p"
              delay={1000}
            />
          </div>
        </div>
      )}
      <Spin className={classes.spinner} spinning={isLoading} delay={deday}>
        {children}
      </Spin>
    </>
  );
}

export default Loading;
