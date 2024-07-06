"use client"

import { postBBS } from "@/app/actions/postBBSAction"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const formSchema = z.object({
    username: z
        .string()
        .min(2, {message: "ユーザ名は２文字以上で入力してください。"}),
    title: z
        .string()
        .min(2, {message: "タイトルは２文字以上で入力してください。"}),
    content: z
        .string()
        .min(2, {message: "本文は10文字以上で入力してください。"})
        .max(140, {message: "本文は140文字以内で入力してください。"}),
})

const createBBSPage = () => {

  const router = useRouter();

  const form = useForm ({
    resolver: zodResolver(formSchema),
    defaultValues: {
        username: "",
        title: "",
        content: "",
    },
  });

  async function onSubmit (value: z.infer<typeof formSchema>) {

   const { username, title, content } = value;

   postBBS({username, title, content});

    // ↓従来と同じく、APIを叩く

    // try {
    //   await fetch("http://localhost:3000/api/post", {
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //     body: JSON.stringify({ username, title, content }),
    //   })

    //   router.push("/");
    //   router.refresh();

    // } catch (err) {
    //   console.error(err);
    // }
  }
  
  return (
    <div>
        <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-1/2 px-10">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ユーザ名</FormLabel>
            <FormControl>
              <Input placeholder="ユーザ名" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>タイトル</FormLabel>
            <FormControl>
              <Input placeholder="タイトル" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>本文</FormLabel>
            <FormControl>
              <Textarea placeholder="本文" className="risize-none" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form></div>
  )
}

export default createBBSPage
