import Head from 'next/head';
import Layout from '../components/layout';
import SignUp from '../components/sign-up-component'

export default function CreateNewAccount() {
    return (
        <Layout home = {false}>
            <SignUp/>
        </Layout>
    )

  }