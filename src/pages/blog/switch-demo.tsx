import Switch from "@mui/material/Switch";
import styles from "../../components/layout.module.css"
import Layout from '../../components/layout';

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function SwitchDemo() {
 return (
   <div className={styles.container}>
    <Layout home = {false}>
      <div>
        <span>With default Theme:</span>
      </div>
      <Switch {...label} defaultChecked />
      <Switch {...label} />
      <Switch {...label} disabled defaultChecked />
      </Layout>
   </div>
 );
}