"use client"

import Subtitle from "@/components/SubTitle"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import z from "zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useState } from "react"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Email inválido.",
  }),
  phone: z.string().min(10, {
    message: "Telefone deve ter pelo menos 10 dígitos.",
  }),
  city: z.string().min(2, {
    message: "Conte um pouco sobre você.",
  }),
})

const FormPartner = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      city: "",
    },
  })

  const onSubmit = async (values) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/seja-parceiro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(result.message || 'Cadastro realizado com sucesso!')
        form.reset()
      } else {
        toast.error(result.error || 'Erro ao realizar cadastro')
      }
    } catch (error) {
      console.error('Erro:', error)
      toast.error('Erro ao enviar formulário')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="lg:pr-4">
      <div className="boxed">
        <Subtitle>Seja nosso revendedor</Subtitle>
      </div>
      <div className="gap-6 space-y-4 lg:flex lg:items-center">
        <div className="relative h-[250px] w-[500px] max-w-[100%] lg:h-[630px] lg:w-[950px]">
          <Image
            src="/image/user-partner.png"
            alt="Parceiro"
            fill
            className="object-contain"
          />
        </div>
        <div className="max-w-[500px] flex-1 rounded-lg border">
          <Form {...form}>
            <div className="rounded-t-lg bg-gradient-to-r from-[#cb0735] via-[#ed6b6b] to-[#e8c1c1] p-6">
              <h4 className="text-center text-2xl font-bold text-white">
                Faça seu cadastro
              </h4>
            </div>
            <div className="p-4">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do usuário</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu nome..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu email..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite seu telefone..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sobre você</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Fale um pouco sobre você"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  className="w-full" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
              </form>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default FormPartner
