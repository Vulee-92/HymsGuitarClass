import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const singelWordssss = {
  initial: {
    opacity: 0,
    rotate: 180,
    y: 300,
  },
  animate: {
    opacity: 1,
    rotate: 180,
    y: 0,
    transition: {
      duration: 1 // thời gian thực hiện hiệu ứng là 0.5 giây
    }
  }
}

const AnimationComponent = ({ text, className, children, type, threshold, rootMargin }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    rootMargin: '-50px 0px -200px 0px' // chỉ kích hoạt khi phần tử xuất hiện trong viewport với khoảng cách từ trên xuống là ít nhất -50px và khoảng cách từ dưới lên là ít nhất -200px
  });

  const controls = useAnimation();

  const animationVariants = {
    image: {
      initial: {
        opacity: 0,
        scale: 0.5
      },
      animate: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 1
        }
      }
    },
    box: {
      initial: {
        opacity: 0,
        y: 50
      },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.1,
          staggerDirection: 0.08
        }
      }
    },
    text: {
      initial: {
        opacity: 0,
        y: 50
      },
      animate: {
        controls,
        opacity: 1,
        y: 0,
        transition: {
          delay: .5,
          staggerDirection: 0.08
        }
      }
    }
  };

  const animation = animationVariants[type] || {};
  const quote = {
    initial: {
      opacity: 0,
      y: 50
    },
    animate: {
      controls,
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        staggerDirection: 0.08
      }
    }
  }

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  useEffect(() => {
    const handleScroll = () => {
      if (inView) {
        controls.start("animate");
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls, inView]);
  return (
    <div ref={ref}>
      {type === 'text' ? (
        <div className='w-full mx-auto py-2 flex items-center justìy-content text-center'>
          <motion.p className={`${className}`} variants={animation} initial="initial" animate={controls}>
            {text.split(" ").map((word, index) =>
              <motion.span key={word + '-' + index} className="inline-block" variants={singelWordssss} initial="initial" animate="animate">{word}&nbsp;</motion.span>
            )}
          </motion.p>
        </div>
      ) : type === 'box' ? (
        <motion.div className={`${className}`} variants={animation} animate={controls}>
          {children}
        </motion.div>
      ) : type === 'image' ? (
        <motion.img className={`${className}`} variants={animation} animate={controls} src={children} alt="animated image" />
      ) : (
        <></>
      )}
    </div>


  );
}

export default AnimationComponent;






