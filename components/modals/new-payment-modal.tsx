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
import useNotifications from "@/hooks/useNotifications";
import { CreatePayment } from "@/interfaces/payment";
import { postPayment } from "@/actions/post-payment";
import useLoans from "@/hooks/useLoans";
interface NewPaymentModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  date: z.date(),
  payment: z.coerce.number().int({ message: "Ingrese un número" }),
});

export const NewPaymentModal: React.FC<NewPaymentModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payment: 0,
    },
  });
  const { snackBar } = useNotifications();
  const { id, currentLoan } = useLoans();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  function onSubmit(values: z.infer<typeof formSchema>) {
    const payment: CreatePayment = {
      abono: values.payment,
      fecha: values.date,

    };
    postPayment({
      payment: payment,
      loan_id:currentLoan.id.toString(),
      user_id: id,
    }) .then((res) => {
      snackBar({
        message: "Pago crerado",
        type: "success",
        time: 2000,
      });
      onClose();
    })
    .catch((res) => {
      snackBar({
        message: "Hubo un error",
        type: "error",
        time: 2000,
      });
      console.log(res);
    })
    .finally(() => {
      onClose();
    });
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
            <div className="grid grid-cols-2 gap-2">
            <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Abono</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
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
                                <span>Seleccione una fecha</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            showOutsideDays={false}
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

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
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
