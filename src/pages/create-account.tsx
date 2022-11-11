import Head from 'next/head';
import Layout from '../components/layout';

export default function CreateAccount() {
  return (
    <Layout home={false}>
      <Head>
        <title>Create an account</title>
      </Head>
      <h1>Create an account</h1>
      <div>
        <form action="/api/form" method="post">
          <label htmlFor="first">First name:</label>
          <input type="text" id="first" name="first" />
          <label htmlFor="last">Last name:</label>
          <input type="text" id="last" name="last" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  );
}
