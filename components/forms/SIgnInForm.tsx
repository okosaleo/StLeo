"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitLoaders from "../custom/SubmitLoaders";
import { loginUserAction } from "@/actions/auth-actions";

import { ZodErrors } from "../custom/ZodErrors";
import { StrapiErrors } from "../custom/SrapiErrors";
import { useActionState } from "react";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export function SigninForm() {
  const [formState, formAction] = useActionState(loginUserAction, INITIAL_STATE);
  return (
    <div className="w-full max-w-md border-[1.5px] border-primary/70 rounded-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your details to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="username"
              />
               <ZodErrors error={formState?.zodErrors?.identifier} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
               <ZodErrors error={formState.zodErrors?.password} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <SubmitLoaders text="Sign in"  />
            <StrapiErrors error={formState?.strapiErrors} />
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}