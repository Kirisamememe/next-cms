import { signIn } from "@/auth"
import { FcGoogle } from 'react-icons/fc';
import { Flexbox, FlexRow } from "../ui/flexbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heading, LabelText } from "../ui/typography"
import { Separator } from "../ui/separator"

export function SignIn() {

  // const form = useForm<z.infer<typeof signInSchema>>({
  //   resolver: zodResolver(signInSchema),
  //   defaultValues: {
  //     name: "",
  //     password: ""
  //   },
  // })


  return (
    <Flexbox className="my-12 h-full justify-center items-center">
      <Flexbox className="flex flex-col gap-6 border p-6 rounded-lg w-full max-w-[28rem] min-w-[22.5rem]">
        <Heading size={20}>
          Sign in
        </Heading>
        <form action={async () => {
          'use server'
          await signIn("google")
        }} className="flex flex-col">
          <Button>
            <FcGoogle />
            Login with google
          </Button>
        </form>
        
        <FlexRow center gap={4}>
          <Separator className="shrink"/>
          or
          <Separator className="shrink" />
        </FlexRow>
        
        <form action={async (formData) => {
          'use server'
          await signIn("Resend", formData)
        }} className="flex flex-col gap-4">
          <Flexbox gap={2}>
            <Input name="email" type="email" placeholder="Input your email" />
          </Flexbox>
          <Button type="submit">Submit</Button>
        </form>
      </Flexbox>
      
    </Flexbox>
  )
}