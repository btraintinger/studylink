import Switch from '@mui/material/Switch';
import Layout from '../components/layout';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function SwitchDemo() {
  return (
    <div>
      <Layout home={false}>
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
