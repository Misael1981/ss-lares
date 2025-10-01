export const formatCep = (value) => {
  const numbers = value.replace(/\D/g, "")
  return numbers.slice(0, 8)
}

export const formatCepDisplay = (cep) => {
  if (cep.length === 8) {
    return `${cep.slice(0, 5)}-${cep.slice(5)}`
  }
  return cep
}

export const validateCep = (cep) => {
  const cleanCep = cep.replace(/\D/g, "")
  return cleanCep.length === 8
}
