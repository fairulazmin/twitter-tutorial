"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useLoginModal } from "@/hooks/use-login-modal";
import { useRegisterModal } from "@/hooks/use-register-modal";
import { useCallback, useState } from "react";

const formSchema = z.object({
  email: z.string().email().min(8, {
    message: "Email must be at least 8 characters",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export const LoginModal = () => {
  const [loading, setLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onToggle = useCallback(() => {
    if (loading) {
      return;
    }
    loginModal.onClose();
    registerModal.onOpen();
  }, [loading, registerModal, loginModal]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      // TODO ADD REGISTER AND LOGIN
      registerModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    console.log(values);
  };

  return (
    <Dialog open={loginModal.isOpen} onOpenChange={loginModal.onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              className="w-full rounded-full"
              type="submit"
            >
              Sign in
            </Button>
          </form>
        </Form>
        <DialogFooter>
          <div className="w-full text-sm text-neutral-400 text-center mt-4">
            <p>
              First time using Twitter?{" "}
              <span
                onClick={onToggle}
                className="text-white cursor-pointer hover:underline"
              >
                Create an account
              </span>
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
