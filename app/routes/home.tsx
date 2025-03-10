import type { Route } from "./+types/home"
import * as React from "react"
import { Welcome } from "../welcome/welcome"

import * as v from "valibot"
import { z } from "zod"
import { decode } from "decode-formdata"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRemixForm, getValidatedFormData } from "remix-hook-form"
import { Controller } from "react-hook-form"
import { Form } from "react-router"
import { Button } from "~/components/shared/button"

import { cn } from "~/utils/tw"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" }
  ]
}

const vSchema = v.object({
  name: v.pipe(v.string(), v.minLength(3, "Das ist ein bisschen kurz"))
})
type vFormData = v.InferInput<typeof vSchema>
const vResolver = valibotResolver(vSchema)

const zSchema = z.object({
  name: z.string().min(3)
})
type zFormData = z.infer<typeof zSchema>
const zResolver = zodResolver(zSchema)

export async function action({ request }: Route.ActionArgs) {
  const {
    errors,
    data,
    receivedValues: defaultValues
  } = await getValidatedFormData<vFormData>(request, vResolver)
  if (errors) {
    console.log(errors)
    return { errors, defaultValues }
  }
  const { name } = data
  console.log(name)
}

export default function Home() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register
  } = useRemixForm<vFormData>({
    mode: "onSubmit",
    resolver: vResolver
  })

  console.log(errors)

  return (
    <div className="max-w-[300px] w-full space-y-6 px-4">
      <Form method="post" onSubmit={handleSubmit}>
        <Input {...register("name")} />
        {errors.name && errors.name.message}
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
