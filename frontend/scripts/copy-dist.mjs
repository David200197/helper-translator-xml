// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
import fs from "fs";
import path from "path";

fs.cpSync("dist", path.join("..", "backend", "public"), { recursive: true });
