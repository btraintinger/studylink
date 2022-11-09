import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script'
import Layout from '../../components/layout';
import SignUp from '../../components/sign-up';

import styles from "../../components/layout.module.css"

export default function SignUpDemo() {
    return (
        <div className={styles.container}>
            <Layout home={false}>
                <SignUp />
            </Layout>
        </div>
    )

}