import env from "../env";

export const closeApp = async () => {
  await fetch(`${env.BACK}/api/close`, {
    method: "POST",
    body: "",
  }).catch(() => {
    window.close();
  });
};
