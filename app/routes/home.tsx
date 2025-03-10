import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

import * as v from "valibot";
import { decode } from "decode-formdata";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(3, "Das ist ein bisschen kurz")),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const formValues = decode(formData);
  const result = v.safeParse(schema, formValues);
  if (!result.success) {
    console.log(result);
  }
  console.log(formData.get("name"));
}

export default function Home() {
  return <Welcome />;
}
