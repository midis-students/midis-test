import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Button,
  FormGroup,
  Autocomplete,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import TabsWrapper from './TabsWrapper';
import { Api } from '@/lib/api';
import Hosts from '@/config/hosts';
import { useSettings } from '@/store/settings';

type SettingsDialogProps = {
  open: boolean;
  onClose: () => void;
};

type EventHandler<T> = (event: React.SyntheticEvent, value: T) => void;

export default function SettingsDialog(props: SettingsDialogProps) {
  const settings = useSettings();

  const onHostSelect: EventHandler<string> = (event, value) =>
    settings.update('apiHost', value);
  const onForceJsonEditor: EventHandler<boolean> = (event, value) =>
    settings.update('forceJSONEditor', value);
  const onRawViewTask: EventHandler<boolean> = (event, value) =>
    settings.update('viewRawTask', value);

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
                    onClick={() => Api.instance.logout()}
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
                    options={Object.values(Hosts)}
                    disableClearable
                    onChange={onHostSelect}
                    renderInput={(params) => (
                      <TextField {...params} label={'Services Host'} />
                    )}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={settings.forceJSONEditor}
                        onChange={onForceJsonEditor}
                      />
                    }
                    label={'Force Json Editor'}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={settings.viewRawTask}
                        onChange={onRawViewTask}
                      />
                    }
                    label={'View Raw Tasks'}
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
