import Layout from '../../components/layout';
import SignUp from '../../components/sign-up';

import styles from '../../components/layout.module.css';

export default function SignUpDemo() {
  return (
    <div className={styles.container}>
      <Layout home={false}>
        <SignUp />
      </Layout>
    </div>
  );
}
