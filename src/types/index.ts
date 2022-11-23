import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

export interface IMenuItem {
    text: string;
    route: string;
    icon: OverridableComponent<SvgIconTypeMap>;
  }