'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'

const formSchema = (type: string) => z.object({
    //sign-up
    firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    address: type === 'sign-in' ? z.string().optional() : z.string().max(50),
    city: type === 'sign-in' ? z.string().optional() : z.string().min(2),
    state: type === 'sign-in' ? z.string().optional() : z.string().min(2),
    postalCode: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string(),
    aadharNumber: type === 'sign-in' ? z.string().optional() : z.string().min(12).max(12),

    //both
    email: z.string().email(),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters'
    }),
})



const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    const authFormSchema = formSchema(type)
    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof authFormSchema>) => {
        setIsLoading(true)
        try {
            // Sign up with appwrite and create a plain link token

            if(type === 'sign-up') {
                const userData = {
                    firstName: values.firstName!,
                    lastName: values.lastName!,
                    address: values.address!,
                    city: values.city!,
                    state: values.state!,
                    postalCode: values.postalCode!,
                    dateOfBirth: values.dateOfBirth!,
                    aadharNumber: values.aadharNumber!,
                    email: values.email,
                    password: values.password
                  }

                  const newUser=await signUp(userData)
                  setUser(newUser)
            }
            if(type === 'sign-in') {
                 const response=await signIn({
                     email: values.email,
                     password: values.password
                 })

                 if(response) router.push('/')
            }
            setIsLoading(false)
        } catch (error) {

            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }



    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href={"/"} className='flex mb-12 cursor-pointer items-center gap1 px-42'>
                    <Image src={"/icons/logo.svg"} width={34} height={34} alt='logo' />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
                </Link>
                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                        <p className='text-16 font-normal text-gray-600'>{user ? 'Link Your account to get started' : 'Please Enter Your Details'}</p>
                    </h1>
                </div>
            </header>
            {
                user ? (
                    <div className='flex flex-col gap-4'>
                        {/* PlaidLink  */}
                    </div>
                )
                    : (
                        <>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    {type === 'sign-up' && (
                                        <>
                                            <div className='flex gap-4'>
                                                <FormField
                                                    control={form.control}
                                                    name="firstName"
                                                    render={({ field }) => (
                                                        <div className='form-item'>
                                                            <FormLabel className='form-label'>First Name</FormLabel>
                                                            <div className='flex w-full flex-col'>
                                                                <FormControl>
                                                                    <Input placeholder='Enter Your First Name' className='input-class' {...field} />
                                                                </FormControl>
                                                                <FormMessage className='form-message mt-2' />
                                                            </div>
                                                        </div>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="lastName"
                                                    render={({ field }) => (
                                                        <div className='form-item'>
                                                            <FormLabel className='form-label'>Last Name</FormLabel>
                                                            <div className='flex w-full flex-col'>
                                                                <FormControl>
                                                                    <Input placeholder='Enter Your Last Name' className='input-class' {...field} type='text' />
                                                                </FormControl>
                                                                <FormMessage className='form-message mt-2' />
                                                            </div>
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                            <FormField
                                                control={form.control}
                                                name="address"
                                                render={({ field }) => (
                                                    <div className='form-item'>
                                                        <FormLabel className='form-label'>Address</FormLabel>
                                                        <div className='flex w-full flex-col'>
                                                            <FormControl>
                                                                <Input placeholder='Enter Your Address' className='input-class' {...field} />
                                                            </FormControl>
                                                            <FormMessage className='form-message mt-2' />
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="city"
                                                render={({ field }) => (
                                                    <div className='form-item'>
                                                        <FormLabel className='form-label'>City</FormLabel>
                                                        <div className='flex w-full flex-col'>
                                                            <FormControl>
                                                                <Input placeholder='Enter Your City' className='input-class' {...field} />
                                                            </FormControl>
                                                            <FormMessage className='form-message mt-2' />
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                            <div className='flex gap-4'>
                                                <FormField
                                                    control={form.control}
                                                    name="state"
                                                    render={({ field }) => (
                                                        <div className='form-item'>
                                                            <FormLabel className='form-label'>State</FormLabel>
                                                            <div className='flex w-full flex-col'>
                                                                <FormControl>
                                                                    <Input placeholder='State' className='input-class' {...field} type='text' />
                                                                </FormControl>
                                                                <FormMessage className='form-message mt-2' />
                                                            </div>
                                                        </div>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="postalCode"
                                                    render={({ field }) => (
                                                        <div className='form-item'>
                                                            <FormLabel className='form-label'>Postal Code</FormLabel>
                                                            <div className='flex w-full flex-col'>
                                                                <FormControl>
                                                                    <Input placeholder='ex. 422001' className='input-class' {...field} />
                                                                </FormControl>
                                                                <FormMessage className='form-message mt-2' />
                                                            </div>
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                            <div className='flex gap-4'>
                                                <FormField
                                                    control={form.control}
                                                    name="dateOfBirth"
                                                    render={({ field }) => (
                                                        <div className='form-item'>
                                                            <FormLabel className='form-label'>Date of Birth</FormLabel>
                                                            <div className='flex w-full flex-col'>
                                                                <FormControl>
                                                                    <Input placeholder='YYYY-MM-DD' className='input-class' {...field} type='date' value={field.value?.toString()} />
                                                                </FormControl>
                                                                <FormMessage className='form-message mt-2' />
                                                            </div>
                                                        </div>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="aadharNumber"
                                                    render={({ field }) => (
                                                        <div className='form-item'>
                                                            <FormLabel className='form-label'>Aadhar Number</FormLabel>
                                                            <div className='flex w-full flex-col'>
                                                                <FormControl>
                                                                    <Input placeholder='Enter Your Aadhar Number' className='input-class' {...field} />
                                                                </FormControl>
                                                                <FormMessage className='form-message mt-2' />
                                                            </div>
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </>
                                    )}

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <div className='form-item'>
                                                <FormLabel className='form-label'>Email</FormLabel>
                                                <div className='flex w-full flex-col'>
                                                    <FormControl>
                                                        <Input placeholder='Enter Your Email' className='input-class' {...field} />
                                                    </FormControl>
                                                    <FormMessage className='form-message mt-2' />
                                                </div>
                                            </div>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <div className='form-item'>
                                                <FormLabel className='form-label'>Password</FormLabel>
                                                <div className='flex w-full flex-col'>
                                                    <FormControl>
                                                        <Input placeholder='Enter Your Password' className='input-class' {...field} type='password' />
                                                    </FormControl>
                                                    <FormMessage className='form-message mt-2' />
                                                </div>
                                            </div>
                                        )}
                                    />
                                    <div className='flex flex-col gap-4'>
                                        <Button type="submit" className='form-btn' disabled={isLoading}>{isLoading
                                            ? (<>
                                                <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
                                            </>) : (type === 'sign-in' ? 'Sign in' : 'Sign up')}</Button>
                                    </div>
                                </form>
                            </Form>

                            <footer className='flex justify-center gap-1'>
                                <p>{type === 'sign-in' ? "Don't have an account?" : "Already Have an account?"}</p>
                                <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} legacyBehavior><a className='text-blue-600 font-semibold'>{type === 'sign-in' ? 'Sign Up' : 'Sign In'}</a></Link>
                            </footer>
                        </>)}
        </section>
    )
}

export default AuthForm