import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Card,
  CardActionArea,
} from '@mui/material';
import TaskEditorsList from '@/TaskEditors';

export interface TaskCreatorEditor {
  (): JSX.Element;

  meta: {
    title: string;
    description: string;
    img: string;
    type: string;
  };
}

type TaskCreatorDialogProps = {
  open: boolean;
  onClose: () => void;
  exerciseId: number;
};

export default function TaskCreator(props: TaskCreatorDialogProps) {
  const create = async () => {
    await window.api.createTask(props.exerciseId);
  };

  const cardSize = '192px';

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth={true}>
      <DialogTitle>
        <Typography variant={'h4'}>Выберите вид задачи</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          {TaskEditorsList.map((editor) => (
            <Grid item key={editor.meta.type}>
              <Card>
                <CardActionArea
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: cardSize,
                    height: cardSize,
                    p: 1,
                  }}
                >
                  <Typography variant={'h5'}>{editor.meta.title}</Typography>
                  <Typography
                    color={'gray'}
                    textAlign={'center'}
                    fontSize={'smaller'}
                    sx={{
                      mb: 2,
                    }}
                  >
                    {editor.meta.description}
                  </Typography>
                  <img
                    src={editor.meta.img}
                    width={64}
                    alt={editor.meta.type}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
