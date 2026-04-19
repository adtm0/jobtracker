import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EMPTY = {
  company: '',
  role: '',
  status: 'applied'
}
export default function JobForm() {
  return (
    <div>
      <h1>Add Job</h1>
      <p>Form will go here</p>
    </div>
  );
}
