import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';

type TabsWrapperProps = {
  tabs: Array<{ label: string; element: JSX.Element }>;
  orientation: 'vertical' | 'horizontal';
};

export default function TabsWrapper(props: TabsWrapperProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: props.orientation === 'vertical' ? 'row' : 'column',
      }}
    >
      <Tabs
        orientation={props.orientation}
        value={value}
        onChange={handleChange}
        sx={{
          borderRight: Number(props.orientation === 'vertical'),
          borderColor: 'divider',
        }}
      >
        {props.tabs.map((tab, i) => (
          <Tab
            key={`tab-${tab.label}-${i}`}
            label={tab.label}
            id={`tab-${i}`}
          />
        ))}
      </Tabs>
      {props.tabs.map((tab, i) => (
        <TabPanel key={`panel-${tab.label}-${i}`} index={i} value={value}>
          {tab.element}
        </TabPanel>
      ))}
    </Box>
  );
}

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`panel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
