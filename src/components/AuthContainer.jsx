import React, { useState } from 'react';
import LogoSection from './LogoSection';
import StepResponsavel from './StepResponsavel';
import StepAluno from './StepAluno';
import LoginSection from './LoginSection';

const AuthContainer = () => {
  const [step, setStep] = useState('responsavel'); // responsavel, aluno, login

  const nextStep = () => {
    if (step === 'responsavel') setStep('aluno');
    else if (step === 'aluno') setStep('login');
  };

  return (
    <div className="relative w-[900px] h-[550px] overflow-hidden rounded-2xl shadow-2xl bg-white flex">
      <LogoSection />
      <div className="flex-1 flex items-center justify-center p-8">
        {step === 'responsavel' && <StepResponsavel onNext={nextStep} />}
        {step === 'aluno' && <StepAluno onNext={nextStep} />}
        {step === 'login' && <LoginSection />}
      </div>
    </div>
  );
};

export default AuthContainer;
