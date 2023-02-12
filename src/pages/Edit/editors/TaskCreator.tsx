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
import { ApiTaskResponse } from '@/lib/Service.type';
import { EditorMeta } from '@/TaskEditors/type';

type TaskCreatorDialogProps = {
  open: boolean;
  onClose: (taskId: number) => void;
  exerciseId: number;
};

export default function TaskCreator(props: TaskCreatorDialogProps) {
  const create = async (meta: EditorMeta) => {
    const { data } = await window.api.createTask(props.exerciseId, meta.type);
    if (data) props.onClose(data.id);
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
            <Grid item key={editor.type}>
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
                  onClick={() => create(editor)}
                >
                  <Typography variant={'h5'}>{editor.title}</Typography>
                  <Typography
                    color={'gray'}
                    textAlign={'center'}
                    fontSize={'smaller'}
                    sx={{
                      mb: 2,
                    }}
                  >
                    {editor.description}
                  </Typography>
                  <img
                    src={editor.img}
                    width={64}
                    alt={editor.type}
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
