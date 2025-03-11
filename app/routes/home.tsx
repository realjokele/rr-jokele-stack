import type { Route } from "./+types/home";
import * as React from "react";
import { Welcome } from "../welcome/welcome";

import * as v from "valibot";
import { z } from "zod";
import { decode } from "decode-formdata";
import { Controller } from "react-hook-form";
import { Form } from "react-router";
import { Button } from "~/components/shared/button";

import { cn } from "~/utils/tw";
import { TextField } from "~/components/shared/textfield";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const vSchema = v.object({
  name: v.pipe(v.string(), v.minLength(3, "Das ist ein bisschen kurz")),
});
type vFormData = v.InferInput<typeof vSchema>;

const zSchema = z.object({
  name: z.string().min(3),
});
type zFormData = z.infer<typeof zSchema>;

export async function action({ request }: Route.ActionArgs) {
  console.log("action");
  const formData = await request.formData();
  return validateFormdata(formData);
  // if (errors) {
  //   console.log(errors)
  //   return { errors, defaultValues }
  // }
  // const { name } = data
  // console.log(name)
}

export async function clientAction({
  request,
  serverAction,
}: Route.ClientActionArgs) {
  console.log("client action");
  const formData = await request.formData();
  return validateFormdata(formData);
  // return await serverAction();
}

function validateFormdata(formData: FormData) {
  const data = decode(formData);
  const result = v.safeParse(vSchema, data);
  if (!result.success) {
    const flatErrors = v.flatten<typeof vSchema>(result.issues);
    console.log(flatErrors);
    return { errors: flatErrors };
  }
  console.log(result);
}

export default function Home({ actionData }: Route.ComponentProps) {
  console.log(actionData?.errors?.nested?.name);

  const error = actionData?.errors?.nested?.name?.join(",");
  console.log(error);

  return (
    <div className="max-w-[300px] w-full space-y-6 px-4">
      <Form method="post" noValidate>
        <TextField
          name="name"
          label="Name"
          isInvalid={!!error}
          errorMessage={error}
          // validationBehavior="aria"
        />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
