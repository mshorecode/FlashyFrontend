/* eslint-disable react/button-has-type */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content gap-40">
        <div className="max-w-md">
          <h1 className="text-8xl font-bold text-[#FFFFFE]">Flashy</h1>
          <p className="pt-2 text-[#94A1B2] text-4xl">Retain More,</p>
          <p className="pb-6 text-[#94A1B2] text-4xl">Stress Less</p>
        </div>
        <div className="hero-content flex-column">
          <p className="pb-1 text-[#94A1B2] text-2xl">To begin learning, click below!</p>
          <Button type="button" className="btn btn-primary w-100 text-lg font-bold" onClick={signIn}>Get Started</Button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
