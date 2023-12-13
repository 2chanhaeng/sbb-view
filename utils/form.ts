export const getBodyFromForm = (keys: string[]) => (formData: FormData) =>
  JSON.stringify(
    Object.fromEntries(keys.map((key) => [key, formData.get(key)]))
  );
export const getPostInitFromForm =
  (keys: string[]) =>
  (formData: FormData): RequestInit => ({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: getBodyFromForm(keys)(formData),
  });
