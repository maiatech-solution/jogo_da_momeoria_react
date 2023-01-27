import React from 'react'
import * as C from './styles'

type Props ={
    label:string,
    value: string
}

export const InforItem = ({label,value}:Props) => {
  return (
    <C.Container>
        <C.Label>{label}</C.Label>
        <C.Value>{value}</C.Value>
    </C.Container>
  );
}