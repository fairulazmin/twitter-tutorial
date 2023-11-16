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
import { Icons } from "@/components/icons";
import { useLoginModal } from "@/hooks/use-login-modal";
import { useRegisterModal } from "@/hooks/use-register-modal";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      // TODO LOGIN
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });
      toast.success("Welcome");
      registerModal.onClose();
    } catch (error) {
      toast.error("Unable to login");
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

        <Button
          variant="outline"
          className="mt-4"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

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
                    <Input type="password" placeholder="Password" {...field} />
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
