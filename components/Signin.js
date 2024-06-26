/* eslint-disable react/button-has-type */
import React from 'react';
import { Button } from '@nextui-org/react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-row items-center gap-40">
        <div className="max-w-md">
          <h1 className="text-8xl font-bold text-[#FFFFFE]">Memoria</h1>
          <p className="pt-2 text-[#94A1B2] text-4xl">Retain More,</p>
          <p className="pb-6 text-[#94A1B2] text-4xl">Stress Less</p>
        </div>
        <div className="flex gap-2 flex-col">
          <p className="pb-1 text-[#94A1B2] text-2xl">To begin learning, click below!</p>
          <Button type="button" className="w-[50%] text-md font-bold" onClick={signIn}>Get Started</Button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
