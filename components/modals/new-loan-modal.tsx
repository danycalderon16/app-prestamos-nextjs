"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { postLoan } from "@/actions/post-loan";
import { CreateLoan } from "@/interfaces/loans";
import useNotifications from "@/hooks/useNotifications";
interface NewLoanModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  id:string
}

const formSchema = z.object({
  name: z.string().min(5, "El nombre es obligatorio"),
  date: z.date(),
  amount: z.number(),
  deadlines: z.number(),
  pays: z.number(),
  type: z.enum(["Quincenal", "Semanal"]),
});

export const NewLoanModal: React.FC<NewLoanModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  loading,
  id
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Daniel Calderón",
      amount: 2000,
      deadlines: 2,
      pays: 1200,
      type: "Quincenal",
    },
  });
  const { snackBar } = useNotifications();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  function onSubmit(values: z.infer<typeof formSchema>) {
    const sendLoan:CreateLoan = {
      nombre: values.name,
      cantidadPrestada: values.amount,
      plazos: values.deadlines,
      tipo: values.type,
      monto: values.pays,
      fecha: values.date,
    }
    postLoan({
      loan: sendLoan,
      user_id: id
    }).then(res=>{
      snackBar({
        message: 'Prestamo crerado',
        type:"success",
        time:2000
      })
      onClose();
    }).catch(res=>{
      snackBar({
        message: 'Hubo un error',
        type:"error",
        time:2000
      })
      console.log(res);      
    })
    .finally(()=>{
      onClose();
    })
  }
  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-[223px] flex flex-col pt-[5px] gap-[5px]">
                    <FormLabel>Fecha</FormLabel>
                    <FormControl className="mt-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                " text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="bg-white border border-gray-200 rounded-sm"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad</FormLabel>
                    <FormControl>
                      <Input placeholder="Cantidad" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deadlines"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plazos</FormLabel>
                    <FormControl>
                      <Input placeholder="Plazos" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="pays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pagos</FormLabel>
                    <FormControl>
                      <Input placeholder="Pagos" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de abono</FormLabel>
                    <FormControl>
                      <Input placeholder="Tipo de abono" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-3">

            <Button disabled={loading} variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Crear</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
