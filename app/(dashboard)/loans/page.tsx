"use client"

import React,{useEffect} from 'react'
import {doc, collection, query, where, getDocs, DocumentData} from "firebase/firestore"
import { useFirestoreDocData, 
  useFirestore } from 'reactfire';
import { UserAuth } from '@/context/AuthContext';

const LoansPage = async() => {

  const {user} = UserAuth()
  const collectionRef = collection(useFirestore(),`usuarios/${user?.uid}/prestamos`);
  
  const loans = await getDocs(collectionRef)
  const cards: DocumentData[] = []
  loans.forEach((doc) => {
    cards.push(doc.data());
  })
 
  console.log(loans);
  

  return (
    <>
    {
      cards.map((card) => (
        <p>{card.nombre}</p>
      ))
      }
    </>
  )
}

export default LoansPage