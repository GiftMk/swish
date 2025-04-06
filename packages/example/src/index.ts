import { Swish } from "@swish/app";

const app = new Swish();

await app.init();

app.listen(3000);
