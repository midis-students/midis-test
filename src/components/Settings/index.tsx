import React from 'react';
import {
  Autocomplete,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  FormGroup,
  Typography,
  Button,
} from '@mui/material';
import TabsWrapper from '@/components/TabsWrapper';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { settingsActions } from '@/store/slices/Settings';
import { authActions } from '@/store/slices/Auth';

type SettingsDialogProps = {
  open: boolean;
  onClose: () => void;
};

const Hosts = [
  'http://localhost:3000',
  'https://midis-test-api.damirlut.online',
  'https://midis-test.iky.su',
];

export default function SettingsDialog(props: SettingsDialogProps) {
  const settings = useAppSelector((select) => select.settings);
  const dispatch = useAppDispatch();

  const onHostSelect = (event: React.SyntheticEvent, value: string) =>
    dispatch(settingsActions.setHost(value));
  const onForceJsonEditor = (event: React.SyntheticEvent, value: boolean) =>
    dispatch(settingsActions.setForceJsonEditor(value));

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth={true}
      maxWidth={'lg'}
    >
      <DialogTitle>
        <Typography>Настройки</Typography>
      </DialogTitle>
      <DialogContent>
        <TabsWrapper
          orientation="vertical"
          tabs={[
            {
              label: 'Основные',
              element: (
                <>
                  <Button
                    variant="contained"
                    onClick={() => dispatch(authActions.logout())}
                  >
                    Выйти
                  </Button>
                </>
              ),
            },
            {
              label: 'Для разработчиков',
              element: (
                <FormGroup>
                  <Autocomplete
                    sx={{ width: 300 }}
                    value={settings.apiHost}
                    options={Hosts}
                    disableClearable
                    onChange={onHostSelect}
                    renderInput={(params) => (
                      <TextField {...params} label={'Services Host'} />
                    )}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={settings.forceJsonEditor}
                        onChange={onForceJsonEditor}
                      />
                    }
                    label={'Force Json Editor'}
                  />
                </FormGroup>
              ),
            },
          ]}
        />
      </DialogContent>
    </Dialog>
  );
}
