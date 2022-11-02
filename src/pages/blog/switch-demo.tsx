import styles from "../../components/layout.module.css"
import Switch from "@mui/material/Switch";
<<<<<<< HEAD
import Layout from "../../components/layout";
=======
>>>>>>> 047914dbbbf0bf12f38fd5e37e58f9e8114330f5

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function SwitchDemo() {
 return (
<<<<<<< HEAD
  <Layout home = {false}>
    <div className={styles.container}>
      <div>
        <span>With default Theme:</span>
      </div>
      <Switch {...label} defaultChecked />
      <Switch {...label} />
      <Switch {...label} disabled defaultChecked />
    </div>
  </Layout>
=======
   <div className={styles.container}>
     <div>
       <span>With default Theme:</span>
     </div>
     <Switch {...label} defaultChecked />
     <Switch {...label} />
     <Switch {...label} disabled defaultChecked />
   </div>
>>>>>>> 047914dbbbf0bf12f38fd5e37e58f9e8114330f5
 );
}