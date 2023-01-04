import React from 'react';
import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material';

type TabsWrapperProps = {
  tabs: Array<{ label: string, element: JSX.Element }>
}

export default function TabsWrapper(props: TabsWrapperProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
    <Tabs orientation='vertical' value={value} onChange={handleChange} sx={{ borderRight: 1, borderColor: 'divider' }}>
      {props.tabs.map((tab, i) => <Tab key={`tab-${tab.label}-${i}`} label={tab.label} id={`tab-${i}`} />)}
    </Tabs>
    {
      props.tabs.map((tab, i) => <TabPanel key={`panel-${tab.label}-${i}`} index={i}
                                           value={value}>{tab.element}</TabPanel>)
    }
  </Box>;
}

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return <div role='tabpanel' hidden={value !== index} id={`panel-${index}`} {...other}>
    {value === index && (<Box sx={{ p: 3 }}>{children}</Box>)}
  </div>;
}