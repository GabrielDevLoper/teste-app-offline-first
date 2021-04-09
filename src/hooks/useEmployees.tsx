import React, { useContext, createContext, useState } from "react";

interface Employeer {
  id?: number;
  nome: string;
  cpf: string;
  setor: number;
  data_nascimento: string;
  created_at: number;
  updated_at: number;
}

const EmployeeContext = createContext<Employeer>({} as Employeer);
