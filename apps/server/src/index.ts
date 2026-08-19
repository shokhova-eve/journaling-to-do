import { createApp } from "./app";
import { env } from "./env";

const app = createApp();

app.listen(Number(env.PORT), () => {
  console.log(`Server listening on port ${env.PORT}`);
});
