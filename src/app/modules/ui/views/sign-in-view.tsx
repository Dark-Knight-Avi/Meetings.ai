"use client"

import {
    Card,
    CardContent,
    Input,
    Button,
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Alert,
    AlertTitle,
    Loader,
} from "@/components/ui"
import { OctagonAlertIcon } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import { authClient } from "@/lib/auth-client"


const formSchema = z.object({
    email: z.string().email().refine((val) => val.split("@").length === 2, {
        message: "Please enter a valid email address!"
    }),
    password: z.string().min(1, {
        message: "Password is required!"
    })
})

const SignInView = () => {

    const router = useRouter()
    const [error, setError] = React.useState<string | null>(null)
    const [pending, setPending] = React.useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);

        authClient.signIn.email({
            email: data.email,
            password: data.password
        },{
            onSuccess: () => {
                setPending(false);
                router.push("/");
            },
            onError: ({ error }) => {
                setError(error.message)
                setPending(false);
            }
        })
    }

    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold text-[#071952]">Welcome back!</h1>
                                    <p className="text-[#0B666A] text-balance">
                                        Login to your account!
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="example@xyz.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="*********"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {
                                    !!error && (
                                        <Alert className="bg-destructive/10 border-none">
                                            <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                            <AlertTitle className="text-sm">
                                                Invalid credentials!
                                            </AlertTitle>
                                        </Alert>
                                    )
                                }
                                <Button type="submit" className="w-full" disabled={pending}>
                                    {pending ? <Loader/> : ("Sign In")}
                                </Button>
                                <div className="after:border-[#35A29F] relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="bg-card text-[#0B666A] relative z-10 px-2">
                                        Or continue with
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        variant={"outline"}
                                        type="button"
                                        disabled={pending}
                                        className="w-full flex items-center justify-center gap-2"
                                    >
                                        <img className="w-4 h-4" src={"/google.svg"}/>Google
                                    </Button>
                                    <Button
                                        variant={"outline"}
                                        type="button"
                                        disabled={pending}
                                        className="w-full flex items-center justify-center gap-2"
                                    >
                                        <img className="w-4 h-4" src={"/github.svg"}/>GitHub
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <Link href={"/sign-up"} className="underline underline-offset-4">Sign up</Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="gradient-1 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                        <img src={"/logo.png"} alt="Meetings.ai logo" className="h-[92px] w-[92px]" />
                        <p className="text-2xl font-semibold text-white">
                            Meetings.ai
                        </p>
                    </div>
                </CardContent>
            </Card>
            <div className="text-[#0B666A] *:[a]:hover:text-[#071952] text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}

export default SignInView;