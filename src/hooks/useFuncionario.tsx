import React, { useContext, createContext, useState } from "react";

interface Funcionario {
  id?: number;
  nome: string;
  cpf: string;
  id_setor: number;
  data_nascimento: string;
  created_at: Date;
  updated_at: Date;
}

const FuncionarioContext = createContext<Funcionario>({} as Funcionario);

export function FuncionarioProvider() {
  return <FuncionarioContext.Provider></FuncionarioContext.Provider>;
}
