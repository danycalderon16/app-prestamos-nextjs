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
import { Textarea } from "../ui/textarea";

interface SupportModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
 supportText: z.string()
});

export const SupportModal: React.FC<SupportModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
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
            <div>
            <FormField
                control={form.control}
                name="supportText"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Deja tu mensaje aquí" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                       
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Enviar</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
