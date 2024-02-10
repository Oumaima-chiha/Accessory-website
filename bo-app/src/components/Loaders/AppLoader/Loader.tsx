import { motion } from 'framer-motion';
import Image from 'assets/images/svg/heart_logo.svg';

const AppLoader = (): JSX.Element => {
  return (
    <motion.div
      animate={{ scale: [0.3, 0.4, 0.3] }}
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
      }}
      transition={{
        duration: 2.5,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
      }}>
      <img src={Image} width="250px" alt="" />
    </motion.div>
  );
};

export default AppLoader;
