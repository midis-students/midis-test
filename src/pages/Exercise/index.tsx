import Header from "@/components/Header";
import Page from "@/components/Page";
import { useExerciseQuery } from "@/hooks/query/exercise";
import { Paper, Typography, Stack, Link } from "@mui/material";
import { useEffect } from "react";
import {
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import TaskView from "../(TaskView)";

const size = 1 / 4;

export default function ExercisePage() {
  const navigate = useNavigate();
  const { exercise, task } = useParams();
  const currentTask = Number(task);
  if (!exercise) {
    return <Navigate to="/" />;
  }
  const { data, isLoading, isSuccess, isError } = useExerciseQuery(+exercise);

  const baseUrl = `/exercise/${exercise}/`;

  useEffect(() => {
    if (isSuccess && currentTask == 0) {
      const firstTask = data.tasks.at(0);
      if (firstTask) {
        navigate(baseUrl + firstTask.id);
      }
    } else {
      if (isError) navigate("/");
    }
  }, [isLoading]);

  return (
    <>
      <Header />
      <Page
        sx={{
          display: "flex",
          p: 1,
          gap: 1,
          flexDirection: "row"
        }}
      >
        <Paper
          sx={{
            width: `${(1 - size - 0.01) * 100}%`,
            p: 1,
            overflowY: "auto",
            overflowX: "hidden"
          }}
        >
          <TaskView id={currentTask} />
        </Paper>
        <Paper
          sx={{
            marginLeft: "auto",
            width: `${size * 100}%`,
            p: 1,
            overflowY: "auto"
          }}
        >
          <Typography>Список задач</Typography>
          {isSuccess && data && (
            <Stack
              sx={{
                p: 1
              }}
              spacing={1}
            >
              {data.tasks.map((task, i) => (
                <Link
                  key={i}
                  underline="hover"
                  onClick={() => navigate(baseUrl + task.id)}
                  sx={{
                    cursor: "pointer",
                    alignItems: "center",
                    display: "flex",
                    gap: 1
                  }}
                  color={currentTask == task.id ? "#9c27b0" : "primary"}
                >
                  {task.name} {/*task.completed && <CheckIcon />*/}
                </Link>
              ))}
            </Stack>
          )}
        </Paper>
      </Page>
    </>
  );
}
